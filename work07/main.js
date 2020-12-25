import * as THREE from "../js/three.module.js"
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;
let r01 = 120;
let r02 = 300

function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas')
    });

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, +1000);

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

    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    let AmbientLight = new THREE.AmbientLight(0x999999);
    scene.add(AmbientLight);

    const pointlight = new THREE.PointLight(0xff0000, 5, 10, 0);
    scene.add(pointlight);

    const spheregeometry = new THREE.SphereGeometry(50,50,50);
    const spherematerial = new THREE.MeshPhongMaterial({
        color:0x5c1010,
    });
    const sphere = new THREE.Mesh(spheregeometry,spherematerial)
    scene.add(sphere)

    const group01 = new THREE.Group();
    scene.add(group01)

    const material02 = new THREE.MeshLambertMaterial({
        color:0x4f0000,
        transparent: true,
        opacity: 0.75
    })
    for(let i = 0;i < 700; i++){
        let getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };
        let rad = getRandomInt(0,600)
        let rad2 = getRandomInt(0,600)
        let size = getRandomInt(5,10)
        const geometry02 = new THREE.BoxGeometry(size,size,30)
        const box = new THREE.Mesh(geometry02,material02);
        box.position.x = (Math.cos(rad) * Math.cos(rad2) * -r01)
        box.position.y = (Math.sin(rad2) * r01)
        box.position.z = (Math.sin(rad) * Math.cos(rad2) * r01) 
        box.rotation.x = rad
        box.rotation.y = rad
        box.lookAt(0, 0, 0);
        group01.add(box);
    }

    const group02 = new THREE.Group();
    scene.add(group02);

    const material03 = new THREE.MeshPhongMaterial({color:0x1f1f1f})
    for(let i = 0;i < 1000; i++){
        let getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };
        let rad = getRandomInt(0,600)
        let rad2 = getRandomInt(0,600)
        let size = getRandomInt(5,20)
        const geometry03 = new THREE.BoxGeometry(size,size,size)
        const box = new THREE.Mesh(geometry03,material03);
        box.position.x = (Math.cos(rad) * Math.cos(rad2) * -r02)
        box.position.y = (Math.sin(rad2) * r02)
        box.position.z = (Math.sin(rad) * Math.cos(rad2) * r02) 
        box.rotation.x = rad
        box.rotation.y = rad
        group02.add(box);
    }
    scene.add(group02)

    tick();

    function tick(){
        requestAnimationFrame(tick)
        group02.rotation.y +=0.01
        group02.rotation.x +=0.01
        renderer.render(scene, camera);
    }

}
