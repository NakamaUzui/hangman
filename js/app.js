
let playBtn = document.getElementById("playBtn");
let hintBtn = document.getElementById("show-hint");
let river = document.getElementById("river");
let redBtn = document.getElementById("red");
let yellowBtn = document.getElementById("yellow");
let purpleBtn = document.getElementById("purple");
let normalModeBtn = document.getElementById("normal-mode");
let arcadeModeBtn = document.getElementById("arcade-mode");
let modeBtn = document.getElementById("modeBtn");

let playerInput = document.getElementById("player-guess");
let playerInputArcade = document.getElementById("arcade-guess");

let winNotification = document.getElementById("notification-winner");
let lostNotification = document.getElementById("notification-lost");
let dblNotification = document.getElementById("notification-double-letter");

let speechBubble = document.querySelector("div.speech-bubble");
let trophyBox = document.getElementById("trophyBox");
let trophyTxt = document.getElementById("trophy-txt");
let hintBox = document.getElementById("hint");
let normalModeContainer = document.getElementById("normalInput");
let arcadeContainer = document.getElementById("campaign-container");
let playInfoBox = document.getElementById("playerInfo");
let waterfall = document.getElementById("waterfall");
let playerReset = document.getElementById("player");
let gamemodePopup = document.getElementById("gamemode");
let guessDiv = document.getElementById("guessed");
let playerTile = document.createElement("div");
let player = document.getElementById("player");
let blankWord = document.getElementById("word");

let blankey = document.createElement("div");
let scream = new Audio("sounds/screamfall.mp3");
let unlocked = new Audio("sounds/unlocked.mp3");
let splash = new Audio("sounds/splash.wav");
let blank = " _";

let tr1 = document.getElementById("tr1");
let tr2 = document.getElementById("tr2");
let tr3 = document.getElementById("tr3");
let tr4 = document.getElementById("tr4");
let tr5 = document.getElementById("tr5");

let playerArray = [];
let correctAnswerArray = [];
let filledArray = [];
let wordArray = [];
let guessedLetters = [];
let wordChoosen = "";

let playerMover = 0;
let playerGuess = [];
let playerLife = wordArray.length;
let wordChooserBrain;
let trophyAchieved = false;
let normalGamesWon = 0;
let normalGamesLost = 0;
let achievementCounter = 0;
let hintCounter = 0;
let arcadeGamesWon = 0;
let heart = [
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
];
let joinedHeart = heart.join("");
let playerBar = document.getElementById("player-health");
playerBar.innerHTML = heart.join("");

let arrayWords = [
  "Gitarre",
  "Känguru",
  "Sauerstoff",
  "Malerei",
  "Astronomie",
  "Fußball",
  "Schokolade",
  "Schmetterling",
  "Geschichte",
];

let hint = {
  0: "Ein Musikinstrument mit Saiten.",
  1: "Ein Tier, das in Australien bekannt ist.",
  2: "Ein farbloses, geruchloses Gas, das für das Leben unentbehrlich ist.",
  3: "Eine Kunstform, bei der Farben auf einer Oberfläche verwendet werden, um Bilder oder einen Ausdruck zu schaffen.",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
};

let playerOptions = {
  c1: `<lottie-player src="img/kayak/red.json" background="transparent" speed="1" style="width: 100px; height: 100px;transform: rotate(45deg);" loop autoplay></lottie-player>`,
  c2: `<lottie-player src="img/kayak/yellow.json"  background="transparent"  speed="1"  style="width: 100; height: 100px;transform: rotate(45deg);"  loop  autoplay></lottie-player>`,
  c3: `<lottie-player src="img/kayak/purple.json" background="transparent" speed="1" style="width: 100px; height: 100px; transform: rotate(45deg)" loop autoplay></lottie-player>`,
};

let trophyList = {
  trophy1: false,
  trophy2: false,
  trophy3: false,
  trophy4: false,
  trophy5: false,
};

