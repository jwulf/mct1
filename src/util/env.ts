export const isNode = (typeof magikcraft === "undefined");

export const log = (isNode) ? console.log : magikcraft.io.dixit;