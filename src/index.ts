import { BGLBarGlucoseMonitor } from './GlucoseMonitor/BGLBarGlucoseMonitor/BGLBarGlucoseMonitor';
const magik = magikcraft.io;

import { gameloop } from './gameloop';
import { T1Player } from './Player/T1Player';
import { MCT1 } from './types/mct1';

const mct1_version = '1.3.0';
const say = magik.dixit;
say(`MCT1 version ${mct1_version}`);

export function controller(cmd = 'default') {
    const magik = magikcraft.io;
    const mct1 = magik.global('mct1') as MCT1;
    if (!mct1.initialised) {
        return initialise(() => processCmd(cmd));
    } else {
        return processCmd(cmd);
    }

    function processCmd(cmd: string) {
        say(`Yo, mct1 executing ${cmd}`);
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

    function initialise(callback: (mct1: MCT1) => void) {

        const cancelGameLoop = () => {
            mct1.running = false;
            if (mct1.loop) {
                magik.clearInterval(mct1.loop);
            }
        };
        say('Initialising...');

        const player = new T1Player();
        mct1.BGLBar = new BGLBarGlucoseMonitor(player, 1000);
        mct1.T1Player = player;
        mct1.version = mct1_version;

        mct1.initialised = true;
        mct1.running = false;
    }
}
