if (!Detector.webgl) Detector.addGetWebGLMessage();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const paddleWidth = 1;
const paddleHeight = 6;
const paddleDepth = 0.5;
const ballSize = 0.8;
const paddleSpeed = 0.2;
const ballSpeed = 0.4;

const leftPaddle = createPaddle(-10, 0, 0);
const rightPaddle = createPaddle(10, 0, 0);
const ball = createBall(0, 0, 0);

camera.position.z = 30;

let ballDirection = new THREE.Vector3(Math.random() > 0.5 ? 1 : -1, Math.random() > 0.5 ? 1 : -1, 0).normalize();
let leftPaddleDirection = 0;
let rightPaddleDirection = 0;

function createPaddle(x, y, z) {
  const geometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const paddle = new THREE.Mesh(geometry, material);
  paddle.position.set(x, y, z);
  scene.add(paddle);
  return paddle;
}

function createBall(x, y, z) {
  const geometry = new THREE.SphereGeometry(ballSize, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const ball = new THREE.Mesh(geometry, material);
  ball.position.set(x, y, z);
  scene.add(ball);
  return ball;
}

function updatePaddle(paddle, direction) {
  paddle.position.y += direction * paddleSpeed;
  paddle.position.y = Math.max(paddle.position.y, -11 + paddleHeight / 2);
  paddle.position.y = Math.min(paddle.position.y, 11 - paddleHeight / 2);
}

function moveBall() {
  ball.position.add(ballDirection.clone().multiplyScalar(ballSpeed));

  if (ball.position.y <= -11 + ballSize || ball.position.y >= 11 - ballSize) {
    ballDirection.y *= -1;
  }

  if (ball.position.x <= -10 + paddleWidth + ballSize && ball.position.x >= -10 - ballSize && ball.position.y >= leftPaddle.position.y - paddleHeight / 2 - ballSize && ball.position.y <= leftPaddle.position.y + paddleHeight / 2 + ballSize) {
    ballDirection.x *= -1;
    ball.position.x = -10 + paddleWidth + ballSize;
  } else if (ball.position.x >= 10 - paddleWidth - ballSize && ball.position.x <= 10 + ballSize && ball.position.y >= rightPaddle.position.y - paddleHeight / 2 - ballSize && ball.position.y <= rightPaddle.position.y + paddleHeight / 2 + ballSize) {
    ballDirection.x *= -1;
    ball.position.x = 10 - paddleWidth - ballSize;
  }

  if (ball.position.x < -15 || ball.position.x > 15) {
    ball.position.x = 0;
    ball.position.y = 0;
    ballDirection = new THREE.Vector3(Math.random() > 0.5 ? 1 : -1, Math.random() > 0.5 ? 1 : -1, 0).normalize();
  }

  if (ball.position.x > 0 && ballDirection.x > 0) {
    if (Math.random() < 0.1) {
      leftPaddleDirection = Math.random() < 0.5 ? -1 : 1;
    }
  }

  if (ball.position.x < 0 && ballDirection.x < 0) {
    if (Math.random() < 0.1) {
      rightPaddleDirection = Math.random() < 0.5 ? -1 : 1;
    }
  }
}

function animate() {
  updatePaddle(leftPaddle, leftPaddleDirection);
  updatePaddle(rightPaddle, rightPaddleDirection);
  moveBall();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

document.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    leftPaddleDirection = 1;
  } else if (event.key === 's') {
    leftPaddleDirection = -1;
  }

  if (event.key === 'ArrowUp') {
    rightPaddleDirection = 1;
  } else if (event.key === 'ArrowDown') {
    rightPaddleDirection = -1;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'w' || event.key === 's') {
    leftPaddleDirection = 0;
  }

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    rightPaddleDirection = 0;
  }
});
