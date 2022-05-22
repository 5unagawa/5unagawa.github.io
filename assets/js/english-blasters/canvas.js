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

function drawUI(myCanvas, lives, score){
  myCanvas.ctx.font = "16px Arial";
  myCanvas.ctx.fillStyle = "White";
  myCanvas.ctx.fillText("LIVES: " + lives + "   ROUND: " + round + "   SCORE: " + score, 8, 20);
}

export { create, drawUI };
