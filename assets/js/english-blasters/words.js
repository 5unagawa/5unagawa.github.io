var dictionary = [
	{jp:"赤", en:"レッド"}, 
	{jp:"青", en:"ブルー"},
	{jp:"みどり", en:"グリーン"},
	{jp:"き色", en:"イエロー"},
	{jp:"ピンク", en:"ピンク"},
	{jp:"黒", en:"ブラック"},
	{jp:"白", en:"ホワイト"},
	{jp:"オレンジ", en:"オレンジ"},
	{jp:"むらさき", en:"パープル"},
	{jp:"茶色", en:"ブラウン"},
	{jp:"金色", en:"ゴールド"},
	{jp:"ぎん色", en:"シルバー"},
	{jp:"水色", en:"ライト　ブルー"},
	{jp:"はい色", en:"グレー"},
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
