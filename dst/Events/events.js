"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            if (typeof event != "undefined") {
                magik.dixit(event.toString());
            }
            magik.dixit(username);
            magik.dixit("Is it me? ${username == me.getName()}");
        }
    }));
}
exports.registerEvents = registerEvents;
