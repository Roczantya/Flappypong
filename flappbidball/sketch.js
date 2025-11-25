// Variabel Global
let gameScreen = 0;
let ballX, ballY;
let ballSize = 20;
let ballColor;
let gravity = 1;
let ballSpeedVert = 0;
let airfriction = 0.0001;
let friction = 0.1;
let racketColor;
let racketWidth = 100;
let racketHeight = 10;
let racketBounceRate = 20;
let ballSpeedHorizon = 10;
let wallSpeed = 5;
let wallInterval = 1000;
let lastAddTime = 0;
let minGapHeight = 200;
let maxGapHeight = 300;
let wallWidth = 80;
let wallColors;
let maxHealth = 100;
let health = 100;
let score = 0;
let healthDecrease = 1; // Kurangi HP jika kena dinding
let healthBarWidth = 60;

// Dalam JS, ArrayList diganti dengan Array biasa []
let walls = []; 

function setup() {
  createCanvas(800, 500);
  
  // Inisialisasi warna di dalam setup
  ballColor = color(0);
  racketColor = color(0);
  wallColors = color(0);

  ballX = width / 4;
  ballY = height / 5;
}

function draw() {
  if (gameScreen == 0) {
    initScreen();
  } else if (gameScreen == 1) {
    gameScreenFunc(); // Saya ganti nama karena bentrok dengan variabel gameScreen
  } else if (gameScreen == 2) {
    gameOverScreen();
  }
}

// --- Screen Contents ---

function initScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(20);
  text("Klik untuk Memulai", width / 2, height / 2);
}

function gameScreenFunc() {
  background(255);
  drawBall();
  applyGravity();
  keepInScreen();
  drawRacket();
  watchRacketBounce();
  applyHorizontalSpeed();
  wallAdder();
  wallHandler();
  drawHealthBar();
  printScore(); // Menampilkan skor saat bermain
}

function gameOverScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(30);
  text("GAME OVER", width / 2, height / 2 - 20);
  textSize(15);
  text("(Klik untuk Ulang)", width / 2, height / 2 + 20);
  printScore(); // Tampilkan skor akhir
}

function mousePressed() {
  if (gameScreen == 0) {
    startGame();
  }
  if (gameScreen == 2) {
    restart();
  }
}

function startGame() {
  gameScreen = 1;
  ballX = width / 4;
  ballY = height / 5;
  ballSpeedVert = 0;
  ballSpeedHorizon = 10; // Reset kecepatan horizontal juga
}

function drawBall() {
  fill(ballColor);
  noStroke();
  ellipse(ballX, ballY, ballSize, ballSize);
}

function applyGravity() {
  ballSpeedVert += gravity;
  ballY += ballSpeedVert;
  ballSpeedVert -= (ballSpeedVert * airfriction);
}

function makeBounceBottom(surface) {
  ballY = surface - (ballSize / 2);
  ballSpeedVert *= -1;
  ballSpeedVert -= (ballSpeedVert * friction);
}

function makeBounceTop(surface) {
  ballY = surface + (ballSize / 2);
  ballSpeedVert *= -1;
  ballSpeedVert -= (ballSpeedVert * friction);
}

function makeBounceLeft(surface){
  ballX = surface + (ballSize/2);
  ballSpeedHorizon *= -1;
  ballSpeedHorizon -= (ballSpeedHorizon * friction);
}

function makeBounceRight(surface){
  ballX = surface - (ballSize/2);
  ballSpeedHorizon *= -1;
  ballSpeedHorizon -= (ballSpeedHorizon * friction);
}

function keepInScreen() {
  if (ballY + (ballSize / 2) > height) {
    makeBounceBottom(height);
  }
  if (ballY - (ballSize / 2) < 0) {
    makeBounceTop(0);
  }
  if (ballX - (ballSize / 2) < 0) {
    makeBounceLeft(0);
  }
  if (ballX + (ballSize / 2) > width) {
    makeBounceRight(width);
  }
}

function drawRacket() {
  fill(racketColor);
  rectMode(CENTER);
  rect(mouseX, mouseY, racketWidth, racketHeight);
}

function watchRacketBounce() {
  let overhead = mouseY - pmouseY;
  if ((ballX + (ballSize / 2) > mouseX - (racketWidth / 2)) && 
      (ballX - (ballSize / 2) < mouseX + (racketWidth / 2))) {
    
    if (dist(ballX, ballY, ballX, mouseY) <= (ballSize / 2) + abs(overhead)) {
      makeBounceBottom(mouseY);
      ballSpeedHorizon = (ballX - mouseX) / 5;
      
      if (overhead < 0) {
        ballY += overhead;
        ballSpeedVert += overhead;
      }
    }
  }
}

