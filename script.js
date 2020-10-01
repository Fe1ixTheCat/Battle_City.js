/////////////global///////////////////////////
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/////////////classes///////////////////
class Map {
  constructor() {
    this.width = 800,
    this.height = 600,
    this.x = 0,
    this.y = 0
  }
}

class MapCell {
  constructor(x, y, material) {
    this.width =  50,
    this.height = 50,
    this.xPos = 50 * x,
    this.yPos = 50 * y,
    this.image = new Image(),
    this.material = material
  }
}

class PlayerOne {
  constructor(x, y) {
    this.width = 50,
    this.height = 50,
    this.x = x * 50,
    this.y = y * 50,
    this.vector = 'top'
  }
}

class Enemy {
  constructor(x, y) {
    this.name = 'Enemy middle tank'
    this.width = 50,
    this.height = 50,
    this.x = x,
    this.y = y,
    this.vector = 'down'
    this.image = new Image()
  }
}

class Bullet {
  constructor() {
    this.width = 5,
    this.height = 5,
    this.xPos = playerOne.x + 22,
    this.yPos = playerOne.y + 22,
    this.speed = 5,
    this.vector = playerOne.vector,
    bullets.push(this)
  }
  draw() {
    ctx.fillStyle = 'gray';

    if (this.vector == 'top') {
      ctx.rect(this.xPos, this.yPos -= this.speed, 5, 5);
      ctx.fill();
    }
    if (this.vector == 'right') {
      ctx.rect(this.xPos += this.speed, this.yPos, 5, 5)
      ctx.fill();
    }
    if (this.vector == 'left') {
      ctx.rect(this.xPos -= this.speed, this.yPos, 5, 5)
      ctx.fill();
    }
    if (this.vector == 'down') {
      ctx.rect(this.xPos, this.yPos += this.speed, 5, 5)
      ctx.fill();
    }
  }
  check() {
    if (this.xPos > 800 || this.xPos < 0 || this.yPos < 0 || this.yPos > 600) {
      bullets.shift();
    }
    for (var i = 0; i < bullets.length; i++) {
      for (var j = 0; j < enemies.length; j++) {
        if (bullets[i] != undefined) {
          isColission(bullets[i], enemies[j], i, j);
        }
      }
    }
  }
}
class EnemyBullet {
  constructor(x, y, vector) {
    this.width = 5,
    this.height = 5,
    this.xPos = x + 22,
    this.yPos = y + 22,
    this.speed = 5,
    this.vector = vector,
    enemybullets.push(this)
  }
  draw() {
    ctx.fillStyle = 'gray';

    if (this.vector == 'top') {
      ctx.rect(this.xPos, this.yPos -= this.speed, this.width, this.height);
      ctx.fill();
    }
    if (this.vector == 'right') {
      ctx.rect(this.xPos += this.speed, this.yPos, this.width, this.height)
      ctx.fill();
    }
    if (this.vector == 'left') {
      ctx.rect(this.xPos -= this.speed, this.yPos, this.width, this.height)
      ctx.fill();
    }
    if (this.vector == 'down') {
      ctx.rect(this.xPos, this.yPos += this.speed, this.width, this.height)
      ctx.fill();
    }
  }
  check(i) {
    if (this.xPos > 800 || this.xPos < 0 || this.yPos < 0 || this.yPos > 600) {
      enemybullets.splice(i, 1);
    }
    for (var i = 0; i < enemybullets.length; i++) {
        if (enemybullets[i] != undefined) {
          isPlayerColission(enemybullets[i], i,);
        }
    }
  }
}

const map = new Map();
let reserve = 20;
var enemies = [];
setInterval(function() {
  if (enemies.length < 10 && reserve > 0) {
    reserve--;
    let rand = Math.floor(Math.random() * 3)
    if (rand == 0) {
      enemies.push(new Enemy(1, 1))
    } else if (rand == 1) {
      enemies.push(new Enemy(350, 1))
    } else if (rand == 2) {
      enemies.push(new Enemy(750, 1))
    }
  }
  if (reserve == 0 && enemies.length == 0) {
    //alert('Congratulations! You win');
    //location.reload();
  }
}, 5000)

