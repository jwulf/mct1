"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./Events/events");
var State = require("./State/");
var Insulin = require("./lib/insulin");
var effects_lib_1 = require("./Effects/effects-lib");
var log = require("./util/log");
var Food = require("./Carbs/Foods");
var Bars = require("./lib/bars");
log.info('MCT1 loading...');
exports.verbose = false;
function createGame() {
    Bars.BGL.init();
    Bars.Insulin.init();
    events_1.registerEventHandlers();
    log.info('MCT1 started');
}
function eatCarbs() {
    Food.apple.eat();
}
function takeInsulin() {
    log.info('Taking 1u of rapid insulin');
    Insulin.rapid.take(1);
}
exports.takeInsulin = takeInsulin;
function query() {
    log.info(State.getState());
}
function logson() {
    exports.verbose = true;
    log.info('Set logging on');
}
function logsoff() {
    exports.verbose = false;
    log.info('Set logging off');
}
/**
* MGK-006-compliant interface
* See: https://github.com/Magikcraft/product-board/issues/6
*/
var _default = createGame;
exports.spells = {
    _default: _default,
    query: query,
    applyEffect: effects_lib_1.applyEffect,
    eatCarbs: eatCarbs,
    takeInsulin: takeInsulin,
    logson: logson,
    logsoff: logsoff
};
