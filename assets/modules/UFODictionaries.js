var thirdGradeDictionary = [
    "affect", "asleep", "bell", "body", "brain", "bright", "cross", "concentrate", "daytime", "energy",
    "habit", "held", "improve", "lack", "lose", "lost", "minute", "nap", "result", "screen",
    "sign", "sir", "tonight", "walker" 
]

//set up the word list
function initDictionary(){
    let wordList = thirdGradeDictionary;
    shuffle(wordList);
    return wordList; 	
}

export {initDictionary};
