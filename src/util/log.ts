declare const console: any;

import { verbose } from '../';
import * as env from './env';

export const log = (env.isNode) ? console.log
    : magikcraft.io.dixit;

export const debug = (msg) => ((verbose) ? log(msg): undefined);