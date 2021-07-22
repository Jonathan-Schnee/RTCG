import {MathUtils} from 'https://unpkg.com/three@0.127.0/build/three.module.js';

let obj;
let group;
const rad_perSecond = MathUtils.degToRad(8)
let anim_loop;
let gltfscene;

class Anim_obj{

    constructor(cobj, cgroup, canim_loop, cgltfscene){
        obj = cobj;
        group = cgroup;
        console.log(cgltfscene);
        gltfscene = cgltfscene;
        anim_loop = canim_loop;
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
                    console.log(!gltfscene[i].name.includes("Letter"));
                    if(!gltfscene[i].name.includes(obj.name)){
                        gltfscene[i].visible = false
                    }
                }
            }
            for(var i = 1; i < group.length; i++){
                if(group[i].type == "Mesh"){
                    console.log(!group[i].name.includes("Letter"));
                    if(!group[i].name.includes(obj.name)){
                        group[i].visible = false
                    }
                }
            }
        }
    }
}
export {Anim_obj}