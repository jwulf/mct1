import { Interval } from './util/timer';
import { log } from './util/env';
import { mct1 } from './util/mct1';

export class Controller {
    constructor() {
    }
    start() {
        log('Initiating MCT1 Game Loop');
        mct1.running = true;
    }
    stop() {
    }
    reset() {

    }
    version() {
        log(mct1.version);
    }
}