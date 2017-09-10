
import * as Bukkit from '../lib/bukkit';
const magik = magikcraft.io;

export function registerConsumeEventHandler(callback: (event: any) => void): void {
    const me = magik.getSender();
    magik.getPlugin().registerEvent(
        Bukkit.PlayerItemConsumeEvent.class,
        Bukkit.EventPriority.MONITOR,
        true,
        new Bukkit.EventCallback({
            callback: function (event) {
                var username = event.player.playerListName;
                const isMe = (username == me.getName());
                if (!isMe) {
                    return;
                }
                callback(event);
            }
        })
    );
}
