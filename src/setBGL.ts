
import { effects } from './effects';

export function setBGL(bgl, insulinAbsorptionRate = 0) {
    const magik = magikcraft.io;

    const mct1 = magik.global('mct1') as MCT1;
    const say = magik.dixit;

    mct1.state.bgl = bgl;
    say(bgl);
    mct1.bars.bgl.setProgress(bgl);
    if (bgl > 0.2 && bgl < 0.4) {
        mct1.bars.bgl.setColor(magik.Bars.Color.GREEN);
    } else {
        mct1.bars.bgl.setColor(magik.Bars.Color.RED);
        if (bgl < 0.3 && insulinAbsorptionRate > 0.05) {
            say('WARNING: BGL Fall alert');
        }
        if (bgl < 0.2) {
            effects('CONFUSION');
        }
        if (bgl > 0.8) {
            effects('BLINDNESS');
        }
    }
}
