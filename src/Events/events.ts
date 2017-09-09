import { Carbohydrate } from '../Carbs/Carbohydrate';
const magik = magikcraft.io;

const EventPriority = magik.type("event.EventPriority");
const PlayerItemConsumeEvent = magik.type("event.player.PlayerItemConsumeEvent");
const PlayerQuitEvent = magik.type("event.player.PlayerQuitEvent");
const EventCallback = Java.type("io.magikcraft.EventCallback");

export function registerEvents() {
    const me = magik.getSender();
    magik.getPlugin().registerEvent(
        PlayerItemConsumeEvent.class,
        EventPriority.MONITOR,
        true,
        new EventCallback({
            callback: function (event) {
                var username = event.player.playerListName;
                const isMe = (username == me.getName());
                /**if (typeof event != "undefined") {
                    magik.dixit(event.getItem().toString());
                } **/
                if (isMe) {
                    const apple = new Carbohydrate(15,5,5);
                    apple.eat();
                }

            }
        }));
}