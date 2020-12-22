import * as THREE from "../js/three.module.js";
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;
let rot = 0;


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


    let scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0x000000,50,2000);

    let group = new THREE.Group();
    scene.add(group);
    let geometry= new THREE.BoxGeometry(50,50,50);
    let material = new THREE.MeshLambertMaterial({color:0x79adba})
    for (let i = 0; i < 2000; i++) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 2000;
        mesh.position.y = (Math.random() - 0.5) * 2000;
        mesh.position.z = (Math.random() - 0.5) * 2000;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
        // グループに格納する
        group.add(mesh);
      }

    let sprite = new THREE.Sprite(material);
    
    scene.add(sprite)


    let directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    let AmbientLight = new THREE.AmbientLight(0x999999);
    scene.add(AmbientLight);

    tick();

    function tick(){
        rot += 0.5;
        let radian = (rot * Math.PI) / 180;
        camera.position.x = 500 * Math.sin(radian);
        camera.position.y = 500 * Math.sin(radian);
        camera.position.z = -1500 * Math.cos(radian);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }

}