import { Insulin } from '../Insulin/Insulin';
import { Carbohydrate } from '../Carbs/Carbohydrate';
import { BGL } from '../BGL/BGL';
import * as env from '../util/env';

export class T1Player {
    public BGL: BGL;
    public name: string;

    constructor(name = "default") {

        this.BGL = new BGL();

        this.name = (env.isNode) ? name
            : magikcraft.io.getSender().getName();

    }

    eatFood(food: Carbohydrate, portions = 1) {
        for (let i = 0; i < portions; i++) {
            food.eat(this);
        }
    }

    takeInsulin(insulin: Insulin, amount: number) {
        insulin.take(amount, this);
    }
}