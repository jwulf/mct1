"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("./util/env");
var BGLBarGlucoseMonitor_1 = require("./GlucoseMonitor/BGLBarGlucoseMonitor/BGLBarGlucoseMonitor");
var mct1_1 = require("./util/mct1");
var T1Player_1 = require("./Player/T1Player");
mct1_1.mct1.version = '1.3.0';
env_1.log("MCT1 version " + mct1_1.mct1.version);
function controller(cmd) {
    if (cmd === void 0) { cmd = 'default'; }
    if (!mct1_1.mct1.initialised) {
        return initialise(function () { return processCmd(cmd); });
    }
    else {
        return processCmd(cmd);
    }
    function processCmd(cmd) {
        env_1.log("Yo, mct1 executing " + cmd);
        var controlr = mct1_1.mct1.controller;
        if (cmd === 'default') {
            (mct1_1.mct1.running) ? controlr.stop() : controlr.start();
            return;
        }
        if (cmd === 'start') {
            return controlr.start();
        }
        if (cmd === 'stop') {
            return controlr.stop();
        }
        if (cmd === 'reset') {
            return controlr.reset();
        }
    }
    function initialise(callback) {
        env_1.log('Initialising...');
        var player = new T1Player_1.T1Player();
        mct1_1.mct1.BGLBar = new BGLBarGlucoseMonitor_1.BGLBarGlucoseMonitor(player, 1000);
        mct1_1.mct1.T1Player = player;
        mct1_1.mct1.initialised = true;
        mct1_1.mct1.running = false;
        callback && callback();
    }
}
exports.controller = controller;
