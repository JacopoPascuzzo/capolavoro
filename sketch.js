et pong1;
let pong2;
let palla;
let vite1 = 3;
let vite2 = 3;
let vittorie1 = 0; 
let vittorie2 = 0; 
let altezzapad = 200;
let larghezzapad = 20;
let distpadY = 60;
let distpadX = 50;
let gameState = 'play'; 
let restartButton;
let endButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pong1 = new Pong(distpadX, (windowHeight - altezzapad) / 2, larghezzapad, altezzapad);
  pong2 = new Pong(windowWidth - distpadX - larghezzapad, (windowHeight - altezzapad) / 2, larghezzapad, altezzapad);
  palla = new Palla(40);

  
  restartButton = createButton('Restart');
  restartButton.position(windowWidth / 2 - 150, windowHeight / 2 + 40);
  restartButton.size(100, 50);
  restartButton.mousePressed(restartGame);
  restartButton.hide();

  endButton = createButton('Exit');
  endButton.position(windowWidth / 2 +50, windowHeight / 2 + 40);
  endButton.size(100, 50);
  endButton.mousePressed(exitGame);
  endButton.hide();
}

function draw() {
  background(0);

  if (gameState === 'play') {
    pong1.mostra();
    pong2.mostra();
    pong1.muoviWS();
    pong2.muoviUD();
    palla.mostra();
    palla.muovi();
    palla.controllaCollisione(pong1, pong2);

    // cuore1
    for (let i = 0; i < vite1; i++) {
      drawHeart(90 + i * 40, 25, 25);
    }

    // cuore2
    for (let i = 0; i < vite2; i++) {
      drawHeart(windowWidth - 90 - i * 40, 25, 25);
    }

    
    if (vite1 <= 0) {
      gameState = 'win2';
      vittorie2++; 
      restartButton.show();
      endButton.show();
    } else if (vite2 <= 0) {
      gameState = 'win1';
      vittorie1++; 
      restartButton.show();
      endButton.show();
    }
  } else {
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    if (gameState === 'win1') {
      text('Player 1 Wins!', windowWidth / 2, windowHeight / 2 - 40);
    } else if (gameState === 'win2') {
      text('Player 2 Wins!', windowWidth / 2, windowHeight / 2 - 40);
    }
  }

  
  textSize(20);
  fill(255);
  textAlign(LEFT, TOP);
  text('Player 1 Victories: ' + vittorie1, 70, windowHeight - 40);
  textAlign(RIGHT, TOP);
  text('Player 2 Victories: ' + vittorie2, windowWidth - 70, windowHeight - 40);
}

function restartGame() {
  vite1 = 3;
  vite2 = 3;
  palla.reset();
  gameState = 'play';
  restartButton.hide();
  endButton.hide();
}
function exitGame() {
  restartButton.hide();
  endButton.hide();
  window.close()
  
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

class Pong {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 10;
  }

  mostra() {
    rect(this.x, this.y, this.w, this.h);
  }

  muoviUD() {
    this.y = constrain(this.y, 0, height - this.h);
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
  }

  muoviWS() {
    this.y = constrain(this.y, 0, height - this.h);
    if (keyIsDown(87)) {  
      this.y -= this.speed;
    }
    if (keyIsDown(83)) {  
      this.y += this.speed;
    }
  }
}

class Palla {
  constructor(r) {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.r = r;
    this.Xspeed = 7.5;
    this.Yspeed = 7.5;
    this.Xbase = 7.5;
    this.Ybase = 7.5;
  }

  mostra() {
    circle(this.x, this.y, this.r);
  }

  muovi() {
    this.y += this.Yspeed;
    this.x += this.Xspeed;
    if (this.x > width) {
      this.reset();
      this.Xspeed = -this.Xbase;
      vite2--;
    }
    if (this.y > height || this.y < 0) {
      this.Yspeed = -this.Yspeed;
    }
    if (this.x < 0) {
      this.reset();
      this.Xspeed = this.Xbase;
      vite1--;
    }
  }

  reset() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.Xspeed = this.Xbase;
    this.Yspeed = this.Ybase;
  }

  controllaCollisione(pong1, pong2) {
    
    if (this.x - this.r / 2 <= pong1.x + pong1.w && this.x - this.r / 2 >= pong1.x &&
        this.y + this.r / 2 >= pong1.y && this.y - this.r / 2 <= pong1.y + pong1.h) {
      this.Xspeed = -this.Xspeed * 1.05;
      this.Yspeed = this.Yspeed * 1.025;
      this.x = pong1.x + pong1.w + this.r / 2;  
    }

    
    if (this.x + this.r / 2 >= pong2.x && this.x + this.r / 2 <= pong2.x + pong2.w &&
        this.y + this.r / 2 >= pong2.y && this.y - this.r / 2 <= pong2.y + pong2.h) {
      this.Xspeed = -this.Xspeed * 1.05;
      this.Yspeed = this.Yspeed * 1.025;
      this.x = pong2.x - this.r / 2;  
    }
  }
}
