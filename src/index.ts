// filename: index 
const mct1_version = '1.2';
const magik = magikcraft.io;
const say = (msg) => {
    magik.dixit(msg, magik.getSender().getName());
}
import { setupBars } from './setupBars';
import { setupState } from './setupState';
import { gameloop } from './gameloop';
say(`MCT version ${mct1_version}`);
import { setBGL } from './setBGL';
import { setInsulin } from './setInsulin';

export function index(callback) {
    const mct1 = magikcraft.io.global('mct1') as any;
    if (mct1.initialised) {
        return callback(mct1);
    }

    const cancelGameLoop = () => {
        if (mct1.loop) {
            magik.clearInterval(mct1.loop);
        }
    };

    say('Promisified MCT1 module loading...');
    mct1.version = mct1_version;
    setupBars(
        (bars) => {
            mct1.bars = bars;
            mct1.setBGL = setBGL;
            mct1.setInsulin = setInsulin;
            setupState();

            mct1.initialised = true;

            mct1.controller = {
                start: () => {
                    say('Starting...');
                    cancelGameLoop();
                    say('Initiating Game Loop');
                    mct1.loop = magik.setInterval(gameloop, 1000);
                },
                stop: () => {
                    cancelGameLoop();
                },
                reset: () => {
                    setBGL(0.4);
                    mct1.state.insulinOnBoard = 0.2;
                }
            }
            callback(mct1);
        });
}
