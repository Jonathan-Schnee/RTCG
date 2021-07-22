import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {FXAAShader} from 'https://unpkg.com/three@0.127.0/examples/jsm/shaders/FXAAShader.js';
import {EffectComposer} from 'https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/ShaderPass.js';
import {OutlinePass} from 'https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/OutlinePass.js';
import {Vector2} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {Raycaster} from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const clock = new Clock();
let check = true;
let camera;
let scene;
let renderer;
let animated_objects;
let composer;
let outlinePass;
let effectFXAA;
const mouse = new Vector2();
const raycaster = new Raycaster();
let gltf;




class Anim_loop {
    constructor(ccamera, cscene, crenderer) {

        camera = ccamera;
        scene = cscene;
        renderer = crenderer;
        animated_objects = [];

    }

    start() {
        renderer.setAnimationLoop(() =>{
            this.tick();
            //console.log(renderer.xr.isPresenting)
            if(renderer.xr.isPresenting != check){
                if(renderer.xr.isPresenting){
                    scene.scale.set(0.02,0.02,0.02);
                    scene.position.set(0,0,-0.25);
                    check = renderer.xr.isPresenting;
                }
                else
                {
                    scene.scale.set(1,1,1);
                    camera.position.set(0, 0, 50);
                    check = renderer.xr.isPresenting;
                }
            }


            if(!(typeof this.gltf === "undefined")){
                if(!renderer.xr.isPresenting){
                    composer.render();
                }
                else{
                    renderer.render(scene,camera);
                }
            }
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
    add_obj(object){
        animated_objects.push(object);
    }
    async postprocess(){
        composer = new EffectComposer(renderer);
        var renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
        outlinePass.edgeStrength = 5
        outlinePass.visibleEdgeColor.set('#ff0000')
        outlinePass.hiddenEdgeColor.set('#000000')
        composer.addPass(outlinePass);

        effectFXAA = new ShaderPass(FXAAShader);
        effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
        effectFXAA.renderToScreen = true;
        composer.addPass(effectFXAA);
   
        for(var i = 1; i < this.gltf.length; i++){
            if(this.gltf[i].name != "Garage"){
                outlinePass.selectedObjects.push(this.gltf[i]);
            }

        }
        
    }
    loadObj(cgltf){

        this.gltf = cgltf
        this.postprocess();
    }
}
export { Anim_loop }