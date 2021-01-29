import * as THREE from "../js/three.module.js";
window.addEventListener('load',init);

let width = 500
let height = 500;
let size = 2000;
let length = 250000;
function init(){
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.bgCanvas'),
    });
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 1000;  

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
    renderer.setClearColor(new THREE.Color(0x0f0f0f));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.002 );

    const geometry = new THREE.Geometry();
    const textureLoader = new THREE.TextureLoader();

    const sprite = textureLoader.load( 'image/snow.png' );

    for(let i = 0; i< length; i++){
        geometry.vertices.push(new THREE.Vector3(
            Math.random() * size - size/2,
            Math.random() * size - size/2,
            Math.random() * size - size/2,
        ))
    }

    const material = new THREE.PointsMaterial({
        size: 5,
        color: 0xffffff,
        map:sprite,
        blending: THREE.AdditiveBlending, 
        depthTest: false, 
        transparent: true
    })

    const particles =new THREE.Points(geometry,material);

    scene.add(particles)

    tick();

    function tick(){
        requestAnimationFrame(tick);
        particles.rotation.x += 0.001
        particles.rotation.y -= 0.0004
        renderer.render(scene, camera);
    }
}