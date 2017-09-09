import { Insulin } from './Insulin';

/**
 * 5s onset delay
 * 300s effect duration
 * 2 power
 * false = flat response profile
 */
export const basal = new Insulin(5, 300, 2, false);