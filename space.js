var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var tankWidth = 30;
var tankHeight = 10;
var tankX = (canvas.width - tankWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var bulletActive = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function drawBullet(){
	ctx.beginPath();
  ctx.arc(tankX +15, canvas.height - (tankHeight +15), 2, 0, Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTank();
	
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
  } else if (spacePressed && !bulletActive)
  {
  	bulletActive = true;
  	drawBullet();
  }
	requestAnimationFrame(draw);
}

draw();
