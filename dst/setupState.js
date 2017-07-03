"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
function setupState() {
    var mct1 = magik.global('mct1');
    mct1.setBGL(0.4);
    mct1.setInsulin(0.2);
}
exports.setupState = setupState;
