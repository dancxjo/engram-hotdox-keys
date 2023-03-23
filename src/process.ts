import { ChildProcess } from "child_process";
import { MultiBar, SingleBar, Presets } from "cli-progress";
import { keys } from "./layout";
import { Key } from "./Key";

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

export async function processKeys(inclusionPattern: RegExp = /.+/): Promise<void> {
    const filteredKeys = keys.filter(key => inclusionPattern.test(key.id));

    let finishedJobs = 0;
    const errors: Error[] = [];

    const bars = new MultiBar({
        clearOnComplete: false,
        hideCursor: false,
        format: '{bar} {value}/{total} | ETA: {eta}s | {percentage}% | {task}',
    }, Presets.shades_grey);

    const scad = bars.create(filteredKeys.length, 0, { task: filteredKeys[0].id });
    const stl = bars.create(filteredKeys.length, 0, { task: 'Converting to STL' });

    return new Promise((resolve) => {
        for (const [i, key] of filteredKeys.entries()) {
            scad.update(i, { task: `${key.id}.scad` })
            key.writeScadFile();
            scad.increment();
            const finish = (finishedKey: Key) => {
                finishedJobs++;
                stl.update(finishedJobs, { task: `Finished ${finishedKey.id}.stl` });
                if (finishedJobs === filteredKeys.length) {
                    bars.stop();
                    resolve();
                }
            }

            const job = key.convertToStl(() => finish(key));
            job.on('error', (error) => {
                errors.push(error);
                finish(key);
            });
        }
    });
}

