const magik = magikcraft.io;

export function setInsulin(insulin) {
    const mct1 = magik.global('mct1') as MCT1;
    mct1.bars.insulin.setProgress(insulin);
    mct1.state.insulinOnBoard = insulin;
 }