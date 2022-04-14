var pcThrow;
var gu = document.createElement("img");
		gu.setAttribute("class", "newImg");
		gu.src = "gu.png";
	
var choki = document.createElement("img");
		choki.setAttribute("class", "newImg");
		choki.src = "choki.png";
	
var pa = document.createElement("img");
  	pa.setAttribute("class", "newImg");
		pa.src = "pa.png";
        	
function chooseImage(outputDiv, throwValue) {
  if (throwValue == 1) {
	  let clone = gu.cloneNode();
		outputDiv.appendChild(clone);
	}
	if (throwValue == 2) {
		let clone = choki.cloneNode();
		outputDiv.appendChild(clone);
	}
	if (throwValue == 3) {
		let clone = pa.cloneNode();
		outputDiv.appendChild(clone);
	}
}
	
function mainLoop(playerThrow) {
	player = document.getElementById("player");
	cp = document.getElementById("computerPlayer");
	cpThrow = Math.floor(Math.random() * 3+1);
		
	try{
		var throwPics = document.getElementsByClassName("newImg");
		while (throwPics.length > 0){
			throwPics[0].remove();
		}
	} catch(error){
		console.error(error);
	}
	
	chooseImage(player, playerThrow);
	chooseImage(cp, cpThrow);
	checkThrow(playerThrow, cpThrow);
}

function checkThrow(playerThrow, cpThrow) {
//1 = rock , 2 = scissors , 3 = paper
  result = document.getElementById("result");
	if (playerThrow == cpThrow) {
		result.innerHTML = "It's a tie!";
	}
	else if ((playerThrow==1 && cpThrow==2)||(playerThrow==2 && cpThrow==3)||(playerThrow==3 && cpThrow==1)) {
		result.innerHTML = "You win!";
	}
  else {
	  result.innerHTML = "You lose.";
  }
}	
