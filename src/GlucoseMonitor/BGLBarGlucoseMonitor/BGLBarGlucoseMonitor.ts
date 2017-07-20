import { BGLBar } from './BGLBar';
import { T1Player } from '../../Player/T1Player';
import { GlucoseMonitor } from '../GlucoseMonitor';

export class BGLBarGlucoseMonitor extends GlucoseMonitor {
    BGLBar: BGLBar;

    constructor(player: T1Player, sampleRate: number) {
        super(player, sampleRate);
        this.BGLBar = new BGLBar(this.player.BGL, {
            Bars: magikcraft.io.Bars,
            sender: magikcraft.io.getSender(),
            textcomponent: magikcraft.io.TextComponent
        });
    }

    monitor() {
        this.BGLBar.update();
    }
}