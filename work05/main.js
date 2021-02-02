import * as THREE from "../js/three.module.js";
import { FlyControls } from "https://threejs.org/examples/jsm/controls/FlyControls.js";
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;
let controls;
const clock = new THREE.Clock();

function init(){
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas')
    });

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, +1500);

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

    const scene = new THREE.Scene();

    const material = new THREE.MeshLambertMaterial({
        color:0xffffff,
        wireframe: true
    })
    const geometry = [
        [ new THREE.IcosahedronBufferGeometry( 10, 16 ), 0 ],
        [ new THREE.IcosahedronBufferGeometry( 40, 8 ), 100 ],
        [ new THREE.IcosahedronBufferGeometry( 60, 4 ), 500 ],
        [ new THREE.IcosahedronBufferGeometry( 80, 2 ), 1000 ],
        [ new THREE.IcosahedronBufferGeometry( 100, 1 ), 2000 ]
    ];

    for ( let j = 0; j < 800; j ++ ) {

        const lod = new THREE.LOD();

        for ( let i = 0; i < geometry.length; i ++ ) {

            const mesh = new THREE.Mesh( geometry[ i ][ 0 ], material );
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            lod.addLevel( mesh, geometry[ i ][ 1 ] );

        }
        lod.position.x = 3000 * ( 0.5 - Math.random() );
        lod.position.y = 3000 * ( 0.5 - Math.random() );
        lod.position.z = 3000 * ( 0.5 - Math.random() );
        lod.updateMatrix();
        lod.matrixAutoUpdate = false;
        scene.add( lod );

    }



    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const AmbientLight = new THREE.AmbientLight(0x99999);
    scene.add(AmbientLight);

    const pointlight = new THREE.PointLight(0xffff00);
    pointlight.position.set(0,0,0)
    scene.add(pointlight)

    controls = new FlyControls( camera, renderer.domElement );
    controls.movementSpeed = 300;
    controls.rollSpeed = Math.PI / 30;

    tick();

    function tick(){
        requestAnimationFrame(tick);
        controls.update( clock.getDelta() );
        renderer.render(scene, camera);
    }

}