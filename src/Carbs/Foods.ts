import { Carbohydrate } from './Carbohydrate';

/**
 * Foods - Carbohydrate(grams, GI, GL);
 */
export const apple = new Carbohydrate(15, 5, 5);


const Foods = {
    APPLE: apple
}
export const getFood = (type) => {
}