//the number of rounds
const CARD_ID = "card"; //id of the card div
const CARD_NAME = "word"; //id of the word name
const FORBID_ID = "f"; //the letter part of the forbidden word id
const DICT_WORD = "word"; //how to access word in the card dict
const DICT_FORBID = "forbidden"; //how to access forbidden word in the card dict

const TIMER_IMG = "timer"
const NO_TIMER = "no-timer.jpg"
const TIMER = "Minute Timer.gif"

const TEAM_1 = "team0";
const TEAM_2 = "team1";
const TEAM_SCORE = "score"

const WON_CARD = "wonCard";
const LOST_CARD = "lostCard";

var FORBID_NUM = 5; //how many forbidden words there are

var ROUNDS = 3; //how many rounds in total

var curCard = 0; //the current card in the deck we are on

var curRound = 0; //which round we are on
var turn = 0; //which team has their turn up 

var teamNames = ["blue", "black"]; //team names

var TIME = 60; //total time
var timeLeft = 0; //time remaining

var scores = [0, 0];

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

    var timer = document.getElementById(TIMER_IMG);

    timer.src = TIMER;

    setTimeout(() => {
        endRound();
     }, TIME * 1000);  // 60 seconds
}


function coverScreen(){

    var cover = document.createElement("div");

    cover.style.zIndex = 100;
    cover.style.backgroundColor = "silver";
    cover.style.opacity = "0.3";

    cover.style.height = "100vh";
    cover.style.width = "100vw";

    cover.setAttribute('id', "screenCover")

    cover.style.top = "0";  // Ensure it's positioned at the top-left corner
    cover.style.left = "0";

    cover.style.position = "fixed";

    document.body.appendChild(cover);
}

function endRound(){
    var timer = document.getElementById(TIMER_IMG);
    timer.src = NO_TIMER;

    var c = coverScreen();

    var displayHTML = 
    ```
        <h2 id="recapHeader">Round Over!</h2>

    <div id="resultsScreenCardDeck">

        <div id="testWon" class="resultsScreenCard wonCard" onclick="flipCard('testWon')">
            <h4>SampleWord</h4>
            <p>Taboo</p>
            <p>Taboo</p>
            <p>Taboo</p>
            <p>Taboo</p>
            <p>Taboo</p>
        </div>

        <div id="testLost" class="resultsScreenCard lostCard" onclick="flipCard('testLost')">
            <h4>SampleWord</h4>
            <p>Taboo</p>
            <p>Taboo</p>
            <p>Taboo</p>
            <p>Taboo</p>
            <p>Taboo</p>
        </div>
    
    </div>
    ```
 
}


function setParameters(){

    var team1Board = document.getElementById(TEAM_1);
    var team2Board = document.getElementById(TEAM_2);

    team1Board.innerHTML = "Team: " + teamNames[0];
    team2Board.innerHTML = "Team: " + teamNames[1];


}

document.addEventListener('DOMContentLoaded', function() {
    setParameters();
});


function flipCard(id){

    var card = document.getElementById(id);

    if(card.classList.contains(WON_CARD)){

        card.classList.remove(WON_CARD);
        card.classList.add(LOST_CARD);
    }
    else if(card.classList.contains(LOST_CARD)){

        card.classList.remove(LOST_CARD);
        card.classList.add(WON_CARD);
    }
}


