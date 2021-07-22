import { RTCG } from '/src/rtcg-app/RTCG.js';
// Erzeugung der Hauptmethode
function main() {
    // Todo Setup der RTCG-App
    const container = document.querySelector('#scene-container');
    // 1. Instanz der RTCG-App
    const rtcg = new RTCG(container);
    // 2. Szenen-Rendering
    rtcg.start()
}
// main() Aufruf, um die RTCG-App zu starten
main();