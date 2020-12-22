import * as THREE from "../js/three.module.js"
window.addEventListener('load',init);

let rot = 0;
let size = 1000;

function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas'),
    });

    const camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 3500 );

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
    scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
    
    const linematerial = new THREE.LineBasicMaterial({
        color: 0x1bb300,
        linewidth: 5,
        morphTargets:true,
        linejoin:"bevel"
    });
    
    const linegroup = new THREE.Group();
    for(let i = 0; i < 50; i++){
        const linegeometry = new THREE.Geometry();
        linegeometry.vertices.push(
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(Math.random()*900-500,Math.random()*900-500,Math.random()*900-500),
            new THREE.Vector3(Math.random()*600-200,Math.random()*600-200,Math.random()*600-200),
            new THREE.Vector3(Math.random()*800-200,Math.random()*800-200,Math.random()*800-200),
            new THREE.Vector3(Math.random()*800-400,Math.random()*800-400,Math.random()*800-400),
            new THREE.Vector3(Math.random()*300-200,Math.random()*300-200,Math.random()*300-200)
        )
        const line = new THREE.Line( linegeometry, linematerial );
        linegroup.add(line)
    }
    scene.add( linegroup );
    
    const spritegeometry = new THREE.Geometry();
    const textureLoader = new THREE.TextureLoader();

    const sprite = textureLoader.load( 'image/ball.png' );

    for(let i = 0; i< 2000; i++){
        spritegeometry.vertices.push(new THREE.Vector3(
            Math.random() * size - size/2,
            Math.random() * size - size/2,
            Math.random() * size - size/2,
        ))
    }

    const spritematerial = new THREE.PointsMaterial({
        size: 10,
        color: 0xffffff,
        map:sprite,
        blending: THREE.AdditiveBlending, 
        transparent: true
    })

    const particles =new THREE.Points(spritegeometry,spritematerial);

    scene.add(particles)

    tick();

    function tick(){
        rot += 0.1;
        let radian = (rot * Math.PI) / 180;
        camera.position.x = 500 * Math.sin(radian);
        camera.position.y = 500 * Math.cos(radian);
        camera.position.z = 500 * Math.cos(radian);
        camera.lookAt(new THREE.Vector3(0, 10, 0));

        const time = Date.now() * 0.00005;
        const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
		linematerial.color.setHSL( h, 0.3, 0.3);
        spritematerial.color.setHSL( h, 0.7, 0.7);
        
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }
}