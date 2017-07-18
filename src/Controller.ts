

export class Controller {
    constructor() {
    }
    start() {
        cancelGameLoop();
        say('Initiating MCT1 Game Loop');
        mct1.loop = magik.setInterval(gameloop, 1000);
        mct1.running = true;
    }
    stop() {
        cancelGameLoop();
    }
    reset() {
        mct1.(0.4);
        setInsulinLevel(0.2);
    }
    version() {
        magik.dixit(mct1.version);
    }
}