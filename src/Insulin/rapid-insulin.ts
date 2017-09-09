import { Insulin } from './Insulin';

/**
 * 5s onset delay
 * 30s effect duration
 * 30 power
 * true = saw-tooth response profile
 */
export const rapid = new Insulin(5, 30, 30, true);