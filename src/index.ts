import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { processKeys, processKeysSync } from "./process";
import { Key } from "./Key";
import { cpus } from "os";
import { Typeface } from "./Font";
import { fontsDetermined, keys } from "./layout";

const options = yargs(hideBin(process.argv))
    .option('match', {
        alias: 'm',
        type: 'string',
        description: 'Only convert keys that match the given pattern'
    })
    .option('rounding', {
        alias: 'r',
        type: 'boolean',
        description: 'Enable rounding (slows down conversion time drastically)'
    })
    .option('sync', {
        alias: 's',
        type: 'boolean',
        default: false,
        description: 'Run conversion asynchronously'
    })
    .option('batchSize', {
        alias: 'b',
        type: 'number',
        default: Math.floor(cpus().length - 1),
        description: 'Number of keys to convert at once'
    })
    .parseSync();


async function main() {
    Key.rounding = options.rounding ?? false;
    const pattern = options.match ? new RegExp(options.match) : undefined;
    await fontsDetermined.then(() => console.log('Fonts determined'))
    const willProcess = options.sync ? processKeysSync(pattern) :  processKeys(pattern, options.batchSize);
    await willProcess;
}

main().catch(e => console.error(e)).finally(() => console.log('Done!'));
