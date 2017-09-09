const magik = magikcraft.io;

const EventPriority = magik.type("event.EventPriority");
const PlayerItemConsumeEvent = magik.type("event.player.PlayerItemConsumeEvent");
const PlayerQuitEvent = magik.type("event.player.PlayerQuitEvent");
const EventCallback = Java.type("io.magikcraft.EventCallback");

export function registerEvents() {
    magik.getPlugin().registerEvent(
        PlayerItemConsumeEvent.class,
        EventPriority.MONITOR,
        true,
        new EventCallback({
            callback: function (event) {
                var username = event.player.playerListName;
                magik.dixit(event);
                magik.dixit(username);
            }
        }));
}