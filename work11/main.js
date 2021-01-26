import * as THREE from "../js/three.module.js"
window.addEventListener('load',init);

let width = window.innerWidth;
let height = window.innerHeight;

function init(){
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.myCanvas')
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
    let scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    const Directionallight = new THREE.DirectionalLight();
    Directionallight.position.set(100, 1, 10);
    scene.add(Directionallight);

    const mouse = new THREE.Vector2(0.5, 0.5);

    const uniforms = {
        uAspect: {
          value: width / height
        },
        uTime: {
          value: 0.0
        },
        uMouse:{
            value:new THREE.Vector2(0.5,0.5)
        }
    };

    function mousemove(x,y){
        mouse.x = x / width;
        mouse.y = 1.0 - (y / height);
    }

    window.addEventListener('mousemove', e => {
        mousemove(e.clientX, e.clientY);
    });

    const vertexSource = `
    varying vec2 vUv;

    void main() {
    vUv = uv;

    gl_Position = vec4( position, 1.0 );
    }
    `;

    const fragmentSource = `
    varying vec2 vUv;
    uniform float uAspect;
    uniform float uTime;
    uniform vec2 uMouse;

    void main() {
    vec2 uv = vec2( vUv.x * uAspect, vUv.y);
    vec2 center = vec2( uMouse.x * uAspect, uMouse.y );
    float radius = 0.01;
    float lightness = radius / length( uv - center );
    vec4 color = vec4( vec3( lightness ), 1.0 );
    color *= vec4( 0.2, 0.5, 1.0, 1.0 );

    gl_FragColor = color;
    }
    `;
    const geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexSource,
        fragmentShader: fragmentSource,
      });
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);


    tick();

    function tick(){
        requestAnimationFrame(tick);
        const sec = performance.now() / 500;
        uniforms.uTime.value = sec;
        uniforms.uMouse.value.lerp(mouse, 0.2);
        renderer.render(scene, camera);
    }
}