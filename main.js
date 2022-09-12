let computerNum = 0;
let playBtn = document.getElementById("play_btn");
let userInput = document.getElementById("user_input");
let result = document.getElementById("result");
let resetBtn = document.getElementById("reset");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance");
let history =[];
let correct = document.getElementById("colorful");
let resultImg = document.getElementById("result_img");

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value="";
})
correct.style.display = "none";

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;

    if(userValue<1 || userValue>100) {
        result.textContent = "1~100사이 숫자를 입력해주세요"
        return;
    }
    
    if(history.includes(userValue)) {
        result.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력하세요!"
        result.style.color = "black";
        return;
    }

    chances --;
    chanceArea.textContent = `남은찬스🙌🏻 : ${chances}번`
    history.push(userValue);

    if(userValue < computerNum) {
        resultImg.src="images/up.gif";
        result.textContent = "Up!";
        result.style.color = "yellow";
    } else if (userValue > computerNum) {
        resultImg.src="images/down.gif";
        result.textContent = "Down!";
    } else {
        result.textContent = "맞췄습니다~! 🥳";
        resultImg.src="images/correct.gif";
        correct.style.display = "block";
        chances = 5;
        gameOver = true;
    }

    if(chances==0) {
        gameOver = true;

        resultImg.src="images/over.gif";
        result.textContent = "Game Over 🤭";
    }

    if(gameOver == true) {
        playBtn.disabled = true;
    }
}

function reset() {
    userInput.value="";
    pickRandomNum();
    result.textContent = "못맞추면 메로나🤪";
    result.style.color = "black";
    resultImg.src="images/giphy.gif";

    correct.style.display = "none";
    gameOver = false;
    chances = 5;
    chanceArea.textContent = `남은찬스🙌🏻 : ${chances}번`;
    history = [];
    playBtn.disabled = false;
}


pickRandomNum();