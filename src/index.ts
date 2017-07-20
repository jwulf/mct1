import { log } from './util/log';
import { Interval } from './util/timer';
import { BGLBarGlucoseMonitor } from './GlucoseMonitor/BGLBarGlucoseMonitor/BGLBarGlucoseMonitor';
import { mct1 } from './util/mct1';
import { T1Player } from './Player/T1Player';

mct1.version = '1.3.0';
log(`MCT1 version ${mct1.version}`);

export function controller(cmd = 'default') {
    if (!mct1.initialised) {
        return initialise(() => processCmd(cmd));
    } else {
        return processCmd(cmd);
    }

    function processCmd(cmd: string) {
        log(`Yo, mct1 executing ${cmd}`);
        const controlr = mct1.controller;
        if (cmd === 'default') {
            (mct1.running) ? controlr.stop() : controlr.start();
            return;
        }
        if (cmd === 'start') {
            return controlr.start();
        }
        if (cmd === 'stop') {
            return controlr.stop();
        }
        if (cmd === 'reset') {
            return controlr.reset();
        }
    }

    function initialise(callback: () => void) {

        log('Initialising...');

        const player = new T1Player();
        mct1.BGLBar = new BGLBarGlucoseMonitor(player, 1000);
        mct1.T1Player = player;

        mct1.initialised = true;
        mct1.running = false;
        callback && callback();
    }
}