function applyHorizontalSpeed() {
  ballX += ballSpeedHorizon;
  ballSpeedHorizon -= (ballSpeedHorizon * airfriction);
}

function wallAdder() {
  if (millis() - lastAddTime > wallInterval) {
    let randHeight = round(random(minGapHeight, maxGapHeight));
    let randY = round(random(0, height - randHeight));
    
    // Dalam JS, kita simpan sebagai array biasa
    // Format: [x, y, width, height, scored]
    let randWall = [width, randY, wallWidth, randHeight, 0]; 
    walls.push(randWall);
    lastAddTime = millis();
  }
}

function wallHandler() {
  // Loop terbalik disarankan saat menghapus elemen array
  for (let i = walls.length - 1; i >= 0; i--) {
    wallMover(i);
    wallDrawer(i);
    WatchWallCollision(i);
    wallRemover(i); // Cek hapus terakhir
  }
}

function wallDrawer(index) {
  let wall = walls[index];
  let gapWallX = wall[0];
  let gapWallY = wall[1];
  let gapWallWidth = wall[2];
  let gapWallHeight = wall[3];
  
  rectMode(CORNER);
  fill(wallColors);
  rect(gapWallX, 0, gapWallWidth, gapWallY);
  rect(gapWallX, gapWallY + gapWallHeight, gapWallWidth, height - (gapWallY + gapWallHeight));
}

function wallMover(index) {
  let wall = walls[index];
  wall[0] -= wallSpeed;
}

function wallRemover(index) {
  let wall = walls[index];
  if (wall[0] + wall[2] <= 0) {
    walls.splice(index, 1); // splice menggantikan .remove()
  }
}

function WatchWallCollision(index) {
  let wall = walls[index];
  let gapWallX = wall[0];
  let gapWallY = wall[1];
  let gapWallWidth = wall[2];
  let gapWallHeight = wall[3];
  let wallScored = wall[4];
  
  let wallTopX = gapWallX;
  let wallTopY = 0;
  let wallTopWidth = gapWallWidth;
  let wallTopHeight = gapWallY;
  
  let wallBottomX = gapWallX;
  let wallBottomY = gapWallY + gapWallHeight;
  let wallBottomWidth = gapWallWidth;
  let wallBottomHeight = height - (gapWallY + gapWallHeight);

  // Logika Tabrakan (Collision)
  let collision = false;

  // Cek Tabrakan Atas
  if (
    (ballX + ballSize / 2 > wallTopX) &&
    (ballX - ballSize / 2 < wallTopX + wallTopWidth) &&
    (ballY + ballSize / 2 > wallTopY) &&
    (ballY - ballSize / 2 < wallTopY + wallTopHeight)
  ) {
    collision = true;
  }

  // Cek Tabrakan Bawah
  if (
    (ballX + ballSize / 2 > wallBottomX) &&
    (ballX - ballSize / 2 < wallBottomX + wallBottomWidth) &&
    (ballY + ballSize / 2 > wallBottomY) &&
    (ballY - ballSize / 2 < wallBottomY + wallBottomHeight)
  ) {
    collision = true;
  }

  // Jika tabrakan terjadi
  if (collision) {
     health -= healthDecrease;
     if (health <= 0) {
       gameScreen = 2; // Game Over
     }
  }

  // Scoring Logic
  if (ballX > gapWallX + (gapWallWidth / 2) && wallScored == 0) {
    wall[4] = 1; // Tandai sudah dilewati
    scoreGame();
  }
}

function drawHealthBar() {
  noStroke();
  rectMode(CORNER);
  
  // Background bar (abu-abu)
  fill(236, 240, 241);
  rect(ballX - (healthBarWidth / 2), ballY - 30, healthBarWidth, 5);
  
  // Menentukan warna HP
  if (health > 60) {
    fill(46, 204, 113);
  } else if (health > 30) {
    fill(230, 126, 34);
  } else {
    fill(231, 76, 60);
  }
  
  // Menggambar bar HP yang tersisa
  let currentHealthWidth = map(health, 0, maxHealth, 0, healthBarWidth);
  // Pastikan lebar tidak negatif
  if(currentHealthWidth < 0) currentHealthWidth = 0;
  
  rect(ballX - (healthBarWidth / 2), ballY - 30, currentHealthWidth, 5);
}

function scoreGame() {
  score++;
}

function printScore() {
  textAlign(CENTER);
  fill(0);
  textSize(30);
  text(score, width / 2, 40);
}

function restart() {
  score = 0;
  health = maxHealth;
  ballX = width / 4;
  ballY = height / 5;
  lastAddTime = 0;
  walls = []; // Mengosongkan array
  gameScreen = 0;
  ballSpeedVert = 0;
  ballSpeedHorizon = 10;
}