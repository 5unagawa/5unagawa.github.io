class Game{
    constructor(){
        this.dictionary = null;
        this.wordSolved = null;
        this.gameOver = false;
        this.remainingTurns = null;
        this.targetWord = null;
    }
  
    gameSetup(){
	var randomNum = Math.floor(Math.random() * dictionary.length);
  	this.targetWord = this.dictionary[randomNum];
    	this.wordSolved = False;
    	this.remainingTurns = 6;
    }
    
    checkGuess(g){
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

    getInput(){
        
    }
    
}

function letterInput(clickedID, pos){
	document.getElementByID('cursor_'+pos).innerHTML = clickedID;
	cursorPosition = pos;
	cursorPosition++;
}

function backspace(clickedID, pos)
	document.getElementByID('cursor_'+pos).innerHTML = "_");
	cursorPosition = pos;
	pos--;
//game loop
//game initialises
//player clicks buttons to input a word
//player clicks guess to submit a word
//game checks the guess
//game returns result


