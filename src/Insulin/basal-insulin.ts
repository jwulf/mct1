import { Insulin } from './Insulin';

/**
 * 5000ms onset delay
 * 240000ms effect duration
 * 2 power
 * false = flat response profile
 */
export const basal = new Insulin(5000, 240000, 5, false);