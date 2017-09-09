"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../util/log");
var Bar = require("magikcraft-lore-ui-bar");
var MCT1State = require("../State");
log_1.log('Loading Insulin Bar...');
var initialState = MCT1State.getState();
var textComponent = getBasalMessage(initialState.basalInsulinOnBoard);
var amount = Math.max(initialState.rapidInsulinOnBoard, 20);
function show() {
    exports.bar = Bar.bar()
        .textComponent(textComponent)
        .color(Bar.color.BLUE)
        .style(Bar.style.NOTCHED_20)
        .progress(amount)
        .show();
    var previousState = initialState;
    if (!exports.subscription) {
        exports.subscription = MCT1State.fusionStore.subscribe(this, function (state) {
            log_1.debug('Insulin Bar State Listener called');
            log_1.debug(state);
            if (previousState.basalInsulinOnBoard !== state.basalInsulinOnBoard) {
                var text = getBasalMessage(state.basalInsulinOnBoard);
                exports.bar.textComponent(text);
            }
            if (previousState.rapidInsulinOnBoard !== state.rapidInsulinOnBoard) {
                log_1.debug("Insulin onboard: " + state.rapidInsulinOnBoard);
                var amount_1 = Math.min(state.rapidInsulinOnBoard, 20);
                exports.bar.progress(amount_1);
            }
            previousState = state;
        });
    }
}
exports.show = show;
function getBasalMessage(basalInsulinOnBoard) {
    if (basalInsulinOnBoard > 0) {
        return Bar.ComponentBuilder("Insulin | ").append("Basal: Active").color(Bar.ChatColor.GREEN).create();
    }
    else {
        return Bar.ComponentBuilder("Insulin | ").append("Basal: Empty").color(Bar.ChatColor.RED).create();
    }
}
