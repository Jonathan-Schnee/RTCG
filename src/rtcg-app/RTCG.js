import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Anim_loop} from './systems/Anim_loop.js'
import {createLight} from './components/light.js';
import {createControls} from './systems/controls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
import {selection} from './systems/selection.js';
import {LoadingManager} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
let camera;
let renderer;
let scene;
let anim_loop
let controls;
let controller
let loader; // Wir müssen eine Variable für einen gltf-Modell-Loader erstellen
let arbutton;
let gltf;
let gltfscene;
let safe;
const manager = new LoadingManager();



class RTCG {
    // 1. Erstellung einer Instanz der RTCG-App
    constructor(container) {
        gltf = [];
        gltfscene = [];
        safe = [];
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer(scene, camera);
        container.append(renderer.domElement);
        this.anim_loop = new Anim_loop(camera,scene,renderer)
		var light = createLight(scene);

        controller = renderer.xr.getController(0);
        controller.addEventListener('select', this.onSelect());
        scene.add(controller);

        
        controls = createControls(camera, renderer.domElement);

        const resizer = new Resizer(container, camera, renderer);
        this.init()
    }

    async init(){

        this.loading();
 

        
        arbutton = ARButton.createButton(renderer);
        document.body.appendChild(arbutton);
        //window.addEventListener('resize', onWindowResize, false);

    }        
    render() {

        this.renderer.render(scene, camera);
    }

     start(){
        this.anim_loop.start();
    }

     stop(){
        this.anim_loop.stop();
    }

    onSelect() {
    };
    
    loading(){
        // URL zum jeweiligen Objekt
        const modelUrl = "./model/sceneobj.glb";
        const modelUrl2 = "./model/interactive.glb";
        const modelUrl3 = "./model/safe.glb";

        // Erstellung  GLTF-Ladeobjekt. GLTF ist ein 3D-Modellformat, das üblicherweise als das "JPEG von 3D" bezeichnet wird, weil es schnell und effizient zu verwenden ist, was ideal für das Web ist
            loader = new GLTFLoader(manager);
        
        // Laden des Modells
        // loader takes in a few arguments loader(model url, onLoad callback, onProgress callback, onError callback)
        loader.load(
            // URL
            modelUrl,
            // onLoad callback: Was aufgerufen wird, sobald das vollständige Modell geladen ist.
            function (model) {
            // Die gltf.scene enthält die Objektgruppe Three.js, die das 3D-Objekt des Modells darstellt.
                scene.add(model.scene);
                    console.log("Modell wurde der Szene hinzugefügt!");
                model.scene.position.z = -0.25;
                model.scene.traverse(function (child) {
                    gltfscene.push(child)
                  });
            },
        );
        loader.load(
            // URL
            modelUrl2,
            // onLoad callback: Was aufgerufen wird, sobald das vollständige Modell geladen ist.
            function (model) {
            // Die gltf.scene enthält die Objektgruppe Three.js, die das 3D-Objekt des Modells darstellt.
                scene.add(model.scene);
                    console.log("Modell wurde der Szene hinzugefügt!");
                model.scene.position.z = -0.25;
                model.scene.traverse(function (child) {
    
                    gltf.push(child)
                
                  });

            },
        ); 
        var self = this;
        manager.onLoad = function() {self.anim_loop.loadObj(gltf); new selection(camera,gltf, self.anim_loop,gltfscene)}
    }

}
export { RTCG };