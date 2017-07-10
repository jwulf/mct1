const magik = magikcraft.io;
const mct1 = magik.global('mct1') as MCT1;
const say = magik.dixit;
import { effects } from './effects';
import { setBGLLevel } from './setBGLLevel';

export function mutateBGL(bglDelta = 0) {
    const currentBGL = mct1.state.bgl;
    const newBGL = currentBGL + bglDelta;

    setBGLLevel(newBGL, bglDelta);
}