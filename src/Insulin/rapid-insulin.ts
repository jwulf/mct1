import { Insulin } from './Insulin';

/**
 * 5000ms onset delay
 * 120000ms effect duration
 * 5 power
 * true = saw-tooth response profile
 */
export const rapid = new Insulin(5000, 120000, 5, true);