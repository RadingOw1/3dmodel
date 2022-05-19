import shuttle from './shuttle.glb'

import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import TWEEN from '@tweenjs/tween.js';

let div = document.createElement('ul');
div.classList.add('controls');
div.innerHTML = `
<div class="container">
    <div class="wrap">
        <button class="btn" id="front">Front</button>
        <button class="btn" id="up">up</button>
        <button class="btn" id="back">back</button>
    </div>
</div> 
`
document.body.appendChild(div);


const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);   
camera.position.z = 1;

const scene = new THREE.Scene();

let up = () => {
    alert('Wait, model is loading...')
}
let back = () => {
    alert('Wait, model is loading...')
}
let front = () => {
    alert('Wait, model is loading...')
}


const light = new THREE.AmbientLight( 0x404040 );
scene.add( light);

const backOffset = {x:0,z: 0, y: 1.5}
const frontOffset = {x:0,z: 0, y: -1.5}
const upOffset = {x:1.5,z: 0, y: 1.5}

let currentOffset = {x: 0, z:0, y: 0}

const loader = new GLTFLoader();
loader.load(
    shuttle,
    ( gltf ) => {
        up = () => {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)
            const coords = currentOffset;
            const tween = new TWEEN.Tween(coords)
                .to({x: upOffset.x, y: upOffset.y, z: upOffset.z}, 1000)
                .easing(TWEEN.Easing.Quadratic.Out) 
                .onUpdate(() => {
                    console.log(JSON.stringify(coords));
                    currentOffset = {x: coords.x, y: coords.y, z: coords.z}
                    gltf.scene.rotation.x = coords.x;
                    gltf.scene.rotation.z = coords.z;
                    gltf.scene.rotation.y = coords.y;

                })
                .start()
        }

        front = () => {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)
            const coords = currentOffset;
            const tween = new TWEEN.Tween(coords)
                .to({x: frontOffset.x, y: frontOffset.y, z: frontOffset.z}, 1000)
                .easing(TWEEN.Easing.Quadratic.Out) 
                .onUpdate(() => {
                    console.log(JSON.stringify(coords));
                    currentOffset = {x: coords.x, y: coords.y, z: coords.z}
                    gltf.scene.rotation.x = coords.x;
                    gltf.scene.rotation.z = coords.z;
                    gltf.scene.rotation.y = coords.y;

                })
                .start()
        }

        back = () => {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)
            const coords = currentOffset;
            const tween = new TWEEN.Tween(coords)
                .to({x: backOffset.x, y: backOffset.y, z: backOffset.z}, 1000)
                .easing(TWEEN.Easing.Quadratic.Out) 
                .onUpdate(() => {
                    console.log(JSON.stringify(coords));
                    currentOffset = {x: coords.x, y: coords.y, z: coords.z}
                    gltf.scene.rotation.x = coords.x;
                    gltf.scene.rotation.z = coords.z;
                    gltf.scene.rotation.y = coords.y;

                })
                .start()
        }

        let root = gltf.scene;
        root.scale.set(0.01,0.01,0.01);
        scene.add(root);

        document.querySelector('#up').addEventListener('click', up);
        document.querySelector('#front').addEventListener('click', front);
        document.querySelector('#back').addEventListener('click', back);
    },
    ( xhr ) => {
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {
        console.error( 'An error happened', error );
    },
);


const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );


function animation( time ) {


	renderer.render( scene, camera );

}
