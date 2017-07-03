"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// filename: index 
var mct1_version = '1.2';
var magik = magikcraft.io;
var say = function (msg) {
    magik.dixit(msg, magik.getSender().getName());
};
var setupBars_1 = require("./setupBars");
var setupState_1 = require("./setupState");
var gameloop_1 = require("./gameloop");
say("MCT version " + mct1_version);
var setBGL_1 = require("./setBGL");
var setInsulin_1 = require("./setInsulin");
function index(callback) {
    var mct1 = magikcraft.io.global('mct1');
    if (mct1.initialised) {
        return callback(mct1);
    }
    var cancelGameLoop = function () {
        if (mct1.loop) {
            magik.clearInterval(mct1.loop);
        }
    };
    say('Promisified MCT1 module loading...');
    mct1.version = mct1_version;
    setupBars_1.setupBars(function (bars) {
        mct1.bars = bars;
        mct1.setBGL = setBGL_1.setBGL;
        mct1.setInsulin = setInsulin_1.setInsulin;
        setupState_1.setupState();
        mct1.initialised = true;
        mct1.controller = {
            start: function () {
                say('Starting...');
                cancelGameLoop();
                say('Initiating Game Loop');
                mct1.loop = magik.setInterval(gameloop_1.gameloop, 1000);
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
