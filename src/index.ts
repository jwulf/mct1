const magik = magikcraft.io;
import { setupBars } from './setupBars';
import { setupState } from './setupState';
import { gameloop } from './gameloop';
import { setBGLLevel } from './setBGLLevel';
import { setInsulinLevel } from './setInsulinLevel';

const mct1_version = '1.2.4';
const say = magik.dixit;

say(`MCT version ${mct1_version}`);

export function controller(cmd = 'default') {
    const mct1 = magik.global('mct1') as MCT1;
    if (!mct1.initialised) {
        initialise(() => processCmd(cmd));
    } else {
        processCmd(cmd);
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

        mct1.version = mct1_version;
        say('Initialising...');
        setupBars(
            (bars) => {
                mct1.bars = bars;
                setupState();

                mct1.initialised = true;
                mct1.running = false;

                mct1.controller = {
                    start: () => {
                        cancelGameLoop();
                        say('Initiating MCT1 Game Loop');
                        mct1.loop = magik.setInterval(gameloop, 1000);
                        mct1.running = true;
                    },
                    stop: () => {
                        cancelGameLoop();
                    },
                    reset: () => {
                        setBGLLevel(0.4);
                        setInsulinLevel(0.2);
                    },
                    version: () => {
                        magik.dixit(mct1.version);
                    }
                }
                callback(mct1);
            });
    }
}
