import { BGLBar, IDependencies } from './BGLBar';
import { Controller } from './Controller';
import { T1Player } from './T1Player';

export class MCT1 {
    public t1player: T1Player;
    public controller: Controller
    public bglBar: BGLBar;
    constructor() {
        this.t1player = new T1Player();
        this.controller = new Controller();

        const deps: IDependencies = {
            Bars: magikcraft.io.Bars,
            sender: magikcraft.io.getSender(),
            textcomponent: magikcraft.io.TextComponent
        }
        this.bglBar = new BGLBar(1000, this.t1player.BGL, deps);
    }
}