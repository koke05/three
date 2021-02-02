import * as THREE from "../js/three.module.js";
import { FlyControls } from "https://threejs.org/examples/jsm/controls/FlyControls.js";
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;
let controls;

function init(){
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
    });
    renderer.setClearColor(new THREE.Color(0x263E78));

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(50,50,10);
    
    camera.rotation.y = -0.8;
    camera.rotation.z = -0.3;
    camera.rotation.x = -0.4;

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

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const AmbientLight = new THREE.AmbientLight(0x999999);
    scene.add(AmbientLight);

    scene.fog = new THREE.FogExp2( 0x263E78, 0.002 );

    const planegeometry = new THREE.PlaneGeometry(510,510,10);
    const planematerial = new THREE.MeshPhongMaterial({color:0x244876});
    planematerial.shininess = 100;
    const planemesh = new THREE.Mesh(planegeometry,planematerial);
    planemesh.position.x = 245; 
    planemesh.position.y = 0.4; 
    planemesh.position.z = -255; 
    planemesh.rotation.x = -1.55;
    scene.add(planemesh);
    
    let buildings = [];
    let rowZ = 0;

    const buildinggeometry = new THREE.BoxGeometry(4,4,4);

    for(let r = 0; r < 50; r++){
        rowZ -= 10;
        for(let i = 0; i < 50; i++){
            let getRandomInt = function(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            };
            let h = getRandomInt(0,255)
            let color = new THREE.Color("rgb("+h+","+h+","+h+")");
            const buldingmaterial = new THREE.MeshPhongMaterial({color:color});
            let rand = Math.ceil(Math.random()*10);
            buildings[i] = new THREE.Mesh(buildinggeometry,buldingmaterial);
            buildings[i].scale.y = rand;
            buildings[i].position.x = i * 10
            buildings[i].position.y = (rand*4)/2
            buildings[i].position.z = rowZ
            scene.add(buildings[i]); 
        }
    }

    controls = new FlyControls( camera, renderer.domElement );
    controls.movementSpeed = 300;
    controls.rollSpeed = Math.PI / 30; 
    
    tick();

    function tick(){
        requestAnimationFrame(tick);
        // camera.position.z -= 0.5;
        // camera.position.x += 0.5;
        renderer.render(scene, camera);
    }

}