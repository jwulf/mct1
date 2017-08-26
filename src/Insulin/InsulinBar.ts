import * as Bar from 'magikcraft-lore-ui-bar';
import * as MCT1State from '../State';

const initialState = MCT1State.getState();
const textComponent = getBasalMessage(initialState.basalInsulinOnBoard);
const amount = Math.max(initialState.rapidInsulinOnBoard, 20);

export const bar = Bar.bar()
    .textComponent(textComponent)
    .color(Bar.color.BLUE)
    .style(Bar.style.NOTCHED_20)
    .progress(amount)
    .show();

function getBasalMessage(basalInsulinOnBoard: number) {
    if (basalInsulinOnBoard > 0) {
        return Bar.ComponentBuilder("Insulin | ").append("Basal: Active").color(Bar.ChatColor.GREEN).create();
    } else {
        return Bar.ComponentBuilder("Insulin | ").append("Basal: Empty").color(Bar.ChatColor.RED).create();
    }
}

let previousState = initialState;
const subscription = MCT1State.fusionStore.subscribe(this, function (state) {
    if (previousState.basalInsulinOnBoard !== state.basalInsulinOnBoard) {
        const text = getBasalMessage(state.basalInsulinOnBoard);
        bar.textComponent(text);
    }
    if (previousState.rapidInsulinOnBoard !== state.rapidInsulinOnBoard) {
        const amount = Math.max(state.rapidInsulinOnBoard, 20);
        bar.progress(amount);
    }
    previousState = state;
});