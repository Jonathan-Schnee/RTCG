import { PerspectiveCamera } from 'https://unpkg.com/three@0.127.0/build/three.module.js ';
function createCamera() {
const camera = new PerspectiveCamera(
70, // FOV
1, // Aspect Ratio
0.1, // Near Clip
100, // Far Clip
);
// Rückstellung der Kamera
camera.position.set(0, 0, 50);
return camera;
}
export { createCamera };