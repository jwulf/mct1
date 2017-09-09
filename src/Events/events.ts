import { rapid } from '../Insulin/rapid-insulin';
import { log } from '../util/log';
import { Carbohydrate } from '../Carbs/Carbohydrate';
const magik = magikcraft.io;

const EventPriority = magik.type("event.EventPriority");
const PlayerItemConsumeEvent = magik.type("event.player.PlayerItemConsumeEvent");
const PlayerQuitEvent = magik.type("event.player.PlayerQuitEvent");
const EventCallback = Java.type("io.magikcraft.EventCallback");
const Material = Java.type("org.bukkit.Material");

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
                if (!isMe) {
                    return;
                }

                if (event.getItem().getType() == Material.APPLE) {
                    const apple = new Carbohydrate(15,5,5);
                    apple.eat();
                    return;
                }
                if (event.getItem().getType() == Material.WATER) {
                    log('Taking 5u of rapid insulin');
                    rapid.take(5);
                    return;
                }
                log(event.getItem().getType());
            }
        }));
}