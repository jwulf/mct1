interface MCT1 {
    state: {
        bgl: number;
        insulinOnBoard: number;
        carbsOnBoard: number;
    },
    initialised: boolean;
    bars: any;
    loop: any;
    version: string;
    running: boolean;
    controller: {
        start: () => void;
        stop: () => void;
        reset: () => void;
        version: () => void;
    }
}