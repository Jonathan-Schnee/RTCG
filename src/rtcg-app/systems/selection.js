import {Raycaster} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {Vector2} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { Anim_obj } from './Anim_obj.js';


const raycaster = new Raycaster();
const startmouse = new Vector2();
const starttouch = new Vector2();
const endmouse = new Vector2();
const endtouch = new Vector2();
let camera;
let group;
let mousediff = 1;
let touchdiff = 5;
let anim_loop;
let gltfscene;

class selection{
    constructor(ccamera, cgroup, canim_loop, cgltfscene){
        camera = ccamera;
        group = cgroup;
        gltfscene = cgltfscene;
        anim_loop = canim_loop;        
        window.addEventListener( 'touchstart', this.onStart);
        window.addEventListener( 'touchend', this.onSelect);
        window.addEventListener( 'mousedown', this.onStart);
        window.addEventListener( 'mouseup', this.onSelect);
    }


    onStart(event){
        startmouse.x = event.clientX;
        startmouse.y =event.clientY;
        if(!(typeof event.touches === 'undefined')){
            starttouch.x = event.touches[0].clientX;
            starttouch.y =event.touches[0].clientY;
        }
        
    }


    onSelect( event ) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        endmouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        endmouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        if(!(typeof event.touches === 'undefined')){

            endtouch.x = ( event.changedTouches[0].clientX / window.innerWidth ) * 2 - 1;
            endtouch.y = - ( event.changedTouches[0].pageY / window.innerHeight ) * 2 + 1;
        }
        // update the picking ray with the camera and mouse position
        if(!Number.isNaN(endmouse.x)){
            raycaster.setFromCamera( endmouse, camera );
        }
        else{
            raycaster.setFromCamera( endtouch, camera );
            
        }
        if(event.clientX - startmouse.x < mousediff && event.clientY - startmouse.y < mousediff){
            const intersects = raycaster.intersectObjects(group); 
            if(intersects.length > 0){
                let anim_ob = new Anim_obj(intersects[0].object, group, anim_loop, gltfscene, camera)
            }    
        }
        else if(!(typeof event.changedTouches === 'undefined')){
            if(event.changedTouches[0].clientX - starttouch.x < touchdiff && event.changedTouches[0].clientY - starttouch.y < touchdiff){
                const intersects = raycaster.intersectObjects(group); 
                if(intersects.length > 0){    
                    let anim_ob = new Anim_obj(intersects[0].object, group, anim_loop, gltfscene, camera)
                } 
            }
        }
        // calculate objects intersecting the picking ray

    }
}
export{selection}