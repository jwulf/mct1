"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MCT1State = require("./State/");
var rapid_insulin_1 = require("./Insulin/rapid-insulin");
var Carbohydrate_1 = require("./Carbs/Carbohydrate");
var effects_1 = require("./Effects/effects");
var log_1 = require("./util/log");
log_1.log('MCT1 loading...');
function createGame() {
    log_1.log('MCT1 starting');
    /**
     * MGK-006-compliant interface
     * See: https://github.com/Magikcraft/product-board/issues/6
     */
}
function eatCarbs() {
    var apple = new Carbohydrate_1.Carbohydrate(15, 5, 5);
    apple.eat();
}
function takeInsulin() {
    rapid_insulin_1.rapid.take(5);
}
function query() {
    log_1.log(MCT1State.getState());
}
var _default = createGame;
exports.spells = {
    _default: _default,
    query: query,
    effects: effects_1.effects,
    eatCarbs: eatCarbs,
    takeInsulin: takeInsulin
};
