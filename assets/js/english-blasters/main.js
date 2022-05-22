//main.js 

import { create , drawUI } from '.canvas.js';
//import { createTank, drawTank, moveTank, createBullet, drawBullet } from '/tank.js';

var myCanvas = create('myDiv','myCanvas', document.body, 480, 320);
var lives = 3;
var score = 0;
var round = 1;
var roundMultiplier = 1;
var extraLife = spawnExtraLife(myCanvas.width);
var lifeOnScreen = false;

//keyboard inputs
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Tank-related variables
var tank = createTank(myCanvas);
var bullet = createBullet(myCanvas, tank);

//word-related variables

var wordArray = [];
  for (let i = 0; i < wordCount; i++){
    wordArray[i] = {x: wordX, y: wordY, status:1, answer: chooseWord(objArray)};
  }

var targetWord = chooseWord(wordArray);
var targetHit = false;





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

function spawnExtraLife(canvasWidth){
	//randomly choose an x co-ord to spawn in the life object
	var can = myCanvas;
	var randomNum = Math.floor(Math.random() * (canvasWidth - 44));
	lifeObj = {xPos: randomNum, yPos: 0, active: false, spawn: true};
	return lifeObj;
}

function drawLife(myCanvas, life){
	var ctx = myCanvas.getContext('2d');
	ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.moveTo(life.xPos, life.yPos+20);
	ctx.lineTo(life.xPos+12, life.yPos);
	ctx.lineTo(life.xPos+32, life.yPos);
	ctx.lineTo(life.xPos+44, life.yPos+20);
	ctx.lineTo(life.xPos+32, life.yPos+40);
	ctx.lineTo(life.xPos+12, life.yPos+40);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "red";
    ctx.font = "60px Arial";
	let textWidth = ctx.measureText("+");
    ctx.fillText("+", life.xPos + 5, life.yPos + 41);
}

function collisionDetection(words, bulletObj, lifeObj){
	let bullet = bulletObj;
	let life = lifeObj;
	for (let i = 0; i < words.length; i++){
		let word = words[i];
		if (word.status == 1 && bullet.active == true) {
			if (bullet.xPos > word.x && bullet.xPos < (word.x + wordWidth) && bullet.yPos > word.y && bullet.yPos < (word.y + wordHeight) ) {
				word.status = 0;
				bullet.active = false;
				bullet.yPos = bullet.spawn;
			
			    if (word.answer.en != targetWord.answer.en ){
          			score -= 10;
		  			lives -= 1;
        		}
        		else {
					if (round % 5 == 0){
						score += 50
					}
					else {
						score+=10;	
					}
					targetHit = true;
				}
			} 	
		}
		if (bullet.active == true && life.active == true){
			if (bullet.xPos > life.xPos && bullet.xPos < (life.xPos + 44) && bullet.yPos > life.yPos && bullet.yPos < (life.yPos + 40)){
				lives += 1;
				bullet.active = false;
				bullet.yPos = bullet.spawn;
				life.active = false;
				life.spawn = false;
			}
		}
	}
}

function gameLoop(){
 var myCan = document.getElementById('myCanvas');
  var myCtx = myCan.getContext('2d');
  myCtx.clearRect(0, 0, myCan.width, myCan.height);

  drawUI(myCanvas, lives, round, score);
  
  drawTank(myCanvas, tankPosition);

  if (targetHit == true) {
	  console.log("Round multiplier: " + roundMultiplier);
	  roundMultiplier += 0.1;
	  round += 1;
	  
	  if (extraLife.active == true){
	  	extraLife.spawn = false;
	  }
	  
	  if (extraLife.active == false){
	  	extraLife.spawn = true;
		extraLife = spawnExtraLife(myCanvas.width);
		
	  }
	  
	  myCtx.clearRect(0, 0, myCan.width, myCan.height);
  	  wordArray = [];
  	  for (let i = 0; i < wordCount; i++){
        wordArray[i] = {x: 0, y: 0, status:1, answer: chooseWord(objArray)};
	  
  	  }
	  wordOffsetTop = 0;
	  targetWord = chooseWord(wordArray);
	  document.getElementById('targetWord').innerHTML = targetWord.answer.en;
	  targetHit = false;
  }
	
	
   drawWords();
   if (round % 10 == 0 && extraLife.spawn == true){
	extraLife.active = true;
   }
	collisionDetection(wordArray, bullet, extraLife);
  if (leftPressed){
    tankPosition = moveTank(tankPosition, leftPressed, rightPressed, myCanvas);
  }
  if (rightPressed){
    tankPosition = moveTank(tankPosition, leftPressed, rightPressed, myCanvas);
  }

  if (spacePressed && bullet.active == false){
	bullet.xPos = tankPosition +15;
	bullet.yPos = bullet.spawn;
	bullet.active=true;
	  
    
    drawBullet(bullet);
	  
  }

  if (bullet.active == true) {
    bullet.yPos -= 10;
    drawBullet(bullet);
    if (bullet.yPos <= 2){
      bullet.yPos = -1;
      bullet.active = false;
    }
  }
  
  if (extraLife.active == true) {
  
	drawLife(myCan, extraLife);
	extraLife.yPos += 0.5;
	if (extraLife.yPos > myCan.height){
		extraLife.active = false;
		extraLife.spawn = false;
		console.log("life despawned");
	}
  }
  
  wordOffsetTop += (0.1 * roundMultiplier);

  if ( (wordArray[0].y + wordHeight > (myCan.height - (tankHeight+9))) || lives == 0){
          window.alert("Game Over.");
  	}
  else {
  	  requestAnimationFrame(gameLoop);
  }

}

document.getElementById('targetWord').innerHTML = targetWord.answer.en;
gameLoop(myCanvas)
