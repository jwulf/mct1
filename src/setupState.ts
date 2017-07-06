const magik = magikcraft.io;
import { setBGLLevel } from './setBGLLevel';
import { setInsulinLevel } from './setInsulinLevel';

export function setupState() {
    const mct1 = magik.global('mct1') as MCT1;
    mct1.state = {} as any;
    setBGLLevel(0.4);
    setInsulinLevel(0.2);
}