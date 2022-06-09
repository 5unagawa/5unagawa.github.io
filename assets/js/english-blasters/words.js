var dictionary = [
	{jp:"1", en:"ワン"}, 
	{jp:"2", en:"トゥー"},
	{jp:"3", en:"スリー"},
	{jp:"4", en:"フォー"},
	{jp:"5", en:"ファイブ"},
	{jp:"6", en:"シックス"},
	{jp:"7", en:"セブン"},
	{jp:"8", en:"エイトゥ"},
	{jp:"9", en:"ナイン"},
	{jp:"10", en:"テン"},
	{jp:"11", en:"イレブン"},
	{jp:"12", en:"トゥエルブ"},
	{jp:"13", en:"サーティーン"},
	{jp:"14", en:"フォーティーン"},
	{jp:"15", en:"フィフティーン"},
	{jp:"16", en:"シックスティーン"},
	{jp:"17", en:"セブンティーン"},
	{jp:"18", en:"エイティーン"},
	{jp:"19", en:"ナインティーン"},
	{jp:"20", en:"トゥエンティー"},
];

//set up the word list
function initDictionary(){
    let wordList = dictionary;
    shuffle(wordList);
    return wordList; 	
}

//Shuffles the dictionary using the Fisher-Yates / Durstenfeld Shuffle.
//This is usedhelp ensure that getNewWords does not select the same word more than once each round.
function shuffle(dict){
  for (let i = dict.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    let temp = dict[i];
    dict[i] = dict[j];
    dict[j] = temp;
  }
}
//Uses the first 3 words in the shuffled dictionary array to create a new list
//While the same sets of 3 words can potentially appear, the same word will not appear more than once each round.
function getNewWords(shuffledDict){
  let wordList = [];
  for (let i = 0; i < 3; i++){
    wordList[i] = {xPos: 0, yPos: 0, answer: shuffledDict[i], status: 1};
    
    //the word at index[0] is moved to the back of the array
    let temp = shuffledDict[i];
    shuffledDict.shift();
    shuffledDict.push(temp);
  }
  //move the 3 chosen words to the back of the array
  return wordList;
}

function getTargetWord(wordList){
  let randomNum = Math.floor(Math.random() * wordList.length);
  let randomWordObj = wordList[randomNum];
  return randomWordObj;
}

export { initDictionary, shuffle, getNewWords, getTargetWord };
