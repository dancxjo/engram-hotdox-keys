import { MultiBar, SingleBar, Presets } from "cli-progress";
import { keys } from "./layout";
import Debug from "debug";

const debug = Debug('process');

export function processKeysSync(inclusionPattern: RegExp = /.+/): void {
    const filteredKeys = keys.filter(key => inclusionPattern.test(key.id));
    const bar = new SingleBar({
        clearOnComplete: false,
        hideCursor: false,
        format: '{bar} {value}/{total} | ETA: {eta}s | {percentage}% | {task}',
    }, Presets.shades_grey);
    bar.start(filteredKeys.length, 0, { task: filteredKeys[0].id });
    for (const [i, key] of filteredKeys.entries()) {
        bar.update(i, { task: `Working on ${key.id}...` })
        key.writeScadFile();
        key.convertSync();
        bar.increment();
    }
    bar.stop();
}

export async function processKeys(inclusionPattern: RegExp = /.+/, batchSize = 5): Promise<void> {
    const filteredKeys = keys.filter(key => inclusionPattern.test(key.id));
    const errors: Error[] = [];
    const jobs: { [key: string]: (() => Promise<void>) } = {};
    const jobQueue: { [key: string]: Promise<void> } = {};

    const bars = new MultiBar({
        clearOnComplete: false,
        hideCursor: false,
        format: '{bar} {value}/{total} | ETA: {eta}s | {percentage}% | {task}',
    }, Presets.shades_grey);

    const scad = bars.create(filteredKeys.length, 0, { task: filteredKeys[0].id });
    const stl = bars.create(filteredKeys.length, 0, { task: 'Converting to STL' });

    for (const [i, key] of filteredKeys.entries()) {
        scad.update(i, { task: `${key.id}.scad` })
        key.writeScadFile();
        scad.increment();
        jobs[key.id] = (async () => {
            try {
                await key.convert();
                stl.increment({ task: `Finished ${key.id}.stl` });
                delete jobQueue[key.id];
            } catch (e) {
                errors.push(e instanceof Error ? e : new Error(JSON.stringify(e)));
            }
        })
    }

    const timer = setInterval(() => {
        const jobsLeft = Object.keys(jobs).length;
        const jobsInQueue = Object.keys(jobQueue).length;
        debug(`Jobs left: ${jobsLeft}, Jobs in queue: ${jobsInQueue}`)
        if (jobsLeft === 0 && jobsInQueue === 0) {
            debug(`Finished processing ${filteredKeys.length} keys.`)
            errors.forEach(error => console.error(error));
            clearInterval(timer);
            bars.stop();
            return;
        }
        if (jobsInQueue >= batchSize) {
            debug(`Job queue is full. Waiting...`)
            return;
        }

        debug(`Starting next job...`)
        const nextJobKey = Object.keys(jobs)[0];
        const nextJob = jobs[nextJobKey];
        if (!nextJob) {
            debug(`No more jobs to start. Waiting...`)
            return;
        }
        debug(`Starting job ${nextJobKey}...`)
        delete jobs[nextJobKey];
        jobQueue[nextJobKey] = nextJob();
    }, 10000);

}

