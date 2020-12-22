import * as THREE from "../js/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;
let rot = 0;


function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
    });

    let camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, +1000);
    let controls = new OrbitControls(camera,renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

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

    scene.fog = new THREE.Fog(0x000000,50,2000);

    let group = new THREE.Group();
    scene.add(group);
    let geometry = new THREE.TorusGeometry(15,3,10,100)
    let material = new THREE.MeshPhongMaterial({color:0x1c1c1c})
    for (let i = 0; i < 3000; i++) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 1500;
        mesh.position.y = (Math.random() - 0.5) * 1500;
        mesh.position.z = (Math.random() - 0.5) * 1500;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
        group.add(mesh);
    }
    let sprite = new THREE.Sprite(material);
    
    scene.add(sprite)


    let directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    let AmbientLight = new THREE.AmbientLight(0x999999);
    scene.add(AmbientLight);

    const light = new THREE.PointLight(0xffffff, 5, 10, 0);
    scene.add(light);
    const light2 = new THREE.PointLight(0x0000ff, 5, 10, 0);
    scene.add(light2);
    
    tick();

    function tick(){
        group.rotation.x += 0.001
        rot += 0.8;
        let radian = (rot * Math.PI) / 180;
        let bx = 1000 * Math.sin(radian);
        let by = 1000 * Math.sin(radian);
        let bz = 1000 * Math.cos(radian);
        let rx = -1000 * Math.sin(radian);
        let ry = -1000 * Math.sin(radian);
        let rz = -1000 * Math.cos(radian);
        light.position.set(bx,by,bz);
        light2.position.set(rx,ry,rz);
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }

}