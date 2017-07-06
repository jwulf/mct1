"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var setupBars_1 = require("./setupBars");
var setupState_1 = require("./setupState");
var gameloop_1 = require("./gameloop");
var setBGL_1 = require("./setBGL");
var mct1_version = '1.2.1';
var say = function (msg) {
    magik.dixit(msg, magik.getSender().getName());
};
say("MCT version " + mct1_version);
function index(callback) {
    var mct1 = magik.global('mct1');
    if (mct1.initialised) {
        return callback(mct1);
    }
    var cancelGameLoop = function () {
        mct1.running = false;
        if (mct1.loop) {
            magik.clearInterval(mct1.loop);
        }
    };
    mct1.version = mct1_version;
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
                setBGL_1.setBGL(0.4);
                mct1.state.insulinOnBoard = 0.2;
            }
        };
        callback(mct1);
    });
}
exports.index = index;
