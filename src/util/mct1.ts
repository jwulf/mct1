import { isNode } from './env';
import { T1Player } from '../Player/T1Player';
import { BGLBarGlucoseMonitor } from '../GlucoseMonitor/BGLBarGlucoseMonitor/BGLBarGlucoseMonitor';

interface MCT1 {
    initialised: boolean;
    running: boolean;
    controller: any;
    BGLBar: BGLBarGlucoseMonitor;
    T1Player: T1Player;
    version: string;
}

let _mct1;

if (isNode) {
    _mct1 = {} as MCT1;
} else {
    _mct1 = magikcraft.io.global('mct1') as MCT1;
}

export const mct1 = _mct1 as MCT1;