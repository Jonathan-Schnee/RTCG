import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {Raycaster} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {Vector2} from 'https://unpkg.com/three@0.127.0/build/three.module.js';


const clock = new Clock();
let check = true;
const raycaster = new Raycaster();
const mouse = new Vector2();
let camera;
let scene;
let renderer;
let animated_objects;
let group;


class Anim_loop {
    constructor(ccamera, cscene, crenderer, cgroup) {
        camera = ccamera;
        scene = cscene;
        renderer = crenderer;
        animated_objects = [];
        group = cgroup;
        console.log(group)
        window.addEventListener( 'click', this.onSelect);
    }

    start() {
        renderer.setAnimationLoop(() =>{
            this.tick();
            if(renderer.xr.isPresenting == check){
                if(renderer.xr.isPresenting){
                    scene.scale.set(0.02,0.02,0.02);
                    scene.position.set(0,0,-0.25);
                }
                else
                {
                    scene.scale.set(1,1,1);
                    camera.position.set(0, 0, 50);
                }
            }


            renderer.render(scene, camera);

        });
    }
    stop() {
        renderer.setAnimationLoop(null);
    }

    tick(){

        const delta = clock.getDelta();

        for(const object of animated_objects){
            object.tick(delta);
        }
    }

    onSelect( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        console.log("Dat geht");
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(group);       
                intersects[0].object.material.color.set( 0xff0000 );
    }

    selectItem(){

    }
}
export { Anim_loop }