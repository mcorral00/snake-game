console.log("hello World")
// Define HTML elements
const board = document.getElementById("game-board");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");

// Define game variable
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = "right";
let gameStarted = false;
let gameSpeedDelay = 200;
let gameInterval;

// Draw game map, snake, food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
}

// snake function
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPostion(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// food function
function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPostion(foodElement, food);
  board.appendChild(foodElement);
}

// Creating snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of the snake or food
function setPostion(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}


// Generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); // clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// Start game function
function startGame() {
  gameStarted = true; // keep track of a running game
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Keypress event listener
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === "space") ||
    (!gameStarted && event.key === " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
    }
  }
}
document.addEventListener("keydown", handleKeyPress);

// Increasing game speed
function increaseSpeed() {
  if (gameSpeedDelay > 135) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  }
}

// Check collision and reset game
function checkCollision() {
  const head = snake[0];

  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

// Reset game
function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
  updateScore();
}

// Keep score
function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(2, "0");
}

// update high score
function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore < highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(2, "0");
  }
  highScoreText.style.display = "block";
}

// Stop game / clear game interval 
function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = "block";
  logo.style.display = "block";
}
console.log(increaseSpeed)