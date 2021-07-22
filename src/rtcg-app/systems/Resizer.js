const setSize = (container, camera, renderer) => {
    // 1
    camera.aspect = container.clientWidth / container.clientHeight;
    // Aktualisierung des Kamera-Frustums
    camera.updateProjectionMatrix();
    // 2
    renderer.setSize(container.clientWidth, container.clientHeight);
    // 3
    renderer.setPixelRatio(window.devicePixelRatio);

    
};
class Resizer {
    constructor(container, camera, renderer){
        setSize(container, camera, renderer);
        // Aktualisierung des Kamera-Frustums
        window.addEventListener('resize', () => {
            setSize(container, camera, renderer);
            this.now_resize();
        });
    }
    now_resize() {}
}
export { Resizer };