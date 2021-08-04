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
	target.style.visibility = "hidden";
	document.getElementById("word").innerHTML = blankWord.join(' ');
	console.log(blankWord);
	
});

function startGame(){ //get user input and prepare game board
	document.getElementById("word").innerHTML = "";
	document.querySelectorAll('.btn-group button').forEach(elem=> {elem.style.visibility = "visible";});
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
		document.getElementById("start-btn").style.visibility="hidden";
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
		document.getElementById("chance").innerHTML = "Chances: " + chances;
		if (chances == 0) {
			window.alert("Out of chances. Game Over. The word was: " + targetWord);
			document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});
			document.getElementById("start-btn").style.visibility="visible";
			
		}
	}
	
	if (blankWord.includes("_") == false) {
		document.getElementById("word").innerHTML = blankWord.join(' ');
		window.alert("Congratulations! You win!");
		document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});
		document.getElementById("start-btn").style.visibility="visible";
	}
}
