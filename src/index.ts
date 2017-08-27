import * as MCT1State from './State/'
import { rapid } from './Insulin/rapid-insulin';
import { Carbohydrate } from './Carbs/Carbohydrate';
import { effects } from './Effects/effects';
import { log } from './util/log';
import * as InsulinBar from './Insulin/InsulinBar';
import * as BGLBar from './GlucoseMonitor/BGLBar';
log('MCT1 loading...');

import { EventEmitter } from 'events';

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
    rapid.take(5);
}

function query() {
    log(MCT1State.getState());
}

const _default = createGame;

export const spells = {
    _default,
    query,
    effects,
    eatCarbs,
    takeInsulin
}
