import * as THREE from "../js/three.module.js"
window.addEventListener('load',init);

let rot = 0;
let size = 1000;

function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
    });

    const camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 3500 );

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
    let scene = new THREE.Scene();

    tick();

    function tick(){    
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }
}