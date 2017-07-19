import { BGL } from '../BGL/BGL';
import * as env from '../env';

export class T1Player {
    public BGL: BGL;
    public name: string;

    constructor(name = "test-player") {

        this.BGL = new BGL();

        this.name = (env.isNode) ? name
            : magikcraft.io.getSender().getName();

        const log = (env.isNode) ? console.log
            : magikcraft.io.dixit;

    }
}