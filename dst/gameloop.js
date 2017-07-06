"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var magik = magikcraft.io;
var setBGL_1 = require("./setBGL");
var player = magik.getSender();
var say = function (msg) { return magikcraft.io.dixit(msg, player.getName()); };
function gameloop() {
    var mct1 = magik.global('mct1');
    var state = mct1.state;
    var bgl = state.bgl;
    var newBGL;
    var insulinOnBoard = state.insulinOnBoard;
    var carbsOnBoard = state.carbsOnBoard;
    var insulinAbsorptionRate = insulinOnBoard / 80 + 0.0025;
    // say(insulinAbsorptionRate.toString());
    if (insulinAbsorptionRate > 0) {
    }
    // do Insulin Absorption
    if (insulinOnBoard > 0) {
        var newInsulin = insulinOnBoard - insulinAbsorptionRate;
        var food = player.getFoodLevel();
        player.setFoodLevel(food - 1);
        setInsulin(Math.max(newInsulin, 0));
        // do BGL Absorption
        if (bgl > 0) {
            var bglAbsorbed = insulinAbsorptionRate * 0.8;
            newBGL = bgl - bglAbsorbed;
            newBGL = Math.max(newBGL, 0);
            newBGL = Math.min(newBGL, 0.99);
            if (newBGL == 0) {
                say("Aaaaaarggggh!");
            }
        }
    }
    // Do BGL increase
    if (state.insulinOnBoard == 0) {
        newBGL += 0.7;
    }
    setBGL_1.setBGL(bgl);
}
exports.gameloop = gameloop;
