"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = (function () {
    function Controller() {
    }
    Controller.prototype.start = function () {
        cancelGameLoop();
        say('Initiating MCT1 Game Loop');
        mct1.loop = magik.setInterval(gameloop, 1000);
        mct1.running = true;
    };
    Controller.prototype.stop = function () {
        cancelGameLoop();
    };
    Controller.prototype.reset = function () {
        mct1.(0.4);
        setInsulinLevel(0.2);
    };
    Controller.prototype.version = function () {
        magik.dixit(mct1.version);
    };
    return Controller;
}());
exports.Controller = Controller;
