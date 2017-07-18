"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var T1Player_1 = require("./T1Player");
var mct1_version = '1.2.4';
var say = magik.dixit;
say("MCT1 version " + mct1_version);
function controller(cmd) {
    if (cmd === void 0) { cmd = 'default'; }
    var magik = magikcraft.io;
    var mct1 = magik.global('mct1');
    if (!mct1.initialised) {
        return initialise(function () { return processCmd(cmd); });
    }
    else {
        return processCmd(cmd);
    }
    function processCmd(cmd) {
        say("Yo, mct1 executing " + cmd);
        var controlr = mct1.controller;
        if (cmd === 'default') {
            (mct1.running) ? controlr.stop() : controlr.start();
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
        var cancelGameLoop = function () {
            mct1.running = false;
            if (mct1.loop) {
                magik.clearInterval(mct1.loop);
            }
        };
        say('Initialising...');
        var player = new T1Player_1.T1Player();
        mct1.T1Player = player;
        mct1.version = mct1_version;
        mct1.bars = {};
        mct1.initialised = true;
        mct1.running = false;
    }
}
exports.controller = controller;
