import { log } from '../util/log';
import * as Bar from 'magikcraft-lore-ui-bar';
import * as MCT1State from '../State';

log('Loading Insulin Bar...');

const initialState = MCT1State.getState();
const textComponent = getBasalMessage(initialState.basalInsulinOnBoard);
const amount = Math.max(initialState.rapidInsulinOnBoard, 20);

export let bar, subscription;

export function show() {
    bar = Bar.bar()
        .textComponent(textComponent)
        .color(Bar.color.BLUE)
        .style(Bar.style.NOTCHED_20)
        .progress(amount)
        .show();

    let previousState = initialState;
    if (!subscription) {
        subscription = MCT1State.fusionStore.subscribe(this, function (state) {
            log('Insulin Bar State Listener called');
            log(state);
            if (previousState.basalInsulinOnBoard !== state.basalInsulinOnBoard) {
                const text = getBasalMessage(state.basalInsulinOnBoard);
                bar.textComponent(text);
            }
            if (previousState.rapidInsulinOnBoard !== state.rapidInsulinOnBoard) {
                log(`Insulin onboard: ${state.rapidInsulinOnBoard}`)
                const amount = Math.min(state.rapidInsulinOnBoard, 20);
                bar.progress(amount);
            }
            previousState = state;
        });
    }
}
function getBasalMessage(basalInsulinOnBoard: number) {
    if (basalInsulinOnBoard > 0) {
        return Bar.ComponentBuilder("Insulin | ").append("Basal: Active").color(Bar.ChatColor.GREEN).create();
    } else {
        return Bar.ComponentBuilder("Insulin | ").append("Basal: Empty").color(Bar.ChatColor.RED).create();
    }
}