let playerOne = new PlayerOne(5, 11);
const playerOneImg = new Image();
const enemyImg = new Image();
playerOneImg.src = 'img/rtank-top.png';
for (let g = 0; g < enemies.length; g++) {
  enemies[g].image.src = 'img/enemy-down.png';
}

const enemybullets = [];

const bullets = [];
var bullet = true;
var enemybullet = true;

///////////map///////////////////////////////
const materials = ['none', 'waffle', 'milk', 'jelly', 'chocolate', 'cottoncandy'];
//////////////////    0        1       2        3          4            5       //////////////////

const mapCells = [];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCanvas() {
  ctx.beginPath();
  ctx.rect(map.x, map.y, map.width, map.height);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();
  requestAnimationFrame(drawCanvas);
};
drawCanvas();

for (let q = 0; q < mapCells.length; q++) {
  if (mapCells[q].material == 'waffle') {
    mapCells[q].image.src = 'img/waffle.png';
  }
  if (mapCells[q].material == 'milk') {
    mapCells[q].image.src = 'img/milk.png';
  }
  if (mapCells[q].material == 'jelly') {
    mapCells[q].image.src = 'img/jelly.png';
  }
  if (mapCells[q].material == 'chocolate') {
    mapCells[q].image.src = 'img/chocolate.png';
  }
  if (mapCells[q].material == 'cottoncandy') {
    mapCells[q].image.src = 'img/cottoncandy.png';
  }
}

function drawMaterials() {
  ctx.beginPath();
  for (let i = 0; i < mapCells.length; i++) {
    ctx.drawImage(mapCells[i].image, mapCells[i].xPos, mapCells[i].yPos);
  }
  ctx.closePath();
  requestAnimationFrame(drawMaterials);
}
drawMaterials();
//////////////////draws////////////////////


function drawPlayerOne() {
  ctx.beginPath();
  ctx.drawImage(playerOneImg, playerOne.x, playerOne.y);
  ctx.rect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);
  ctx.closePath();
  requestAnimationFrame(drawPlayerOne);
}
drawPlayerOne();

function drawEnemy() {
  ctx.beginPath();
  for (var i = 0; i < enemies.length; i++) {
    ctx.drawImage(enemies[i].image, enemies[i].x, enemies[i].y);
    ctx.rect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
  }
  ctx.closePath();
  requestAnimationFrame(drawEnemy);
}
drawEnemy();

function shoot() {
  ctx.beginPath();
  bullets.forEach(bullet => bullet.draw());
  bullets.forEach((bullet) => bullet.check());

  ctx.closePath();
  requestAnimationFrame(shoot);
}

function isColission(objectOne, objectTwo, i, j) {
  if (objectOne.yPos <= objectTwo.y + 49 && objectOne.yPos >= objectTwo.y && objectOne.xPos <= objectTwo.x + 49 && objectOne.xPos >= objectTwo.x) {
    //console.log('Player 1 killed', objectTwo.name );
    bullets.splice(i, 1)
    enemies.splice(j, 1)
  }
}

function isPlayerColission(enemybullet, i) {
  if (enemybullet.yPos <= playerOne.y + 49 && enemybullet.yPos >= playerOne.y && enemybullet.xPos <= playerOne.x + 49 && enemybullet.xPos >= playerOne.x) {
    enemybullets.splice(i, 1);
    playerOne = '';
    playerOne = new PlayerOne(5, 11);
  }
}


//////////controls/////////////

