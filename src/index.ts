import * as MCT1State from './State/'
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
    /**
     * MGK-006-compliant interface
     * See: https://github.com/Magikcraft/product-board/issues/6
     */
}

function eatCarbs() {
    const apple = new Carbohydrate(15,5,5);
    apple.eat();
}

function takeInsulin() {
    log('Taking 5u of rapid insulin');
    rapid.take(5);
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

export const spells = {
    _default,
    query,
    effects,
    eatCarbs,
    takeInsulin,
    logson,
    logsoff
}
