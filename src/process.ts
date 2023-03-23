import { ChildProcess } from "child_process";
import { MultiBar, SingleBar, Presets } from "cli-progress";
import { keys } from "./layout";

export function processKeysSync(inclusionPattern: RegExp = /.+/): void {
    const filteredKeys = keys.filter(key => inclusionPattern.test(key.id));
    const bar = new SingleBar({
        clearOnComplete: false,
        hideCursor: true,
    }, Presets.shades_grey);
    bar.start(filteredKeys.length, 0);
    for (const key of filteredKeys) {
        bar.increment();
        key.writeScadFile();
        key.convertSync();
    }
    bar.stop();
}

export async function processKeys(inclusionPattern: RegExp = /.+/): Promise<void> {
    const filteredKeys = keys.filter(key => inclusionPattern.test(key.id));

    const finishedJobs: (ChildProcess | null)[] = [];
    const errors: Error[] = [];

    const bars = new MultiBar({
        clearOnComplete: false,
        hideCursor: true,
    }, Presets.shades_grey);

    const scad = bars.create(keys.length, 0);
    const stl = bars.create(keys.length, 0);

    return new Promise((resolve, reject) => {
        for (const key of filteredKeys) {
            scad.increment();
            key.writeScadFile();
            const finish = (job: ChildProcess | null) => {
                finishedJobs.push(job);
                stl.update(finishedJobs.length);
                if (finishedJobs.length === keys.length) {
                    bars.stop();
                    resolve();
                }
            }

            const job = key.convertToStl(() => finish(job));
            job.on('error', (error) => {
                errors.push(error);
                finish(job);
            });
        }
    });
}

