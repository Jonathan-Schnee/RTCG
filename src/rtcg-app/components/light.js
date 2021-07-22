import {DirectionalLight, HemisphereLight} from 'https://unpkg.com/three@0.127.0/build/three.module.js ';

function createLight(scene){
    const color = 0x87d0ff;
    const intensity = 5;
    //const light = new DirectionalLight(color, intensity);
    let light = new HemisphereLight(0xffffff, 0xbbbbff, 5);
    light.position.set(0.5, 1, 0.25);
    //light.target.position.set(0, 0, 0);
    scene.add(light)
    //scene.add(light.target);
}
export{createLight};