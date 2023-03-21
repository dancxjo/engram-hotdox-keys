import { ChildProcess } from "child_process";
import { MultiBar, Presets } from "cli-progress";
import { keys } from "./layout";

const finishedJobs: ChildProcess[] = [];
const errors: Error[] = [];

const bars = new MultiBar({
    clearOnComplete: false,
    hideCursor: true,
}, Presets.shades_grey);

const scad = bars.create(keys.length, 0, { task: 'Generating SCAD files' });
const stl = bars.create(keys.length, 0, { task: 'Converting to STL' });


export default async function process(inclusionPattern: RegExp = /.+/): Promise<void> {
    return new Promise((resolve, reject) => {
        for (const key of keys) {
            scad.increment();
            if (!inclusionPattern.test(key.id)) {
                continue
            }
            key.writeScadFile();

            const finish = (job: ChildProcess) => {
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

