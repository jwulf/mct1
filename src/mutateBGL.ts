const magik = magikcraft.io;


const mct1 = magik.global('mct1') as MCT1;
const say = magik.dixit;
import { effects } from './effects';

export function mutateBGL(bgl = 0) {
    const previous = mct1.state.bgl;
    mct1.state.bgl += bgl;
    const current = mct1.state.bgl;
    const rate = previous - current;

    mct1.bars.bgl.setProgress(bgl);
    if (bgl > 0.2 && bgl < 0.4) {
        mct1.bars.bgl.setColor(magik.Bars.Color.GREEN);
    } else {
        mct1.bars.bgl.setColor(magik.Bars.Color.RED);
        if (bgl < 0.3 && rate > 0.05) {
            say('WARNING: BGL fall alert');
        }
        if (bgl < 0.2) {
            effects('CONFUSION');
        }
        if (bgl > 0.8) {
            effects('BLINDNESS');
        }
    }
}