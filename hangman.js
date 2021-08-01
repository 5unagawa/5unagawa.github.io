var targetWord; //word the player will guess
var blankWord;
var chances;
var letters = /^[A-Za-z]+$/;

//disable input buttons
document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});
const keys = document.querySelector('.btn-group');
keys.addEventListener('click', (event) => {
	//access clicked element
	const {target} = event;
	
	//check clicked element is button or 
	//if not, exit function
	if (!target.matches('button')) {
		return;
	}
	
	//else
	checkLetter(target.value);
	document.getElementById("word").innerHTML = blankWord.join(' ');
	console.log(blankWord);
	
});

function startGame(){ //get user input and prepare game board
	document.getElementById("word").innerHTML = "";
	let input = prompt("Please enter your word:", "...");
	
	if (input.match(letters)){ //add check for symbols and numbers
		targetWord = input;
		blankWord = new Array(targetWord.length);
		for (let i=0; i < targetWord.length; i++) {
			blankWord[i] = "_";
		}
		console.log("Ready to play");
		document.getElementById("word").innerHTML = blankWord.join(' ');
		console.log(blankWord);
		chances = 10;
		document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = false;});
		document.getElementById("start-btn").style.display="none";
	} else {
		window.alert("Please enter your word again.");
	}
}

function checkLetter(input){
	console.log(input);
	let foundFlag = 0;
	for (let i=0; i < targetWord.length; i++) {
		if (input == targetWord[i].toUpperCase()) {
			blankWord[i] = input;
			foundFlag = 1
			
		}
	}
	
	if (foundFlag == 0) {
		--chances;
		if (chances == 0) {
			window.alert("Out of chances. Game Over. The word was: " + targetWord);
			document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});
			document.getElementById("start-btn").style.display="block";
		}
	}
	
	if (blankWord.includes("_") == false) {
		document.getElementById("word").innerHTML = blankWord.join(' ');
		window.alert("Congratulations! You win!");
		document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});
		document.getElementById("start-btn").style.display="block";
	}
}

//GUI
var score = 0;
var chanceCount = 10;


function drawBlank() {
	ctx.beginPath();
	ctx.rect (count , 10, 20, 10);
	ctx.fillStyle = "black";
	ctx.closePath();
}

function drawBlocks() {
	for (let i=0; i < alphabet.length; i++) {
		if (blocks[i].status == 0) {
			var bX = (i*(blockWidth + blockPadding)) + blockOffsetLeft;
			var bY = blockWidth + blockPadding + blockOffsetTop;
		   	blocks[i].x = bX;
		    ctx.beginPath();
		    ctx.rect(bX + blockX, bY + blockY, blockWidth, blockHeight);
		    ctx.fillStyle = "green";
		    ctx.closePath();
		    ctx.fill();
			ctx.fillStyle = "black";
			ctx.font = "20px serif";
			ctx.fillText((answerArray[blocks[i].answer]), bX+20, bY+25);
			
		}
 	}
}

function drawChance(){
  ctx.font ="16px Arial";
	ctx.fillStyle = "White";
	ctx.fillText("Guesses Left: " + chanceCount, 8, 20);
} 
