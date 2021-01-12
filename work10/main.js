import * as THREE from "../js/three.module.js"
window.addEventListener('load',init);

function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
        alpha: true
    });

    const camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 3500 );
    camera.position.set(0,0,2500)

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
    // renderer.setClearColor(0xf0fcff);
    let scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    const Directionallight = new THREE.DirectionalLight();
    Directionallight.position.set(100, 1, 10);
    scene.add(Directionallight);

    const loader = new THREE.FontLoader();

    loader.load( 'font/Josefin Sans Light_Regular.json', function ( font ) {
        const textgeometry = new THREE.TextGeometry( 'three.js', {
            font: font,
            size: 180,
            height: 80,
            curveSegments: 10,
        });
        textgeometry.center()
        const textmaterial = [
            new THREE.MeshBasicMaterial({ 
                color: 0xa1c4fd, 
            }),
            new THREE.MeshBasicMaterial({
                color: 0xc2e9fb,
            }),  
        ];
        const mesh = new THREE.Mesh(textgeometry,textmaterial)
        mesh.position.z = 700
        scene.add(mesh)
    });

    const shape = [];
    const geometry = new THREE.IcosahedronGeometry(500,0,);

    for(let i = 1; i <= 3; i++){
        const material = new THREE.MeshNormalMaterial({
            blending: THREE.AdditiveBlending, 
            transparent: true,
            opacity: 0.7
        })
        shape[i] = new THREE.Mesh(geometry,material)
        scene.add(shape[i])
    }

    tick();

    function tick(){
        requestAnimationFrame(tick);
        for(let i = 1; i <= 3; i++){
            shape[i].rotation.x += i *0.008
            shape[i].rotation.y += i*0.005
        }
        renderer.render(scene, camera);
    }
}