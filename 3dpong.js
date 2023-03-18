const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Paddles
const paddleWidth = 1;
const paddleHeight = 6;
const paddleDepth = 0.5;

const leftPaddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
const rightPaddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

const leftPaddle = new THREE.Mesh(leftPaddleGeometry, paddleMaterial);
const rightPaddle = new THREE.Mesh(rightPaddleGeometry, paddleMaterial);

leftPaddle.position.set(-10, 0, 0);
rightPaddle.position.set(10, 0, 0);

scene.add(leftPaddle);
scene.add(rightPaddle);

// Ball
const ballSize = 0.8;
const ballGeometry = new THREE.SphereGeometry(ballSize, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 0, 0);
scene.add(ball);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
