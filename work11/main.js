import * as THREE from "../js/three.module.js"
window.addEventListener('load',init);

function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
        alpha: true
    });

    const camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 3500 );
    camera.position.set(0,0,2500)

    onResize();
    window.addEventListener('resize',onResize);

    function onResize(){
        let width = window.innerWidth;
        let height = window.innerHeight;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}