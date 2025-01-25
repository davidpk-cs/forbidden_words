//the number of rounds
const CARD_ID = "card"; //id of the card div
const CARD_NAME = "word"; //id of the word name
const FORBID_ID = "f"; //the letter part of the forbidden word id
const DICT_WORD = "word"; //how to access word in the card dict
const DICT_FORBID = "forbidden"; //how to access forbidden word in the card dict

var FORBID_NUM = 5; //how many forbidden words there are

var ROUNDS = 3; //how many rounds in total

var curCard = 0; //the current card in the deck we are on

var curRound = 0; //which round we are on
var turn = 0; //which team has their turn up 

var teamNames = ["blue", "black"]; //team names

var TIME = 20; //total time
var timeLeft = 0; //time remaining

function nextCard(){

    var newCard = cards[curCard];
    curCard++;

    var wordEl = document.getElementById(CARD_NAME);
    wordEl.innerHTML = newCard[DICT_WORD];

    forbiddenWords = newCard[DICT_FORBID];

    for(var i = 0; i < FORBID_NUM; i++){

        var forbidEl = document.getElementById(FORBID_ID + (i + 1).toString());
        forbidEl.innerHTML = forbiddenWords[i];
    }

}

function discard(){

    nextCard();
}

function take(){
    nextCard();
}


function startRound(){


}



