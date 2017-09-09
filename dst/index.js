"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./Events/events");
var MCT1State = require("./State/");
var rapid_insulin_1 = require("./Insulin/rapid-insulin");
var Carbohydrate_1 = require("./Carbs/Carbohydrate");
var effects_1 = require("./Effects/effects");
var log_1 = require("./util/log");
var InsulinBar = require("./Insulin/InsulinBar");
var BGLBar = require("./GlucoseMonitor/BGLBar");
log_1.log('MCT1 loading...');
exports.verbose = false;
function createGame() {
    log_1.log('MCT1 starting');
    BGLBar.init();
    InsulinBar.init();
    events_1.registerEvents();
}
function eatCarbs() {
    var apple = new Carbohydrate_1.Carbohydrate(20, 5, 5);
    apple.eat();
}
function takeInsulin() {
    log_1.log('Taking 1u of rapid insulin');
    rapid_insulin_1.rapid.take(1);
}
exports.takeInsulin = takeInsulin;
function query() {
    log_1.log(MCT1State.getState());
}
function logson() {
    exports.verbose = true;
    log_1.log('Set logging on');
}
function logsoff() {
    exports.verbose = false;
    log_1.log('Set logging off');
}
var _default = createGame;
/**
* MGK-006-compliant interface
* See: https://github.com/Magikcraft/product-board/issues/6
*/
exports.spells = {
    _default: _default,
    query: query,
    applyEffect: effects_1.applyEffect,
    eatCarbs: eatCarbs,
    takeInsulin: takeInsulin,
    logson: logson,
    logsoff: logsoff
};
