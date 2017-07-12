import { BGL } from './BGL';
import { BGLBar } from './BGLBar';
import { effects } from './effects';

export class T1Player {
    public BGL: BGL;
    public BGLBar: BGLBar;
    constructor() {
        this.BGL = new BGL(magikcraft.io.dixit, effects);
        this.BGLBar = new BGLBar(1000, this.BGL, {
            Bars: magikcraft.io.Bars,
            sender: magikcraft.io.getSender(),
            textcomponent: magikcraft.io.TextComponent
        });
    }
}