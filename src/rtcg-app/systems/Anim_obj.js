import {MathUtils} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {Raycaster} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {Vector2} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {Vector3} from 'https://unpkg.com/three@0.127.0/build/three.module.js';

let obj;
let group;
const rad_perSecond = MathUtils.degToRad(8)
let anim_loop;
let gltfscene;
const raycaster = new Raycaster();
const startmouse = new Vector2();
const starttouch = new Vector2();
const endmouse = new Vector2();
const endtouch = new Vector2();

let mousediff = 1;
let touchdiff = 5;
let pos;
let sca;
let camera;

class Anim_obj{

    constructor(cobj, cgroup, canim_loop, cgltfscene, ccamera){
        obj = cobj;
        group = cgroup;
        gltfscene = cgltfscene;
        anim_loop = canim_loop;
        camera = ccamera;
        this.animate()
    }

    animate(){
        if(obj.name.includes("GarageKey")){
            for(var i = 0; i < group.length; i++){
                if(group[i].name == "Garage"){     
                    let gar = group[i];           
                    anim_loop.add_obj(group[i]);
                    group[i].tick = (delta) =>{
                        if(gar.rotation.x > - MathUtils.degToRad(260)){
                            gar.rotation.x -= rad_perSecond * delta;
                        }
                    }
                };
            }
        }
        if(obj.name.includes("Letter")){
            for(var i = 1; i < gltfscene.length; i++){
                if(gltfscene[i].type == "Mesh"){
                    if(!gltfscene[i].name.includes(obj.name)){
                        gltfscene[i].visible = false
                    }
                }
            }
            for(var i = 1; i < group.length; i++){
                if(group[i].type == "Mesh"){
                    if(!group[i].name.includes(obj.name)){
                        group[i].visible = false
                    }
                }
            }
            
            pos = new Vector3(obj.position.x, obj.position.y, obj.position.z);

            sca = new Vector3(obj.scale.x, obj.scale.y, obj.scale.z)
            obj.scale.set(10,10,10);
            obj.position.set(0,0,0);

            window.addEventListener( 'touchstart', this.onPoint);
            window.addEventListener( 'touchend', this.onSelect);
            window.addEventListener( 'mousedown', this.onPoint);
            window.addEventListener( 'mouseup', this.onSelect);
        }
    }
    onPoint(event){
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
            
            if(intersects.length == 0){  
                       
                obj.scale.set(sca.x, sca.y, sca.z);
                obj.position.set(pos.x, pos.y, pos.z);
                camera.position.set(0, 0, 50);
                for(var i = 1; i < gltfscene.length; i++){
                    if(gltfscene[i].type == "Mesh"){
                            gltfscene[i].visible = true;
                    }
                }
                for(var i = 1; i < group.length; i++){
                    if(group[i].type == "Mesh"){
                        group[i].visible = true;
                    }
                }
            }    
        }
        else if(!(typeof event.changedTouches === 'undefined')){
            if(event.changedTouches[0].clientX - starttouch.x < touchdiff && event.changedTouches[0].clientY - starttouch.y < touchdiff){
                const intersects = raycaster.intersectObjects(group); 
                if(intersects.length == 0){
                    obj.scale.set(sca.x, sca.y, sca.z);
                    obj.position.set(pos.x, pos.y, pos.z);
                    camera.position.set(0, 0, 50);
                    for(var i = 1; i < gltfscene.length; i++){
                        if(gltfscene[i].type == "Mesh"){
                                gltfscene[i].visible = true;
                        }
                    }
                    for(var i = 1; i < group.length; i++){
                        if(group[i].type == "Mesh"){
                            group[i].visible = true;
                        }
                    }
                }   
            }
        }
        // calculate objects intersecting the picking ray

    }
}
export {Anim_obj}