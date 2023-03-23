import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { processKeys, processKeysSync } from "./process";
import { Key } from "./Key";

const options = yargs(hideBin(process.argv))
    .options('match', {
        alias: 'm',
        type: 'string',
        description: 'Only convert keys that match the given pattern'
    })
    .options('rounding', {
        alias: 'r',
        type: 'boolean',
        description: 'Enable rounding (slows down conversion time drastically)'
    })
    .options('async', {
        alias: 'a',
        type: 'boolean',
        default: false,
        description: 'Run conversion asynchronously'
    })
    .parseSync();

Key.rounding = options.rounding ?? false;
const pattern = options.match ? new RegExp(options.match) : undefined;

if (!options.async) {
    processKeysSync(pattern);
} else {
    processKeys(pattern).catch((errors: Error[]) => {
        for (const error of errors) {
            console.error(error);
        }
    });
}