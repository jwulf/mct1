import { controller } from '../';
import { T1Player } from '../T1Player';

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
    controller: {
        start: () => void;
        stop: () => void;
        reset: () => void;
        version: () => void;
    }
}