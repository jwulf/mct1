"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var setBGL_1 = require("./setBGL");
var setInsulin_1 = require("./setInsulin");
function setupState() {
    var mct1 = magik.global('mct1');
    mct1.state = {};
    setBGL_1.setBGL(0.4);
    setInsulin_1.setInsulin(0.2);
}
exports.setupState = setupState;
