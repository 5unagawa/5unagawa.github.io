//tank.js

function createTank(myCanvas){
  let canvas = myCanvas;
  let tankObj = {width: 30, height: 10, position: (canvas.width - 30)/2 } 
  return tankObj;
}

function moveTank(myCanvas, tankObj, left, right){
  let canvas = myCanvas;
  let tank = tankObj;
  let newPos = tank.position;	
  if (left == true){
    if (tank.position  <= 0) {
        newPos = 0;
    }
    else newPos -= 5;
  }
	
  if (right == true){
    if (tank.position + tank.wodth >= canvas.width) {
        newPos = canvas.width - tank.width;
    }
    else  newPos += 5;
  }
  return newPos;
}

function createBullet(myCanvas, tankObj){
  let canvas = myCanvas;
  let tank = tankObj;
  let bulletObj = {spawn: canvas.height - (tank.height + 15), xPos: tank.position, yPos: canvas.height - (tank.height + 15), active: false};
  return bulletObj;
}

function drawBullet(myCanvas, bulletObj){
  let canvas = myCanvas;
  let ctx = canvas.getContext('2d');
  let bullet = bulletObj;
  
  ctx.beginPath();
  ctx.arc(bullet.xPos, bullet.yPos, 5, 0, Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

export { createTank, moveTank, createBullet, drawBullet };
