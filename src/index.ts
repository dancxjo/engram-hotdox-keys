import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { processKeys, processKeysSync } from "./process";
import { Key } from "./Key";

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
        default: 5,
        description: 'Number of keys to convert at once'
    })
    .parseSync();

Key.rounding = options.rounding ?? false;
const pattern = options.match ? new RegExp(options.match) : undefined;

if (options.sync) {
    processKeysSync(pattern);
} else {
    processKeys(pattern, options.batchSize).catch((errors: Error[]) => {
        for (const error of errors) {
            console.error(error);
        }
    });
}