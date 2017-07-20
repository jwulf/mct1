"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("./util/env");
var mct1_1 = require("./util/mct1");
var Controller = (function () {
    function Controller() {
    }
    Controller.prototype.start = function () {
        env_1.log('Initiating MCT1 Game Loop');
        mct1_1.mct1.running = true;
    };
    Controller.prototype.stop = function () {
    };
    Controller.prototype.reset = function () {
    };
    Controller.prototype.version = function () {
        env_1.log(mct1_1.mct1.version);
    };
    return Controller;
}());
exports.Controller = Controller;
