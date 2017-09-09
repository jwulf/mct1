import { Carbohydrate } from './Carbohydrate';

/**
 * Foods - Carbohydrate(grams, GI, GL);
 */

const Foods: any = new Object({
    get apple() {
        return new Carbohydrate(15, 5, 5);
    }
});

export const Food: {[key: string]: Carbohydrate} = {
    apple: Foods.apple
}