playBtn.addEventListener("click", playButton);
hintBtn.addEventListener("click", showHint);
normalModeBtn.addEventListener("click", playButton);
arcadeModeBtn.addEventListener("click", playCampaign);
modeBtn.addEventListener("click", showPopup);
redBtn.addEventListener("click", colorChoice);
yellowBtn.addEventListener("click", colorChoice);
purpleBtn.addEventListener("click", colorChoice);
playerInputArcade.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) inputCheckCampaign();
});
playerInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) inputCheck();
});

function playButton() {
  clearInterval(countDownInterval); 
  playInfoBox.style.display = "none";
  gamemode.style.display = "none";
  normalModeContainer.style.display = "flex";
  firsTimeLogin = true;
  gameReset();
  wordChooser();
  tileMaker();
  blankey.innerHTML = filledArray.join("");
  word.append(blankey);
  setTimeout(function () {
    player.className = "";
  }, 600);
}

function gameReset() {
  player.innerHTML = playerOptions.c1;
  player.style.removeProperty("margin-left");
  player.className = "slide-in-left";
  guessedLetters = [];
  guessDiv.textContent = "";
  playerMover = 0;
  speechBubble.innerText = "Need a hint? Click me!";
  playerArray = [];
}
function wordChooser() {
  wordChooserBrain = Math.floor(Math.random() * 9);
  waterfall.style.display = "block";
  river.textContent = "";
  wordChoosen = arrayWords[wordChooserBrain];
  playerLife = wordChoosen.length;
  wordArray = wordChoosen.split("");
  return wordChoosen;
}

function tileMaker() {
  wordArray.forEach(function (word, idx) {
    let newTile = document.createElement("div");
    newTile.className = "water";
    newTile.id = idx;
    newTile.innerHTML = "<img src='img/watertile.png'>";
    filledArray = new Array(playerLife).fill("_ ");
    river.append(newTile);
  });
}

function winChecker() {
  var wordString = wordArray.toString();
  var playerString = filledArray.toString();
  if (wordString === playerString) {
    normalGamesWon = normalGamesWon + 1;
    winNotification.className = "slide-in-bottom";
    winNotification.style.display = "block";
    setTimeout(function () {
      winNotification.className = "slide-out-bottom";
    }, 1250);
  } else {
    return;
  }
}

function inputCheck() {
  let playerGuess = playerInput.value;
  guessedLetters.push(playerGuess);
  guessDiv.innerHTML = guessedLetters;
  if (playerArray.includes(playerGuess)) {
    playerInput.value = "";
    dblNotification.className = "slide-in-bottom";
    dblNotification.style.display = "block";
    setTimeout(function () {
      dblNotification.className = "slide-out-bottom";
    }, 1250);
  }
  if (wordArray.includes(playerGuess)) {
    wordArray.forEach(function (letter, position) {
      if (letter === playerGuess) {
        playerArray.splice(position, 0, playerGuess);
        filledArray.splice(position, 1, playerGuess);
        blankey.innerHTML = filledArray.join("");
        word.append(blankey);
        winChecker();
      }
    });
    playerInput.value = "";
  } else {
    splash.play();
    playerMover = playerMover += 45;
    player.style.marginLeft = playerMover + "px";
    playerInput.value = "";
    playerLife = playerLife - 1;
    if (playerLife === 0) {
      normalGamesLost = normalGamesLost + 1;
      lostNotification.className = "slide-in-bottom";
      lostNotification.style.display = "block";
      player.className = "scale-out-right";
      setTimeout(function () {
        lostNotification.className = "slide-out-bottom";
      }, 1250);
      scream.play();
    }
  }
}

function showHint() {
  if (speechBubble.className === "speech-bubble") {
    speechBubble.innerHTML = hint[wordChooserBrain];
    speechBubble.className === "active speech-bubble";
    hintCounter = hintCounter + 1;
  }
  if (speechBubble.className === "active speech-bubble") {
    speechBubble.className === "speech-bubble";
    speechBubble.innerHTML = "click me for hints!";
  }
  if (speechBubble.innerHTML === "undefined") {
    speechBubble.innerHTML = "You have to start a game to get hints!";
    hintCounter = hintCounter + 1;
  }
}
var x = document.getElementById("countdown");
let playerScore = 0;
let playerHealth = 10;

