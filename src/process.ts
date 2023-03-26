import { MultiBar, SingleBar, Presets } from "cli-progress";
import { keys } from "./layout";
import Debug from "debug";

const debug = Debug('process');

export async function processKeysSync(inclusionPattern: RegExp = /.+/): Promise<void> {
    const filteredKeys = keys.filter(key => inclusionPattern.test(key.id));
    const bar = new SingleBar({
        clearOnComplete: false,
        hideCursor: false,
        format: '{bar} {value}/{total} | ETA: {eta}s | {percentage}% | {task}',
    }, Presets.shades_grey);
    bar.start(filteredKeys.length, 0, { task: filteredKeys[0].id });
    for (const [i, key] of filteredKeys.entries()) {
        bar.update(i, { task: `Working on ${key.id}...` })
        await key.writeScadFile();
        key.convertSync();
        bar.increment();
    }
    bar.stop();
}

export function processKeys(inclusionPattern: RegExp = /.+/, batchSize = 5): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const filteredKeys = keys.filter(key => inclusionPattern.test(key.id));
        const errors: Error[] = [];
        const jobs: { [key: string]: (() => Promise<void>) } = {};
        const jobQueue: { [key: string]: Promise<void> } = {};
        let converted = 0;

        const bars = new MultiBar({
            clearOnComplete: false,
            hideCursor: false,
            format: '{bar} {value}/{total} | ETA: {eta}s | {percentage}% | {task}',
        }, Presets.shades_grey);

        const scad = bars.create(filteredKeys.length, 0, { task: filteredKeys[0].id });
        const stl = bars.create(filteredKeys.length, 0, { task: 'Converting to STL' }, {
            format: `{bar} {value}/{total} | ETA: {eta}s | {percentage}% | Processing: {jobsInQueue}/${batchSize} | Queued: {jobsLeft} | {task}`,
        });

        for (const [i, key] of filteredKeys.entries()) {
            scad.update(i, { task: `${key.id}.scad` })
            await key.writeScadFile();
            scad.increment();
            stl.update(0, {
                task: `Preparing ${key.id}`,
                jobsInQueue: Object.keys(jobQueue).length,
                jobsLeft: Object.keys(jobs).length,
            });
            jobs[key.id] = (async () => {
                try {
                    stl.update(converted, {
                        task: `Converting ${key.id}...`,
                    });
                    await key.convert();
                    delete jobQueue[key.id];
                } catch (e) {
                    errors.push(e instanceof Error ? e : new Error(JSON.stringify(e)));
                }
                converted++;
                stl.update(converted, {
                    task: `Finished ${key.id}.stl`,
                });
            })
        }

        const timer = setInterval(() => {
            const jobsLeft = Object.keys(jobs).length;
            const jobsInQueue = Object.keys(jobQueue).length;
            stl.update(converted, {
                jobsInQueue,
                jobsLeft,
            });
            debug(`Jobs left: ${jobsLeft}, Jobs in queue: ${jobsInQueue}`)
            if (jobsLeft === 0 && jobsInQueue === 0) {
                debug(`Finished processing ${filteredKeys.length} keys.`)
                errors.forEach(error => console.error(error));
                clearInterval(timer);
                bars.stop();
                resolve();
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
        }, 1000);
    });
}

