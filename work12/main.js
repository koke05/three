import * as THREE from "../js/three.module.js"
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js";
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;
const objects = [];
const color = new THREE.Color();

function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas')
    });

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 10;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

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

    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    const Directionallight = new THREE.DirectionalLight();
    Directionallight.position.set(100, 1, 10);
    scene.add(Directionallight);

    const controls = new PointerLockControls( camera, document.body )
    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener( 'click', function () {
        controls.lock();
    }, false )
    controls.addEventListener('lock',function(){
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    })
    controls.addEventListener('unlock',function(){
        blocker.style.display = 'block';
        instructions.style.display = '';
    })
    scene.add(controls.getObject());
    const onKeyDown = function(event){
        switch (event.keyCode){
            case 38:
            case 87:
                moveForward = false;
                break;

            case 37:
            case 65:
                moveLeft = false;
                break;

            case 40:
            case 83:
                moveBackward = false;
                break;

            case 39:
            case 68:
                moveRight = false;
                break;
        }
    const onKeyUp = function ( event ) {
        switch ( event.keyCode ) {
            case 38:
            case 87:
                moveForward = false;
                break;
            case 37:
            case 65:
                moveLeft = false;
                break;
            case 40:
            case 83:
                moveBackward = false;
                break;
            case 39:
            case 68:
                moveRight = false;
                break;
        }

    };
    document.addEventListener('keydown',onKeyDown,false)
    document.addEventListener('keyup',onKeyUp.false)

    const raycaster = new THREE.Raycaster(new THREE.Vector3(),new THREE.Vector3( 0, - 1, 0 ), 0, 10 )
    }

    const floorGeometry = new THREE.PlaneBufferGeometry(1000,1000,100,100);
    floorGeometry.rotateX(- Math.PI/2);
    const floorMaterial = new THREE.MeshLambertMaterial({color:0x79adba});
    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    scene.add( floor );
    
    const boxGeometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

    for ( let i = 0; i < 500; i ++ ) {
        const boxMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
        const box = new THREE.Mesh( boxGeometry, boxMaterial );
        box.position.x = (Math.random() - 0.5) * 300;
        box.position.y = (Math.random() - 0.5) * 200+100;
        box.position.z = (Math.random() - 0.5) * 700;
        scene.add( box );
        objects.push( box );
    }

    
    tick();

    function tick(){
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }
}