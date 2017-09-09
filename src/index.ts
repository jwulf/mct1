import { registerEventHandlers } from './Events/events';
import * as State from './State/';
import * as Insulin from './Insulin/insulins';
import { applyEffect } from './Effects/effects-lib';
import * as log from './util/log';
import * as Food from './Carbs/Foods';
import * as Bars from './lib/bars';
log.info('MCT1 loading...');

export let verbose = false;

function createGame() {
    Bars.BGL.init();
    Bars.Insulin.init();
    registerEventHandlers();
    log.info('MCT1 started');
}

function eatCarbs() {
    Food.apple.eat();
}

export function takeInsulin() {
    log.info('Taking 1u of rapid insulin');
    Insulin.rapid.take(1);
}

function query() {
    log.info(State.getState());
}

function logson() {
    verbose = true;
    log.info('Set logging on');
}

function logsoff(){
    verbose = false;
    log.info('Set logging off');
}

/**
* MGK-006-compliant interface
* See: https://github.com/Magikcraft/product-board/issues/6
*/
const _default = createGame;

export const spells = {
    _default,
    query,
    applyEffect,
    eatCarbs,
    takeInsulin,
    logson,
    logsoff
}