let campBtn = document.getElementById("campBtn");
let score = document.getElementById("player-score");
campBtn.addEventListener("click", playCampaign);
let countDownInterval;


function playCampaign() {
  gameResetCampaign();
  speechBubble.innerText = "Need a hint? Click me!";
  playerHealth = 10;
  heart = [
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
  ];
  playInfoBox.style.display = "block";
  gamemode.style.display = "none";
  arcadeContainer.style.display = "flex";
  countDownInterval = setInterval(countdownTimer, 1200);
  player.className = "slide-in-left";
  wordChooserCampaign();
  tileMakerCampaign();
  playerBar.innerHTML = heart.join("");
  blankey.innerHTML = filledArray.join("");
  word.append(blankey);
  setTimeout(function () {
    player.className = "";
  }, 600);
}

function continueCampaign() {
  speechBubble.innerText = "Need a hint? Click me!";
  player.innerHTML = playerOptions.c1;
  player.style.removeProperty("margin-left");
  player.className = "slide-in-left";
  guessedLetters = [];
  guessDiv.textContent = "";
  playerMover = 0;
  hintBox.style.display = "none";
  playerArray = [];
  gamemodeSwitch = false;
  playInfoBox.style.display = "block";
  gamemode.style.display = "none";
  arcadeContainer.style.display = "flex";
  wordChooserCampaign();
  tileMakerCampaign();
  playerBar.innerHTML = heart.join("");
  blankey.innerHTML = filledArray.join("");
  word.append(blankey);
  setTimeout(function () {
    player.className = "";
  }, 600);
}

function countdownTimer() {
  x.value = x.value += 1;
  if (x.value === 100) {
    x.value = 0;
    clearInterval(countDownInterval);
    lostNotification.className = "slide-in-bottom";
    lostNotification.style.display = "block";
    player.className = "scale-out-right";
    playCampaign();
    setTimeout(function () {
      lostNotification.className = "slide-out-bottom";
    }, 2000);
  }
}

function gameResetCampaign() {
  speechBubble.innerText = "Need a hint? Click me!";
  score.innerText = "1";
  x.value = "0";
  player.innerHTML = playerOptions.c1;
  player.style.removeProperty("margin-left");
  player.className = "slide-in-left";
  guessedLetters = [];
  playerScore = 1;
  playerHealth = 10;
  guessDiv.textContent = "";
  playerMover = 0;
  hintBox.style.display = "none";
  playerArray = [];
}

function wordChooserCampaign() {
  wordChooserBrain = Math.floor(Math.random() * 9);
  waterfall.style.display = "block";
  river.textContent = "";
  wordChoosen = arrayWords[wordChooserBrain];
  playerLife = wordChoosen.length;
  wordArray = wordChoosen.split("");
  return wordChoosen;
}

function tileMakerCampaign() {
  wordArray.forEach(function (word, idx) {
    let newTile = document.createElement("div");
    newTile.className = "water";
    newTile.id = idx;
    newTile.innerHTML = "<img src='img/watertile.png'>";
    filledArray = new Array(playerLife).fill("_ ");
    river.append(newTile);
  });
}

function winCheckerCampaign() {
  var wordString = wordArray.toString();
  var playerString = filledArray.toString();
  if (wordString === playerString) {
    continueCampaign();
    winNotification.className = "slide-in-bottom";
    winNotification.style.display = "block";
    arcadeGamesWon = arcadeGamesWon + 1;
    playerScore = playerScore + 1;
    score.innerText = playerScore;
    setTimeout(function () {
      winNotification.className = "slide-out-bottom";
    }, 1250);
  } else {
    return;
  }
}

