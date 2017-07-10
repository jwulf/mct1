"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var setupBars_1 = require("./setupBars");
var setupState_1 = require("./setupState");
var gameloop_1 = require("./gameloop");
var setBGLLevel_1 = require("./setBGLLevel");
var setInsulinLevel_1 = require("./setInsulinLevel");
var mct1_version = '1.2.4';
var say = magik.dixit;
say("MCT1 version " + mct1_version);
function controller(cmd) {
    if (cmd === void 0) { cmd = 'default'; }
    var mct1 = magik.global('mct1');
    if (!mct1.initialised) {
        initialise(function () { return processCmd(cmd); });
    }
    else {
        processCmd(cmd);
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
        mct1.version = mct1_version;
        say('Initialising...');
        setupBars_1.setupBars(function (bars) {
            mct1.bars = bars;
            setupState_1.setupState();
            mct1.initialised = true;
            mct1.running = false;
            mct1.controller = {
                start: function () {
                    cancelGameLoop();
                    say('Initiating MCT1 Game Loop');
                    mct1.loop = magik.setInterval(gameloop_1.gameloop, 1000);
                    mct1.running = true;
                },
                stop: function () {
                    cancelGameLoop();
                },
                reset: function () {
                    setBGLLevel_1.setBGLLevel(0.4);
                    setInsulinLevel_1.setInsulinLevel(0.2);
                },
                version: function () {
                    magik.dixit(mct1.version);
                }
            };
            callback(mct1);
        });
    }
}
exports.controller = controller;
