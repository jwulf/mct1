const magik = magikcraft.io;
const mct1 = magik.global('mct1') as MCT1;

export function setupBars(callback) {
    const Bars = magik.Bars;
    const TextComponent = magik.TextComponent;

    if (mct1.initialised) {
        return;
    }
    const insulin = Bars.addBar(magik.getSender(),
        magik.TextComponent("Insulin"),
        Bars.Color.BLUE,
        Bars.Style.NOTCHED_20,
        0.0, // Progress (0.0 - 1.0)
    );

    const bgl = Bars.addBar(magik.getSender(),
        magik.TextComponent("BGL"),
        Bars.Color.RED,
        Bars.Style.NOTCHED_20,
        0.0 // Progress (0.0 - 1.0)
    );

    callback({ insulin, bgl });
}