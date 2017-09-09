"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_lib_1 = require("./events-lib");
var _1 = require("../");
var log = require("../util/log");
var Bukkit = require("../lib/bukkit");
var Carbs_1 = require("../Carbs");
function handleConsumeEvent(event) {
    if (event.getItem().getType() == Bukkit.Material.APPLE) {
        Carbs_1.Food.apple.eat();
        return;
    }
    if (event.getItem().getItemMeta() instanceof Bukkit.PotionMeta) {
        _1.takeInsulin();
        return;
    }
    log.info(event.getItem().toString());
}
function registerEventHandlers() {
    events_lib_1.registerConsumeEventHandler(handleConsumeEvent);
}
exports.registerEventHandlers = registerEventHandlers;
