import { registerConsumeEventHandler } from './events-lib';
import { takeInsulin } from '../';
import * as log from '../util/log';
import * as Bukkit from '../Bukkit/';
import * as Food from '../Carbs/Foods';

function handleConsumeEvent(event) {
    if (event.getItem().getType() == Bukkit.Material.APPLE) {
        Food.apple.eat();
        return;
    }
    if (event.getItem().getItemMeta() instanceof Bukkit.PotionMeta) {
        takeInsulin();
        return;
    }
    log.info(event.getItem().toString());
}

export function registerEventHandlers() {
    registerConsumeEventHandler(handleConsumeEvent);
}