document.addEventListener('keydown', function (e) {
  if (e.keyCode == "65") {
    playerOneImg.src = 'img/rtank-left.png';
    playerOne.vector = 'left';
    if (playerOne.x >= 1) {
      if (playerOne.x >= 1) {
        playerOne.x -= 5;
      }
    }
  }
});
document.addEventListener('keydown', function (e) {
  if (e.keyCode == "68") {
    playerOneImg.src = 'img/rtank-right.png';
    playerOne.vector = 'right';
    if (playerOne.x <= 749) {
      playerOne.x += 5;
    }
  }
});
document.addEventListener('keydown', function (e) {
  if (e.keyCode == "87") {
    playerOneImg.src = 'img/rtank-top.png';
    playerOne.vector = 'top';
    if (playerOne.y >= 1) {
      playerOne.y -= 5;
    }
  }
});
document.addEventListener('keydown', function (e) {
  if (e.keyCode == "83") {
    playerOneImg.src = 'img/rtank-down.png';
    playerOne.vector = 'down';
    if (playerOne.y <= 549) {
      playerOne.y += 5;
    }
  }
});
document.addEventListener('keydown', function (e) {
  if (e.keyCode == "32") {
    new Bullet();
    if (bullet) {
      bullet = false;
      shoot();
    }
  }
});
///////////bots/////////////////////////

function botShoot(x, y, vector) {
  ctx.beginPath();
  enemybullets.forEach(enemybullet => enemybullet.draw());
  enemybullets.forEach((enemybullet, i) => enemybullet.check(i));
  ctx.closePath();
  requestAnimationFrame(botShoot);
}

function botBullets() {
  for (let i = 0; i < enemies.length; i++) {
    rand = Math.floor(Math.random() * enemies.length + 1)
    new EnemyBullet(enemies[i].x, enemies[i].y, enemies[i].vector)
    if (enemybullet) {
      enemybullet = false;
      botShoot(enemies[i].x, enemies[i].y, enemies[i].vector);
    }
  }
}

setInterval(botBullets, 1500);

const botVectors = ['top', 'right', 'down', 'left'];
var vectorRandom = setInterval(function() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].vector = botVectors[Math.floor(Math.random() * 4)]
  }
}, 2000)
function botGoing() {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].vector == 'top') {
      enemies[i].y--;
      enemies[i].image.src = 'img/enemy-top.png';
    }
    if (enemies[i].vector == 'right') {
      enemies[i].x++;
      enemies[i].image.src = 'img/enemy-right.png';
    }
    if (enemies[i].vector == 'down') {
      enemies[i].y++;
      enemies[i].image.src = 'img/enemy-down.png';
    }
    if (enemies[i].vector == 'left') {
      enemies[i].x--;
      enemies[i].image.src = 'img/enemy-left.png';
    }
    if (enemies[i].y < 1) {
      let rand = Math.floor(Math.random() * 2)
      if (rand == 0) {
        enemies[i].vector = 'down';
      } else if (rand == 1) {
        enemies[i].vector = 'left';
      } else {
        enemies[i].vector = 'right';
      }
    }
    if (enemies[i].y > 548) {
      let rand = Math.floor(Math.random() * 2)
      if (rand == 0) {
        enemies[i].vector = 'top';
      } else if (rand == 1) {
        enemies[i].vector = 'left';
      } else {
        enemies[i].vector = 'right';
      }
    }
    if (enemies[i].x > 749) {
      let rand = Math.floor(Math.random() * 2)
      if (rand == 0) {
        enemies[i].vector = 'left';
      } else if (rand == 1) {
        enemies[i].vector = 'top';
      } else {
        enemies[i].vector = 'down';
      }
    }
    if (enemies[i].x < 0) {
      let rand = Math.floor(Math.random() * 2)
      if (rand == 0) {
        enemies[i].vector = 'right';
      } else if (rand == 1) {
        enemies[i].vector = 'top';
      } else {
        enemies[i].vector = 'down';
      }
    }
  }
}
setInterval(botGoing, 10)