function inputCheckCampaign() {
  let playerGuess = playerInputArcade.value;
  guessedLetters.push(playerGuess);
  guessDiv.innerHTML = guessedLetters;
  if (playerArray.includes(playerGuess)) {
    playerInput.value = "";
    dblNotification.className = "slide-in-bottom";
    dblNotification.style.display = "block";
    setTimeout(function () {
      dblNotification.className = "slide-out-bottom";
    }, 1250);
  }
  if (wordArray.includes(playerGuess)) {
    wordArray.forEach(function (letter, position) {
      if (letter === playerGuess) {
        playerArray.splice(position, 0, playerGuess);
        filledArray.splice(position, 1, playerGuess);
        blankey.innerHTML = filledArray.join("");
        word.append(blankey);
        winCheckerCampaign();
      }
    });
    playerInputArcade.value = "";
  } else {
    splash.play();
    playerMover = playerMover += 20;
    player.style.marginLeft = playerMover + "px";
    playerInputArcade.value = "";
    playerHealth = playerHealth - 1;
    playerHealthBar();
    if (playerHealth === 0) {
      lostNotification.className = "slide-in-bottom";
      clearInterval(countDownInterval);
      lostNotification.style.display = "block";
      player.className = "scale-out-right";
      playCampaign();
      setTimeout(function () {
        lostNotification.className = "slide-out-bottom";
      }, 1250);
      heart = [
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
      ];
      scream.play();
    }
  }
}

function showHint() {
  if (speechBubble.className === "speech-bubble") {
    speechBubble.innerHTML = hint[wordChooserBrain];
    speechBubble.className === "active speech-bubble";
    hintCounter = hintCounter + 1;
  }
  if (speechBubble.className === "active speech-bubble") {
    speechBubble.className === "speech-bubble";
    speechBubble.innerHTML = "click me for hints!";
  }
  if (speechBubble.innerHTML === "undefined") {
    speechBubble.innerHTML = "You have to start a game to get hints!";
    hintCounter = hintCounter + 1;
  }
}

function playerHealthBar() {
  heart.splice(playerHealth, 1, `<i class="far fa-heart"></i>`);
  playerBar.innerHTML = heart.join("");
}

function showPopup() {
  if (gamemodePopup.style.display === "none") {
    arcadeContainer.style.display = "none";
    normalModeContainer.style.display = "none";
    gamemodePopup.className = "fade-in-fwd";
    gamemodePopup.style.display === "flex";
  }
  if (gamemodePopup.style.display === "flex") {
    gamemodePopup.style.display = "none";
    gamemode.style.display = "none";
    gamemodePopup.className = "fade-out-bck";
    normalModeContainer.style.display = "none";
  } else {
    gamemodePopup.style.display = "flex";
  }
}

window.setInterval(function () {
  if (firsTimeLogin === true && achievementCounter === 0) {
    firsTimeLogin = false;
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyTxt.innerText = "First Time Playing!";
    trophyBox.style.display = "flex";
    trophyBox.className = "slide-in-bottom";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (normalGamesWon === 1 && trophyList.trophy1 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy1 = true;
    trophyTxt.innerText = "You Won Your First Game!";
    trophyBox.style.display = "flex";
    trophyBox.className = "slide-in-bottom";
    tr1.style.filter = "none";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (normalGamesWon === 5 && trophyList.trophy2 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy2 = true;
    trophyTxt.innerText = "You won 5 normal games!";
    trophyBox.style.display = "flex";
    trophyBox.className = "slide-in-bottom";
    tr2.style.filter = "none";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (normalGamesLost === 1 && trophyList.trophy3 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy3 = true;
    trophyTxt.innerText = "You lost your first game!";
    trophyBox.style.display = "flex";
    trophyBox.className = "slide-in-bottom";
    tr3.style.filter = "none";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (arcadeGamesWon >= 5 && trophyList.trophy4 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy4 = true;
    trophyTxt.innerText = "You won 5 games of Arcade mode.";
    trophyBox.style.display = "flex";
    tr4.style.filter = "none";
    trophyBox.className = "slide-in-bottom";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (hintCounter >= 5 && trophyList.trophy5 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy5 = true;
    trophyTxt.innerText = "You need alot of hints...";
    trophyBox.style.display = "flex";
    tr5.style.filter = "none";
    trophyBox.className = "slide-in-bottom";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
}, 7000);

function colorChoice(e) {
  if (e.target.id === "red") {
    player.innerHTML = playerOptions.c1;
  }
  if (e.target.id === "yellow") {
    player.innerHTML = playerOptions.c2;
  }
  if (e.target.id === "purple") {
    player.innerHTML = playerOptions.c3;
  }
}