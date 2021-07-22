import { ExtrudeGeometry, IcosahedronGeometry, Mesh, MeshStandardMaterial, MathUtils, MeshBasicMaterial,Color} from 'https://unpkg.com/three@0.127.0/build/three.module.js ';
function createCube() {
    // ERstellung der Geometrie

    const geometry = new IcosahedronGeometry(2,0);
    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();
    material.flatShading =false;
    //material.color = new Color('red');
    //material.roughness = 0.25;
    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const cube = new Mesh(geometry, material);
    
    cube.rotation.set(-0.3, -0.7, 0.6)

    const rad_perSecond = MathUtils.degToRad(25)

    cube.tick = (delta) => {
      //  cube.rotation.z += rad_perSecond * delta;
      //  cube.rotation.x += rad_perSecond * delta;
      //  cube.rotation.y += rad_perSecond * delta;

    };

    return cube;
}
export { createCube };