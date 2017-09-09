import { registerEvents } from './Events/events';
import * as MCT1State from './State/';
import { rapid } from './Insulin/rapid-insulin';
import { Carbohydrate } from './Carbs/Carbohydrate';
import { effects } from './Effects/effects';
import { log } from './util/log';
import * as InsulinBar from './Insulin/InsulinBar';
import * as BGLBar from './GlucoseMonitor/BGLBar';
log('MCT1 loading...');

import { EventEmitter } from 'events';

export let verbose = false;

function createGame() {
    log('MCT1 starting');
    BGLBar.show();
    InsulinBar.show();
    registerEvents();
}

function eatCarbs() {
    const apple = new Carbohydrate(20,5,5);
    apple.eat();
}

export function takeInsulin() {
    log('Taking 1u of rapid insulin');
    rapid.take(1);
}

function query() {
    log(MCT1State.getState());
}

function logson() {
    verbose = true;
    log('Set logging on');
}

function logsoff(){
    verbose = false;
    log('Set logging off');
}

const _default = createGame;

/**
* MGK-006-compliant interface
* See: https://github.com/Magikcraft/product-board/issues/6
*/
export const spells = {
    _default,
    query,
    effects,
    eatCarbs,
    takeInsulin,
    logson,
    logsoff
}
