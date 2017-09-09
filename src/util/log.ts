declare const console: any;

import { verbose } from '../';
import * as env from './env';

export const info = (env.isNode) ? console.log
    : magikcraft.io.dixit;

export const debug = (msg) => ((verbose) ? info(msg): undefined);