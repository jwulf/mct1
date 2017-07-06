"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var setBGLLevel_1 = require("./setBGLLevel");
var setInsulinLevel_1 = require("./setInsulinLevel");
function setupState() {
    var mct1 = magik.global('mct1');
    mct1.state = {};
    setBGLLevel_1.setBGLLevel(0.4);
    setInsulinLevel_1.setInsulinLevel(0.2);
}
exports.setupState = setupState;
