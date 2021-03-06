import {OrbitControls} from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas){

    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = true;

    //controls.enableDamping  = true;
    //controls.dampingFactor = 0.005;

    controls.tick = () => controls.update();

    return controls;
}

export { createControls };