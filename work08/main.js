import * as THREE from "../js/three.module.js"
window.addEventListener('load',init);

let length = 150000;
let r = 500

function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
    });
    renderer.setClearColor(new THREE.Color(0xe0f7ff));

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set(0, 0, +500);

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

    let scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x010101, 0.002 );

    const geometry = new THREE.SphereGeometry(150,150,50);

    const material = new THREE.PointsMaterial({
        size: 5,
        blending: THREE.AdditiveBlending
    })
    for(let i = 0; i< length; i++){
        let getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        let rad = getRandomInt(0,800)
        let rad2 = getRandomInt(0,800)
        geometry.vertices.push(new THREE.Vector3(
            Math.cos(rad) * Math.cos(rad2) * -r,
            Math.sin(rad2) * r,
            Math.sin(rad) * Math.cos(rad2) * r ,
        ))
    }
    
    const particles =new THREE.Points(geometry,material);

    scene.add(particles)

    tick();

    function tick(){
        const time = Date.now() * 0.00005;
        requestAnimationFrame(tick);
        particles.rotation.y += 0.0003
        const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
		material.color.setHSL( h, 0.5, 0.5 );
        renderer.render(scene, camera);
    }
}