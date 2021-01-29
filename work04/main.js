import * as THREE from "../js/three.module.js";
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;
let rot = 0;

function init(){
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
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

    scene.fog = new THREE.Fog(0x000000,50,2000);

    const group = new THREE.Group();
    scene.add(group);
    const material = new THREE.MeshStandardMaterial({color: 0xf2f2f2, roughness:0});
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 700;
        const y = (Math.random() - 0.5) * 700;
        const z = (Math.random() - 0.5) * 700;
        const geometry = new THREE.BoxGeometry(15,15,15);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        group.add(mesh);
    }
    const light = new THREE.PointLight(0x0000ff, 100, 10, 0);
    scene.add(light);
    // const lightHelper = new THREE.PointLightHelper(light,10);
    // scene.add(lightHelper);
    const light2 = new THREE.PointLight(0xff0000, 100, 10, 0);
    scene.add(light2);
    // const lightHelper2 = new THREE.PointLightHelper(light2, 10);
    // scene.add(lightHelper2);
    const light3 = new THREE.PointLight(0x00ff00, 100, 10, 0);
    scene.add(light3);
    // const lightHelper3 = new THREE.PointLightHelper(light3,10);
    // scene.add(lightHelper3);
    const light4 = new THREE.PointLight(0x9500ff, 100, 10, 0);
    scene.add(light4);
    // const lightHelper4 = new THREE.PointLightHelper(light4,10);
    // scene.add(lightHelper4);

    const AmbientLight = new THREE.AmbientLight(0xf0f0f0);
    scene.add(AmbientLight);

    
    tick();

    function tick(){
        group.rotation.y += 0.001
        group.rotation.x += 0.001
        rot += 0.8;
        let radian = (rot * Math.PI) / 180;
        let bx = 500 * Math.sin(radian);
        let by = 500 * Math.sin(radian);
        let bz = 500 * Math.cos(radian);
        let rx = -500 * Math.sin(radian);
        let ry = -500 * Math.sin(radian);
        let rz = -500 * Math.cos(radian);
        let gx = 500 * Math.sin(radian);
        let gy = -500 * Math.sin(radian);
        let gz = 500 * Math.cos(radian);
        let yx = -500 * Math.sin(radian);
        let yy = 500 * Math.sin(radian);
        let yz = 500 * Math.cos(radian);
        light.position.set(bx,by,bz);
        light2.position.set(rx,ry,rz);
        light3.position.set(gx,gy,gz);
        light4.position.set(yx,yy,yz);
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }

}