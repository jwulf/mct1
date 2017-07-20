import { BGLBarGlucoseMonitor } from '../GlucoseMonitor/BGLBarGlucoseMonitor/BGLBarGlucoseMonitor';
import { T1Player } from '../Player/T1Player';

export interface MCT1 {
    state: {
        bgl: number;
        insulinOnBoard: number;
        carbsOnBoard: number;
    },
    initialised: boolean;
    bars: any;
    effect: {},
    loop: any;
    version: string;
    running: boolean;
    T1Player: T1Player;
    BGLBar: BGLBarGlucoseMonitor;
    controller: {
        start: () => void;
        stop: () => void;
        reset: () => void;
        version: () => void;
    }
}