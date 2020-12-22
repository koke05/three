import * as THREE from "../js/three.module.js";
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;
let num =30;
let rot =0;
function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
    });
    renderer.setClearColor(new THREE.Color(0xe0f7ff));

    let camera = new THREE.PerspectiveCamera(45, width / height);

    let scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

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

    const geometry = new THREE.Geometry();

    for(let i = 0; i < num; i++){
        for(let j = 0; j < num; j++){
            for(let k = 0; k < num; k++){
                const meshTemp = new THREE.Mesh(
                    new THREE.BoxGeometry(10, 10, 10)
                  );
                meshTemp.position.set(
                    30 * (i - num / 2),
                    30 * (j - num / 2),
                    30 * (k - num / 2)
                )
                geometry.mergeMesh(meshTemp);
            }
        }
    }

    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    tick();

    function tick(){
        rot += 0.5;
        const radian = (rot * Math.PI) / 180;
        camera.position.x = 100 * Math.sin(radian);
        camera.position.y = 100 * Math.sin(radian);
        camera.position.z = 100 * Math.cos(radian);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }    
}