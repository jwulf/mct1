const magik = magikcraft.io;

export function setupState() {
    const mct1 = magikcraft.io.global('mct1') as any;
    mct1.state = {};
    mct1.setBGL(0.4);
    mct1.setInsulin(0.2);
}