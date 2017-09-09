import { debug, log } from '../util/log';
import * as Bar from 'magikcraft-lore-ui-bar';
import * as MCT1State from '../State';

log('Loading Insulin Bar...');

const initialState = MCT1State.getState();
const textComponent = getBasalMessage(initialState.basalInsulinOnBoard);
const amount = initialState.rapidInsulinOnBoard;

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
            debug('Insulin Bar State Listener called');
            debug(state);
            if (previousState.basalInsulinOnBoard !== state.basalInsulinOnBoard) {
                const text = getBasalMessage(state.basalInsulinOnBoard);
                bar.textComponent(text);
            }
            if (previousState.rapidInsulinOnBoard !== state.rapidInsulinOnBoard) {
                debug(`Insulin onboard: ${state.rapidInsulinOnBoard}`)
                const amount = Math.min(state.rapidInsulinOnBoard, 20);
                bar.progress(Math.min(amount, 100));
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

