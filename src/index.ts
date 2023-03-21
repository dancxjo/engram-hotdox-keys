import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import processKeys from "./process";

const options = yargs(hideBin(process.argv))
    .options('match', {
        alias: 'm',
        type: 'string',
        description: 'Only convert keys that match the given pattern'
    })
    .parseSync();

const pattern = options.match ? new RegExp(options.match) : undefined;
processKeys(pattern).catch((errors: Error[]) => {
    for (const error of errors) {
        console.error(error);
    }
});