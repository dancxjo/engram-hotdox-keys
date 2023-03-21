import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { keys } from './layout'

const options = yargs(hideBin(process.argv))
    .options('match', {
        alias: 'm',
        type: 'string',
        description: 'Only convert keys that match the given pattern'
    })
    .parseSync();

const pattern = options.match ? new RegExp(options.match) : null;

for (const key of keys) {
    if (!pattern || pattern.test(key.id) === true) {
        key.writeScadFile();
        key.convertToStl();
    }
}