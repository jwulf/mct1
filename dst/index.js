"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events = require("./Events/");
var State = require("./State/");
var Insulin = require("./Insulin");
var Effects = require("./Effects");
var log = require("./util/log");
var _1 = require("./Carbs/");
var Bars = require("./Bars");
var ObtainInsulin_1 = require("./Insulin/ObtainInsulin");
var magik = magikcraft.io;
log.info('MCT1 loading...');
function createGame() {
    var halfFoodBar = 10;
    Bars.BGL.init();
    Bars.Insulin.init();
    Events.registerEventHandlers();
    ObtainInsulin_1.giveInsulinPotions(15);
    _1.giveFood(10);
    magik.getSender().setFoodLevel(halfFoodBar);
    log.info('MCT1 started');
}
function eatCarbs() {
    _1.Food.apple.eat();
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
    log.verbose(true);
    log.info('Set logging on');
}
function logsoff() {
    log.verbose(false);
    log.info('Set logging off');
}
var _default = createGame;
exports.spells = {
    _default: _default,
    query: query,
    applyEffect: Effects.applyEffect,
    eatCarbs: eatCarbs,
    takeInsulin: takeInsulin,
    logson: logson,
    logsoff: logsoff
};
