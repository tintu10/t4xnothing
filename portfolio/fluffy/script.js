const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Responsive canvas
function resizeCanvas() {
  canvas.width = window.innerWidth > 500 ? 400 : window.innerWidth - 40;
  canvas.height = window.innerHeight > 700 ? 600 : window.innerHeight - 100;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Sounds
const flapSound = document.getElementById("flapSound");
const hitSound = document.getElementById("hitSound");

// Bird
let birdX = 50;
let birdY = canvas.height / 2;
let birdRadius = 15;
let velocity = 0;
let gravity = 0.5;
let jumpStrength = -8;

// Pipes
let pipes = [];
let pipeWidth = 50;
let pipeGap = 120;
let pipeSpeed = 2;
let frame = 0;

// Score
let score = 0;
let gameOverFlag = false;

// Controls
function flap() {
  if (gameOverFlag) return;
  velocity = jumpStrength;
  flapSound.currentTime = 0;
  flapSound.play();
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") flap();
});
document.addEventListener("click", flap);
document.addEventListener("touchstart", flap);

// Game Loop
function update() {
  if (gameOverFlag) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird
  velocity += gravity;
  birdY += velocity;

  ctx.beginPath();
  ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();

  // Pipes
  if (frame % 100 === 0) {
    let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - 40)) + 20;
    pipes.push({ x: canvas.width, y: pipeY });
  }

  pipes.forEach((pipe, index) => {
    pipe.x -= pipeSpeed;

    ctx.fillStyle = "green";
    // Top pipe
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
    // Bottom pipe
    ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height);

    // Collision detection
    if (
      birdX + birdRadius > pipe.x &&
      birdX - birdRadius < pipe.x + pipeWidth &&
      (birdY - birdRadius < pipe.y ||
        birdY + birdRadius > pipe.y + pipeGap)
    ) {
      endGame();
    }

    // Score
    if (pipe.x + pipeWidth < birdX && !pipe.passed) {
      score++;
      pipe.passed = true;
    }

    // Remove off-screen pipes
    if (pipe.x + pipeWidth < 0) {
      pipes.splice(index, 1);
    }
  });

  // Ground/ceiling collision
  if (birdY + birdRadius > canvas.height || birdY - birdRadius < 0) {
    endGame();
  }

  // Score display
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  frame++;
  requestAnimationFrame(update);
}

function endGame() {
  hitSound.currentTime = 0;
  hitSound.play();
  gameOverFlag = true;

  ctx.fillStyle = "red";
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  ctx.font = "20px Arial";
  ctx.fillText("Tap to reload", canvas.width / 2 - 70, canvas.height / 2 + 40);

  // Reload on tap
  canvas.addEventListener("click", () => location.reload());
  canvas.addEventListener("touchstart", () => location.reload());
}

update();
