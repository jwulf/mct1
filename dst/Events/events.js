"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rapid_insulin_1 = require("../Insulin/rapid-insulin");
var log_1 = require("../util/log");
var Carbohydrate_1 = require("../Carbs/Carbohydrate");
var magik = magikcraft.io;
var EventPriority = magik.type("event.EventPriority");
var PlayerItemConsumeEvent = magik.type("event.player.PlayerItemConsumeEvent");
var PlayerQuitEvent = magik.type("event.player.PlayerQuitEvent");
var EventCallback = Java.type("io.magikcraft.EventCallback");
var Material = Java.type("org.bukkit.Material");
var PotionMeta = Java.type("org.bukkit.inventory.meta.PotionMeta");
function registerEvents() {
    var me = magik.getSender();
    magik.getPlugin().registerEvent(PlayerItemConsumeEvent.class, EventPriority.MONITOR, true, new EventCallback({
        callback: function (event) {
            var username = event.player.playerListName;
            var isMe = (username == me.getName());
            /**if (typeof event != "undefined") {
                magik.dixit(event.getItem().toString());
            } **/
            if (!isMe) {
                return;
            }
            if (event.getItem().getType() == Material.APPLE) {
                var apple = new Carbohydrate_1.Carbohydrate(15, 5, 5);
                apple.eat();
                return;
            }
            if (event.getItem().getItemMeta() instanceof PotionMeta) {
                log_1.log('Taking 5u of rapid insulin');
                rapid_insulin_1.rapid.take(5);
                return;
            }
            log_1.log(event.getItem().toString());
        }
    }));
}
exports.registerEvents = registerEvents;
