//the number of rounds
const CARD_ID = "card"; //id of the card div
const CARD_NAME = "word"; //id of the word name
const FORBID_ID = "f"; //the letter part of the forbidden word id
const DICT_WORD = "word"; //how to access word in the card dict
const DICT_FORBID = "forbidden"; //how to access forbidden word in the card dict

const SCREEN_COVER = "screenCover";

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

var TIME = 5; //total time
// var timeLeft = 0; //time remaining, unused

var roundActive = false; //when a round is running, it is true

var scores = [0, 0]; //total scores

var wonCardsInRound = []; //indices of the cards that were won in a round
var lostCardsInRound = []; //indices of the cards that were lost in a round

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

    scores[turn]--;
    lostCardsInRound.push(curCard);
    nextCard();
}

function take(){

    scores[turn]++;
    wonCardsInRound.push(curCard);
    nextCard();
}


function startRound(){

    var timer = document.getElementById(TIMER_IMG);

    timer.src = TIMER;

    roundActive = true;

    setTimeout(() => {
        endRound();
     }, TIME * 1000);  // 60 seconds
}


function coverScreen(){

    var cover = document.createElement("div");

    cover.style.zIndex = 100;
    cover.style.backgroundColor = "rgba(192, 192, 192, 0.3)";

    cover.style.height = "100vh";
    cover.style.width = "100vw";

    cover.style.overflow = "auto";

    cover.setAttribute('id', SCREEN_COVER)

    cover.style.top = "0";  // Ensure it's positioned at the top-left corner
    cover.style.left = "0";

    cover.style.position = "fixed";

    document.body.appendChild(cover);

    return SCREEN_COVER;
}

function cardResultsHTML(){

    var fullCards = '';

    for(var i = 0; i < wonCardsInRound.length; i++){

        var j = wonCardsInRound[i];

        fullCards += 
        `
            <div id="won${j.toString()}" class="resultsScreenCard wonCard" onclick="flipCard('won${j.toString()}')">
            <h4>${cards[j][DICT_WORD]}</h4>
            <p>${cards[j][DICT_FORBID][0]}</p>
            <p>${cards[j][DICT_FORBID][1]}</p>
            <p>${cards[j][DICT_FORBID][2]}</p>
            <p>${cards[j][DICT_FORBID][3]}</p>
            <p>${cards[j][DICT_FORBID][4]}</p>
        </div>
        `
    }

    for(var i = 0; i < lostCardsInRound.length; i++){

        var j = lostCardsInRound[i];

        fullCards += 
        `
            <div id="lost${j.toString()}" class="resultsScreenCard lostCard" onclick="flipCard('lost${j.toString()}')">
            <h4>${cards[j][DICT_WORD]}</h4>
            <p>${cards[j][DICT_FORBID][0]}</p>
            <p>${cards[j][DICT_FORBID][1]}</p>
            <p>${cards[j][DICT_FORBID][2]}</p>
            <p>${cards[j][DICT_FORBID][3]}</p>
            <p>${cards[j][DICT_FORBID][4]}</p>
        </div>
        `
    }

    return fullCards;
}

function endRound(){
    var timer = document.getElementById(TIMER_IMG);
    timer.src = NO_TIMER;

    var c = coverScreen();
    var cover = document.getElementById(c);

    cover.innerHTML = `
    
    <h2 id="recapHeader">Round Over!</h2>

    <button id="closeResults" onclick="nextRound()">Ok!</button>

    <div id="resultsScreenCardDeck">

        ${cardResultsHTML()}
    
    </div>
    
    `

    roundActive = false;
 
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

        scores[curRound] -= 2;
    }
    else if(card.classList.contains(LOST_CARD)){

        card.classList.remove(LOST_CARD);
        card.classList.add(WON_CARD);

        scores[curRound] += 2;
    }
}

function updateScoreBoard(){

    var board = document.getElementById("team" + turn.toString() + "score");

    board.innerHTML = scores[turn].toString();
}


function nextRound(){

    updateScoreBoard();

    if(turn == 0){
        turn++;
    }
    else{
        turn--;
        curRound++;
    }

    wonCardsInRound = [];
    lostCardsInRound = [];

    var cover = document.getElementById(SCREEN_COVER);

    cover.parentNode.removeChild(cover);

}

