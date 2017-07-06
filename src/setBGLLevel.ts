
import { effects } from './effects';
import { globals } from './globals';

const magik = magikcraft.io;
const mct1 = magik.global('mct1') as MCT1;
const say = magik.dixit;

export function setBGLLevel(bgl, bglDelta = 0) {
    // The following line keeps newBGL 0 - 0.99
    const newBGL = (bgl => Math.min(bgl, 0.99))(Math.max(bgl, 0));
    mct1.state.bgl = newBGL;
    // say(bgl);
    mct1.bars.bgl.setProgress(bgl);
    if (BGLFallingFast(bglDelta)) {
        say('ALERT: BGL Falling fast');
    }
    if (BGLRisingFast(bglDelta)) {
        say('ALERT: BGL Rising fast');
    }
    if (BGLinRange(bgl)) {
        makeBarGreen();
        if (BGLGoingLow(bgl, bglDelta)) {
            say('WARNING: Dropping to a low!');
        }
    } else {
        makeBarRed();
        if (BGLIsLow(bgl)) {
            effects('CONFUSION');
        }
        if (BGLIsHigh(bgl)) {
            effects('BLINDNESS');
        }
    }
    if (newBGL === 0) {
        say("Aaaarrrggh!"); // kill player
    }
}

function BGLRisingFast(bglDelta) {
    return (bglDelta >= globals.RISE_ALERT_WARN_THRESHOLD);
}

function BGLFallingFast(bglDelta) {
    return (bglDelta <= globals.FALL_RATE_ALERT_THRESHOLD);
}

function BGLIsHigh(bgl) {
    return (bgl > globals.HIGH_EVENT_THRESHOLD);
}

function BGLIsLow(bgl) {
    return (bgl < globals.LOW_EVENT_THRESHOLD);
}

function BGLGoingLow(bgl, bglDelta) {
    return (bgl < globals.LOW_ALERT_THRESHOLD && bglDelta < 0);
}

function BGLinRange(bgl): boolean {
    return (bgl > globals.LOW_ALERT_THRESHOLD && bgl < globals.HIGH_ALERT_THRESHOLD);
}

function makeBarGreen() {
    mct1.bars.bgl.setColor(magik.Bars.Color.GREEN);
}

function makeBarRed() {
    mct1.bars.bgl.setColor(magik.Bars.Color.RED);
}