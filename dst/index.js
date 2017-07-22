"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./util/log");
var BGLBarGlucoseMonitor_1 = require("./GlucoseMonitor/BGLBarGlucoseMonitor/BGLBarGlucoseMonitor");
var mct1_1 = require("./util/mct1");
var T1Player_1 = require("./Player/T1Player");
mct1_1.mct1.version = '1.3.0';
log_1.log("MCT1 version " + mct1_1.mct1.version);
function _default() {
    if (!mct1_1.mct1.initialised) {
        initialise();
    }
}
exports.spells = {
    "default": _default
};
function initialise(callback) {
    log_1.log('Initialising...');
    var player = new T1Player_1.T1Player();
    mct1_1.mct1.BGLBar = new BGLBarGlucoseMonitor_1.BGLBarGlucoseMonitor(player, 1000);
    mct1_1.mct1.T1Player = player;
    mct1_1.mct1.initialised = true;
    mct1_1.mct1.running = false;
    callback && callback();
}
