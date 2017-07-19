import { T1Player } from '../Player/T1Player';
import { BGLBarGlucoseMonitor } from '../GlucoseMonitor/BGLBarGlucoseMonitor/BGLBarGlucoseMonitor';

const _mct1 = {} as {
    initialised: boolean;
    running: boolean;
    controller: any;
    BGLBar: BGLBarGlucoseMonitor;
    T1Player: T1Player;
    version: string;
};

export const mct1 = _mct1;