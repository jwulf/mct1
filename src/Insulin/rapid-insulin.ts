import { Insulin } from './Insulin';

/**
 * 5000ms onset delay
 * 60000ms effect duration
 * 30 power
 * true = saw-tooth response profile
 */
export const rapid = new Insulin(5000, 30000, 30, true);