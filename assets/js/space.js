//JS Invaders

class Game() {
    constructor() {
	this.canvas = document.getElementById("myCanvas");
	this.ctx = this.canvas.getContext("2d");
        this.score = 0;
	this.alienRowCount = 5;
	this.alienColumnCount = 11;
	this.reversed = false;
	this.rightPressed = false;
        this.leftPressed = false;
        this.spacePressed = false;
    }

    function initialise(){
    	this.canvas.addEventListener("keydown", keyDownHandler, false);
	this.canvas.addEventListener("keyup", keyUpHandler, false);
    }
    
    function keyDownHandler(e){
        if (e.key == "Right" || e.key == "ArrowRight"){
  	    rightPressed = true;
  	} else if (e.key == "Left" || e.key == "ArrowLeft") {
  	    leftPressed = true;
        } else if (e.key == "Spacebar" || e.key == " ") {
  	    spacePressed = true;
        }
    }

    function keyUpHandler(e){
        if (e.key == "Right" || e.key == "ArrowRight"){
            rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        } else if (e.key == "Spacebar" || e.key == " ") {
            spacePressed = false;
        }
    }
    
    function collisionDetection() {
        for (var c = 0; c < alienColumnCount; c++) {
  	    for (var r = 0; r < alienRowCount; r++) {
	        var a = aliens[c][r];
                if (a.status == 1) {
      	            if (bulletX > a.x && bulletX < a.x + alienWidth && bulletY > a.y && bulletY < a.y + alienHeight) {
         	        a.status = 0;
         	        bulletY = -1;
         	        score++;
        	        if (score == alienRowCount * alienColumnCount) {
		            alert("You win!");
			    document.location.reload();
		        }
                    }
                    if (canvas.height - (tankHeight + 10) < a.y + alienHeight) {
                        alert("Game Over.");
                        document.location.reload();
                    }
                } 
            }
        }
    }

    function drawBullet() {
        ctx.beginPath();
        ctx.arc(bulletX, bulletY, 2, 0, Math.PI*2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    function drawScore(){
        ctx.font ="16px Arial";
	ctx.fillStyle = "White";
	ctx.fillText("SCORE: " + score, 8, 20);
    } 

    function drawTank(){
	ctx.beginPath();
        ctx.rect(tankX, canvas.height - tankHeight, tankWidth, tankHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(tankX + 10, canvas.height - tankHeight - 10, 10, 10);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
	
    function gameLoop(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTank();
  drawAliens();
  collisionDetection();
  drawScore();
	
  if (rightPressed) {
  	tankX += 5;
    if (tankX + tankWidth > canvas.width) {
    	tankX = canvas.width - tankWidth;
    }
  } else if (leftPressed) {
    	tankX -= 5;
      if (tankX  < 0) {
      	tankX = 0;
      }
  } 
  
  if (spacePressed && bulletActive == false) {
  	bulletActive = true;
    bulletX = tankX + 14;
  	drawBullet();
  }
  if (bulletActive) {
  	bulletY -= 10;
    drawBullet();
    if (bulletY <= 2) {
      bulletY = bulletSpawn;
    	bulletActive = false;
    }
	}
	
  if (reversed) {
  	alienOffsetLeft -= (0.25*speed);
    if (alienOffsetLeft <= 0) {
    	alienOffsetTop += 30
    	reversed = false;
      speed += 0.25;
    }
  }
  else {
   	alienOffsetLeft += (0.25*speed);
    if (alienOffsetLeft > canvas.width - 320) {
    	alienOffsetTop += 30;
    	reversed = true;
      speed += 0.25;
    }
  }
  requestAnimationFrame(gameLoop);
}	
	
}

class Alien {
    constructor() {
        this.width = w;
	this.height = h;
	this.padding = p;
	this.offsetTop = ot;
	this.speed = s;
	this.alienX = 0;
	this.alienY = 0;
    }
}
class Tank {
    constructor() {
        this.width = 30;
	this.height = 10;
	this.tankX = (canvas.width - this.width) / 2;
    }
}

class Bullet {
    constructor() {
        this.active = False;
	this.spanPoint = canvas.height - 25; //tank height +15
	this.bulletX = 0;
	this.bulletY = this.spawnPoint;
    }
}



var aliens = [];
	for (var c=0; c<alienColumnCount; c++) {
  	aliens[c] = [];
    for (var r=0; r<alienRowCount; r++) {
    	aliens[c][r] = { x:alienX, y:alienY, status:1 };
    }
   }

function drawAliens() {
	for (var c=0; c<alienColumnCount; c++) {
		for (var r=0; r<alienRowCount; r++) {
			if (aliens[c][r].status == 1) {
		  	var aX = (c*(alienWidth + alienPadding)) + alienOffsetLeft;
		    var aY = (r*(alienHeight + alienPadding)) + alienOffsetTop;
	      aliens[c][r].x = aX;
		   	aliens[c][r].y = aY;
		    ctx.beginPath();
		    ctx.rect(aX + alienX, aY + alienY, alienWidth, alienHeight);
		    ctx.fillStyle = "green";
		    ctx.fill();
		    ctx.closePath();
			}
 		}
	}
}

function drawBullet(){
	ctx.beginPath();
  ctx.arc(bulletX, bulletY, 2, 0, Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawScore(){
  ctx.font ="16px Arial";
	ctx.fillStyle = "White";
	ctx.fillText("SCORE: " + score, 8, 20);
} 

function drawTank(){
	ctx.beginPath();
  ctx.rect(tankX, canvas.height - tankHeight, tankWidth, tankHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(tankX + 10, canvas.height - tankHeight - 10, 10, 10);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}


gameLoop();
