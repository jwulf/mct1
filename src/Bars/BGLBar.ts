import * as log from '../util/log';
import * as Bar from 'magikcraft-lore-ui-bar';
import * as State from '../State';

log.info('BGL Bar loading...');

const initialState = State.getState();

export let bar, subscription;

export function init() {
    const bgl = initialState.BGL || 4;
    bar = Bar.bar()
    .text(`BGL: ${initialState.BGL}`)
    .color(Bar.color.GREEN)
    .style(Bar.style.NOTCHED_20)
    .progress(bgl)
    .show();
    if (!subscription){
        let previousState = initialState;

        subscription = State.subscribe(function(state) {
            if (previousState.BGL !== state.BGL) {
                const bgl = state.BGL || 0;
                const bglNum = Math.min(20, bgl);
                const bglString = bglNum.toFixed(1);
                previousState = state;
                bar.progress(bglNum * 5);
                bar.text(`BGL: ${bglString}`);
                bar.color(getBGLColor(bgl));
            }
        });
    }
}

function getBGLColor(bgl: number) {
    if (bgl < 4 || bgl > 8) {
        return Bar.color.RED;
    }
    return Bar.color.GREEN;
}

