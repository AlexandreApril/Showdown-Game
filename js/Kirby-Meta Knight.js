var body = document.getElementById('body');
var startDiv = document.getElementById('startDiv');
var div = document.getElementById('div');
var restartDiv = document.getElementById('restartDiv');

var countPlayer1 = 0;
var countPlayer2 = 0;

var inBeforeClash = false;
var inClash = false;
var pressedToEarly = false;
var pressedInTime = false;
var x;

function setBackground0() { body.style.backgroundImage = "url('images/background/0 Start Page.jpg')"; }
function setBackground1() { body.style.backgroundImage = "url('images/background/1 Start.jpg')"; startButton.style.visibility = "hidden"; waitSound.play(); }
function setBackground2() { body.style.backgroundImage = "url('images/background/2 Charging.jpg')"; waitSound.stop(); fightSound.play(); }
function setBackground3() { body.style.backgroundImage = "url('images/background/3 Clashing.jpg')"; battleTheme.play(); swordClashSound.play(); }
function setBackground4() { body.style.backgroundImage = "url('images/background/4 Clashing.jpg')"; swordClashSound.play(); }
function setBackground5() { body.style.backgroundImage = "url('images/background/5 Clashing.jpg')"; swordClashSound.play(); }
function setBackground6() { body.style.backgroundImage = "url('images/background/6 After Clash.jpg')"; killSound.play(); }
function setBackground7() { body.style.backgroundImage = "url('images/background/7 Kirby Wins.jpg')"; playerHurtSound.play(); dropSwordSound.play(); }
function setBackground8() { body.style.backgroundImage = "url('images/background/8 Kirby Wins.jpg')"; playerWinSound.play(); }
function setBackground10() { body.style.backgroundImage = "url('images/background/10 Kirby Wins Match.jpg')"; playerWinMatch.play(); }
function setBackground11() { body.style.backgroundImage = "url('images/background/11 Meta Knight Wins.jpg')"; playerHurtSound.play(); dropSwordSound.play(); }
function setBackground12() { body.style.backgroundImage = "url('images/background/12 Meta Knight Wins.jpg')"; playerWinSound.play(); }
function setBackground14() { body.style.backgroundImage = "url('images/background/14 Meta Knight Wins Match.jpg')"; playerWinMatch.play(); }
function setBackground15() { body.style.backgroundImage = "url('images/background/Too Soon Player 1.jpg')"; playerToEarlySound.play(); waitSound.stop(); }
function setBackground16() { body.style.backgroundImage = "url('images/background/Too Soon Player 1 Lose.jpg')"; playerWinSound.play(); }
function setBackground17() { body.style.backgroundImage = "url('images/background/Too Soon Player 2.jpg')"; playerToEarlySound.play(); waitSound.stop(); }
function setBackground18() { body.style.backgroundImage = "url('images/background/Too Soon Player 2 Lose.jpg')"; playerWinSound.play(); }

function startClash() {
    var timeToStart = Math.round(Math.random() * 10);
    if (timeToStart < 2) { timeToStart = 2; }
    inBeforeClash = true;
    inClash = false;
    pressedToEarly = false;

    x = setTimeout(clash, timeToStart * 1000);
}
function clash() {
    inBeforeClash = false;
    inClash = true;
    pressedInTime = false;

    waitSound.stop();
    fightSound.play();
    setBackground2();
}
function fightScene(letter) {
    setTimeout(setBackground6, 4000);
    setTimeout(setBackground5, 3000);
    setTimeout(setBackground4, 2000);
    setTimeout(setBackground3, 1000);
    if (letter === "q") { kirbyWins(); }
    if (letter === "p") { metaKnightWins(); }
}
function kirbyWins() {
    countPlayer1 += 1;
    setTimeout(start, 10000);
    setTimeout(setBackground8, 8000);
    setTimeout(setBackground7, 6000);
}
function metaKnightWins() {
    countPlayer2 += 1;
    setTimeout(start, 10000);
    setTimeout(setBackground12, 8000);
    setTimeout(setBackground11, 6000);
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
var waitSound = new sound("sounds/Wind Sound.mp3");
var fightSound = new sound("sounds/Bang.mp3");
var swordClashSound = new sound("sounds/Swords Clashing.mp3");
var battleTheme = new sound("sounds/Blades Sound.mp3");
var killSound = new sound("sounds/Decapitation.mp3");
var dropSwordSound = new sound("sounds/Drop Sword.mp3");
var playerHurtSound = new sound("sounds/Dying.mp3");
var playerToEarlySound = new sound("sounds/Fail.mp3");
var playerWinSound = new sound("sounds/Ta Da.mp3");
var playerWinMatch = new sound("sounds/Triumph.mp3");

///***///

function start() {
    if (countPlayer1 === 3) {
        setBackground10();
        restart();
    }
    else if (countPlayer2 === 3) {
        setBackground14();
        restart();
    }
    else {
        setBackground0();
        var clashBegan = false;
        var x;

        startButton.style.visibility = "visible";
    }
}

function restart() {
    restartButton.style.visibility = "visible";
    restartButton.addEventListener('click', () => {
        location.reload();
    });
}

start();

startButton.addEventListener('click', () => {
    setBackground1();
    startClash();
});

body.addEventListener('keydown', e => {
    if (inBeforeClash === true) {
        if (e.key === "q" && inClash === false && pressedToEarly === false) {
            pressedToEarly = true;
            clearTimeout(x);
            setBackground15();
            countPlayer2 += 1;
            setTimeout(start, 2000);
            setTimeout(setBackground16, 1000);
        }
        if (e.key === "p" && inClash === false && pressedToEarly === false) {
            pressedToEarly = true;
            clearTimeout(x);
            setBackground17();
            countPlayer1 += 1;
            setTimeout(start, 2000);
            setTimeout(setBackground18, 1000);
        }
    }
    if (inClash === true) {
        if (e.key === "q" && inBeforeClash === false && pressedInTime === false) {
            pressedInTime = true;
            fightScene(e.key);
        }
        if (e.key === "p" && inBeforeClash === false && pressedInTime === false) {
            pressedInTime = true;
            fightScene(e.key);
        }
    }

});