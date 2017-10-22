import * as Events from './Events/';
import * as State from './State/';
import * as Insulin from './Insulin';
import * as Effects from './Effects';
import * as log from './util/log';
import { Food } from './Carbs/';
import * as Bars from './Bars';
import { giveInsulinPotion } from './Insulin/ObtainInsulin';

log.info('MCT1 loading...');

function createGame() {
    Bars.BGL.init();
    Bars.Insulin.init();
    Events.registerEventHandlers();
    giveInsulinPotion(15);

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
    log.verbose(true);
    log.info('Set logging on');
}

function logsoff(){
    log.verbose(false);
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
    applyEffect: Effects.applyEffect,
    eatCarbs,
    takeInsulin,
    logson,
    logsoff
}
