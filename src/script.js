import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/* Models */
const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)



/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 2000

const positions = new Float32Array(count * 3) 

for(let i = 0; i < count * 3; i++) 
{
    const randomNumber = Math.random()

    if(i % 3 == 0 && randomNumber > 2 && randomNumber < -2){
        positions[i] = randomNumber * 300
        console.log('yoooo')
    }
    else{
        positions[i] = (randomNumber - 0.5) * 400 
 
    }
}


particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


gltfLoader.load(
    '/models/baking-texture-1.glb',
    (gltf) =>
    {
        console.log(gltf)
        const cockpit = gltf.scene.children[0]
        cockpit.scale.set(2.5, 3, 3)
        cockpit.position.set(270, 0, -180)
        cockpit.rotation.set(0, 0.2, 0)
        scene.add(cockpit)

        const rotate = () =>
        {
            const elapsedTime = clock.getElapsedTime()

            // Update controls
            controls.update()
            cockpit.rotation.y = elapsedTime * 0.1
            

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(rotate)
        }

        rotate()
    }
)


gltfLoader.load(
    '/models/cockpit-4.glb',
    (gltf) =>
    {
        console.log(gltf)
        const cockpit = gltf.scene.children[0]
        cockpit.scale.set(1.2, 1.2, 1.2)
        cockpit.position.set(-10, 0, 0)
        scene.add(cockpit)
    }
)

gltfLoader.load(
    '/models/cockpit-3.glb',
    (gltf) =>
    {
        console.log(gltf)
        const cockpit = gltf.scene.children[0]
        cockpit.scale.set(1.2, 1.2, 1.2)
        cockpit.position.set(10, 0, 0)
        cockpit.rotation.z = 10
        scene.add(cockpit)
    }
)

gltfLoader.load(
    '/models/cockpit-8.glb',
    (gltf) =>
    {
        console.log(gltf)
        const cockpit = gltf.scene.children[0]
        cockpit.scale.set(1.2, 1.2, 1.2)
        cockpit.position.set(0, 0, 0)
        cockpit.rotation.set(Math.PI * 0.5, Math.PI * 0.75, 0) 
        scene.add(cockpit)
    }
)

gltfLoader.load(
    '/models/cockpit-9.glb',
    (gltf) =>
    {
        console.log(gltf)
        const cockpit = gltf.scene.children[0]
        cockpit.scale.set(1.2, 1.2, 1.2)
        cockpit.position.set(0, 0.5, 0)
        cockpit.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.5) 
        scene.add(cockpit)
    }
)

gltfLoader.load(
    '/models/cockpit-10.glb',
    (gltf) =>
    {
        console.log(gltf)
        const cockpit = gltf.scene.children[0]
        cockpit.scale.set(0.5, 0.5, 0.5)
        cockpit.position.set(2, 0.8, 0)
        cockpit.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.5) 
        scene.add(cockpit)
    }
    
)

gltfLoader.load(
    '/models/cockpit-10.glb',
    (gltf) =>
    {
        console.log(gltf)
        const cockpit2 = gltf.scene.children[0]
        cockpit2.scale.set(0.5, 0.5, 0.5)
        cockpit2.position.set(-2, 0.8, 0)
        cockpit2.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.5) 
        scene.add(cockpit2)
    }
    
)

gltfLoader.load(
    '/models/cockpit-11.glb',
    (gltf) =>
    {
        console.log(gltf)
        const cockpit2 = gltf.scene.children[0]
        cockpit2.scale.set(8, 2, 2)
        cockpit2.position.set(0, -0.8, 3)
        cockpit2.rotation.x = Math.PI * 0.3
        scene.add(cockpit2)
    }
    
)


// Lights


const hemisphereLight = new THREE.HemisphereLight(0x0000dd, 0x880020, 2)
scene.add(hemisphereLight)

const directionalLight = new THREE.DirectionalLight(0xB8500fc, 3)
directionalLight.position.set(1, 8, 3)
directionalLight.lookAt(new THREE.Vector3(0,0,0))
scene.add(directionalLight)


/**
 * Plane black
//  */
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 30, 30),
    new THREE.MeshBasicMaterial({ color: 0x000000})
)
plane.rotation.x = Math.PI * (-0.5)
plane.position.z = 7
plane.position.y = -10
scene.add(plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 300)
camera.position.z = 8
camera.position.y = 2.5
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// // to disable rotation
// controls.enableRotate = false;
// // controls.maxZoom = 5
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()