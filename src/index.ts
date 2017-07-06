const magik = magikcraft.io;
import { setupBars } from './setupBars';
import { setupState } from './setupState';
import { gameloop } from './gameloop';
import { setBGL } from './setBGL';
import { setInsulin } from './setInsulin';

const mct1_version = '1.2.1';
const say = (msg) => {
    magik.dixit(msg, magik.getSender().getName());
}
say(`MCT version ${mct1_version}`);

export function index(callback) {
    const mct1 = magik.global('mct1') as MCT1;
    if (mct1.initialised) {
        return callback(mct1);
    }

    const cancelGameLoop = () => {
        mct1.running = false;
        if (mct1.loop) {
            magik.clearInterval(mct1.loop);
        }
    };

    mct1.version = mct1_version;
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
                    setBGL(0.4);
                    mct1.state.insulinOnBoard = 0.2;
                }
            }
            callback(mct1);
        });
}
