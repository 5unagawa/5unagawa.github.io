var targetWord; //word that the player will guess
var blankWord;  //array to hold blank spaces
var chances;    //counter for number of chances left
var prevNum;    //holds value of previous question
var letters = /^[A-Za-z]+$/; //input verification

var fruitArray = ["apple", "lemon", "mango", "melon", "peach"];
 
//disable buttons on page load
document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});

//button click event
const keys = document.querySelector('.btn-group');
keys.addEventListener('click', (event) => {
  //target clicked button
	const {target} = event;
	
	//check that clicked element is a button. 
	//if not, exit function
	if (!target.matches('button')) {
		return;
	}
	
	//run checkLetter fucntion against key pressed
	//hide the button and update output
	checkLetter(target.value);
	//target.style.visibility = "hidden";
	document.getElementById("word").innerHTML = blankWord.join(' ');
	console.log(blankWord);
});

function chooseImage(){
	var randomNum = Math.floor(Math.random() * fruitArray.length);
	while (randomNum == prevNum) {
		randomNum = Math.floor(Math.random() * fruitArray.length);
	}
	targetWord = fruitArray[randomNum];
	prevNum = randomNum;
}

//initializes the game
function startGame(){
  //reset the word to be guessed and disabled buttons
  document.getElementById("word").innerHTML = "";
  document.querySelectorAll('.btn-group button').forEach(elem=> {elem.style.visibility = "visible";});
  chooseImage();
	
  blankWord = new Array(targetWord.length);
  for (let i=0; i < targetWord.length; i++) {
      blankWord[i] = "_";
  }
  console.log("Ready to play");
  document.getElementById("word").innerHTML = blankWord.join(' ');
  console.log(blankWord);
		
  //reset chance counter and images
  chances = 10;
  document.getElementById("chance").innerHTML = "Chances: " + chances;
  document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = false;});
  //hide start button
  //document.getElementById("start-btn").style.visibility="hidden";
}


//compare clicked button value against letters in word
function checkLetter(input){
    let guessArray = new Array(5);
    let guess = g;
    for (let i = 0; i < 5; i++){
        //if direct match
      	if (guess[i] == this.targetWord[i])
            guessArray[i] = 1; // 1 denotes direct match
    	    else for (let j = 0; j < 5; j++){
                //if indirect match
                if (guess[i] == this.targetWord[j]){
		    if (guessArray[i] != 1 || guessArray != 2){
          		guessArray[i] = 2; //2 denotes indirect match
			break;
		    }
		    else
		        break;
        	}
		else
		    guessArray[i] = 0;
            }
    	}
    }

