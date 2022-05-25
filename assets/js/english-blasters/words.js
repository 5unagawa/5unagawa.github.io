var dictionary = [ {jp:"黒", en:"black"}, {jp:"青", en:"blue"},
	{jp:"茶色", en:"brown"},
	{jp:"緑", en:"green"},
	{jp:"灰色", en:"gray"},
	{jp:"オレンジ", en:"orange"},
	{jp:"ピンク", en:"pink"},
	{jp:"紫", en:"purple"},
	{jp:"赤", en:"red"},
	{jp:"白", en:"white"},
	{jp:"黄色", en:"yellow"}
];

//Shuffles the dictionary using the Fisher-Yates / Durstenfeld Shuffle.
function shuffle(array){
  for (let i = array.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
//Uses the first 3 words in the shuffled dictionary array to create a new list
function createWordList(shuffledDict){
  let wordList = [];
  for (let i = 0; i < wordCount; i++){
    wordList[i] = {xPos: 0, yPos: 0, answer: shuffledDict[i], status: 1};
    
    //the word at index[0] is moved to the back of the array
    let temp = shuffledDict[i];
    shuffledDict.shift();
    shuffledDict.push(temp);
  }
  //move the 3 chosen words to the back of the array
  return wordList;
}

function chooseWords(wordArray){
  let randomNum = Math.floor(Math.random() * wordArray.length);
  let randomWordObj = wordArray[randomNum];
  return randomWordObj;
}

export { createWordList, chooseWords, shuffle };
