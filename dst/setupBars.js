"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var mct1 = magik.global('mct1');
function setupBars(callback) {
    var Bars = magik.Bars;
    var TextComponent = magik.TextComponent;
    if (mct1.initialised) {
        return;
    }
    var insulin = Bars.addBar(magik.getSender(), magik.TextComponent("Insulin"), Bars.Color.BLUE, Bars.Style.NOTCHED_20, 0.0);
    callback({ insulin: insulin });
}
exports.setupBars = setupBars;
