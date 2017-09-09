"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carbohydrate_1 = require("../Carbs/Carbohydrate");
var magik = magikcraft.io;
var EventPriority = magik.type("event.EventPriority");
var PlayerItemConsumeEvent = magik.type("event.player.PlayerItemConsumeEvent");
var PlayerQuitEvent = magik.type("event.player.PlayerQuitEvent");
var EventCallback = Java.type("io.magikcraft.EventCallback");
function registerEvents() {
    var me = magik.getSender();
    magik.getPlugin().registerEvent(PlayerItemConsumeEvent.class, EventPriority.MONITOR, true, new EventCallback({
        callback: function (event) {
            var username = event.player.playerListName;
            var isMe = (username == me.getName());
            /**if (typeof event != "undefined") {
                magik.dixit(event.getItem().toString());
            } **/
            if (isMe) {
                var apple = new Carbohydrate_1.Carbohydrate(15, 5, 5);
                apple.eat();
            }
        }
    }));
}
exports.registerEvents = registerEvents;
