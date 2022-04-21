var targetWord; //word that the player will guess
var chances;    //counter for number of chances left
var prevNum;    //holds value of previous question

var fruitArray = ["APPLE", "LEMON", "MANGO", "MELON", "PEACH"];
let guessArray = [];
//disable buttons on page load
document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});

//button click event
const keys = document.querySelector('.btn-group');
keys.addEventListener('click', (event) => {
	console.log("button clicked");
  //target clicked button
   const {target} = event;
   switch(target.matches('button')){
  	case target.id == 'enter-btn' :
    	    break;
   	case target.id == 'back-btn' :
    	    break;
        default:
    	    console.log("fire");
            if(guessArray.length < 5){
      	        guessArray.push(target.value);
      	        document.getElementById('word_'+chances).innerHTML = guessArray.join(' ');
      	        console.log(guessArray);
            }
  }
});

function chooseImage(){
	var randomNum = Math.floor(Math.random() * fruitArray.length);
	while (randomNum == prevNum) {
		randomNum = Math.floor(Math.random() * fruitArray.length);
	}
	targetWord = fruitArray[randomNum];
  console.log(targetWord);
	prevNum = randomNum;
}

//initializes the game
function startGame(){
  //change the start button to "enter" button
  
  document.getElementById("start-btn").setAttribute( "onClick", "checkGuess(guessArray)");
  document.getElementById("start-btn").innerHTML = "ENTER";
  document.getElementById("start-btn").id = "enter-btn";
  //reset the word to be guessed and disabled buttons
  chances = 6;
  document.getElementById('word_'+chances).innerHTML = "";
  document.querySelectorAll('.btn-group button').forEach(elem=> {elem.style.visibility = "visible";});

  chooseImage();
  console.log("Ready to play");
//  document.getElementById('word_'+chances).innerHTML = blankWord.join(' ');
  		
  //reset chance counter and images
  document.getElementById("chance").innerHTML = "Chances: " + chances;
  document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = false;});
}


//compare clicked button value against letters in word
function checkGuess(g){
		if (g.length != 5){
    	console.log("guess is too short");
      return 0;
    }

		else {
 let guessResults = new Array(5);
    let myGuess = g;
    for (let i = 0; i < 5; i++){
        //if direct match
        console.log("comparing: " + myGuess[i] + " and " + targetWord[i]);
      	if (myGuess[i] == targetWord[i]){
        		console.log("direct match found");
            guessResults[i] = 1; // 1 denotes direct match
         }
    	    else for (let j = 0; j < 5; j++){
           console.log("comparing: " + myGuess[i] + " and " + targetWord[j]);
                //if indirect match
                if (myGuess[i] == targetWord[j]){
		    if (guessResults[i] != 1 || guessResults != 2){
          		guessResults[i] = 2; //2 denotes indirect match
              console.log("indirect match");
			break;
		    }
		    else
        		console.log("indirect match already found");
		        break;
        	}
		else
    		console.log("no match found");
		    guessResults[i] = 0;
            }
    	}    
    
    console.log(guessResults);
		//update colours
		styleOutput(guessArray, guessResults);
    }
    guessArray = [];
    --chances;

    if (chances == 0){
	alert("game over");
	resetBoard();
    }
}

function backspace(){
    guessArray.pop();
    document.getElementById('word_'+chances).innerHTML = guessArray.join(' ');
}

//Loops through the array and creates a text node and span for each letter that is used to apply styling. Appends the element to the end of the array which has been cleared.
function styleOutput(gA, gR){
	var res = gR;
	var myWord = document.getElementById('word_' + chances);
  myWord.innerHTML = "";
  for (let i = 0; i < 5; i++){
  	var elem = document.createElement("span"),
        text = document.createTextNode(gA[i] + " ");
    elem.appendChild(text);
    if (res[i] == 1){
        console.log("changing color g");
        elem.style.color = "green";
    }
    if (res[i] == 2){
        console.log("changing color y");
        elem.style.color = "yellow";
    }
  myWord.appendChild(elem);
  }
}

function resetBoard(){
	document.getElementById("enter-btn").setAttribute( "onClick", "startGame()");
  	document.getElementById("enter-btn").innerHTML = "NEW GAME";
  	document.getElementById("enter-btn").id = "start-btn";

	for (let i = 6; i > 0; i--){
		document.getElementById("word_" + i).innerHTML = " ";
	}
}
