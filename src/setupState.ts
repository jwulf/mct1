const magik = magikcraft.io;
import { setBGL } from './setBGL';
import { setInsulin } from './setInsulin';

export function setupState() {
    const mct1 = magik.global('mct1') as MCT1;
    mct1.state = {} as any;
    setBGL(0.4);
    setInsulin(0.2);
}