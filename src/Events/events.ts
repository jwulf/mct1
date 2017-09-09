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
                if (typeof event != "undefined") {
                    magik.dixit(event.getItem().toString());

                }
                magik.dixit(username);
                magik.dixit(`Is it me? ${username == me.getName()}`);
            }
        }));
}