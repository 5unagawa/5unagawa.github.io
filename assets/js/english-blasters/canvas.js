//canvas.js is responsible for setting up the canvas and drawing the UI.

function create(divId, canId, parent, width, height) {
  let divWrapper = document.createElement('div');
  let canvasElem = document.createElement('canvas');
  let pElem = document.createElement('p');
  parent.appendChild(divWrapper);
  divWrapper.appendChild(canvasElem);
  divWrapper.appendChild(pElem)

  divWrapper.id = divId;
  canvasElem.id = canId;
  canvasElem.width = width;
  canvasElem.height = height;
  pElem.id = "targetWord";
  pElem.innerHTML = "PLACEHOLDER";
  let ctx = canvasElem.getContext('2d');

  return {
    ctx: ctx,
    id: canId,
	width: width,
	height: height
  };
}

function drawUI(myCanvas, lives, round, score){
  myCanvas.ctx.font = "16px Arial";
  myCanvas.ctx.fillStyle = "White";
  myCanvas.ctx.fillText("LIVES: " + lives + "   ROUND: " + round + "   SCORE: " + score, 8, 20);
}

function drawPickup(myCanvas, myPickup){
  let pickup = myPickup;
  myCanvas.ctx.fillStyle = 'white';
  myCanvas.ctx.beginPath();
  myCanvas.ctx.moveTo(pickUp.xPos, pickUp.yPos+20);
  myCanvas.ctx.lineTo(pickUp.xPos+12, pickUp.yPos);
  myCanvas.ctx.lineTo(pickUp.xPos+32, pickUp.yPos);
  myCanvas.ctx.lineTo(pickUp.xPos+44, pickUp.yPos+20);
  myCanvas.ctx.lineTo(pickUp.xPos+32, pickUp.yPos+40);
  myCanvas.ctx.lineTo(pickUp.xPos+12, pickUp.yPos+40);
  myCanvas.ctx.closePath();
  myCanvas.ctx.fill();
  myCanvas.ctx.fillStyle = "red";
  myCanvas.ctx.font = "60px Arial";
  let textWidth = myCanvas.ctx.measureText("+");
  myCanvas.ctx.fillText("+", pickUp.xPos + 5, pickUp.yPos + 41);
}

function drawWords(myCanvas, wordList, topOffset, roundCount){
  let wordWidth = 100;
  let wordHeight = 40;
  let wordPadding = 30;
  let wordOffsetLeft = 60;
  let wordOffsetTop = topOffset;
  let words = wordList;
  for (let i = 0; i < words.length; i++){
    if (words[i].status == 1){
      let wX = (i*(wordWidth + wordPadding)) + wordOffsetLeft;
      let wY = (0.5*(wordHeight + wordPadding)) + wordOffsetTop;
      words[i].xPos = wX;
      words[i].yPos = wY;
     
      myCanvas.ctx.beginPath();
      myCanvas.ctx.rect(wX, wY, wordWidth, wordHeight);
      if (roundCount % 10 == 0){ //Bonus round
        myCanvas.ctx.fillStyle = "purple";
      }
      else {
        myCanvas.ctx.fillStyle = "green";      
      }
      myCanvas.ctx.closePath();
      myCanvas.ctx.fill();
      myCanvas.ctx.fillStyle = "white";
      myCanvas.ctx.font = "20px Arial";
      let textWidth = myCanvas.ctx.measureText(words[i].answer.jp);
      myCanvas.ctx.fillText(words[i].answer.jp, wX + ((wordWidth - textWidth.width)/2), wY+27);
    }
  }
}

export { create, drawUI, drawPickup, drawWords };
