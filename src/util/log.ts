import * as env from './env';

export const log = (env.isNode) ? console.log
    : magikcraft.io.dixit;