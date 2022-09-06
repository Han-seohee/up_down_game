// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go라는 버튼을 누른다.
// 만약 유저가 랜덤번호를 맞추면 맞췃습니다!라고 해준다.
// 랜덤번호 > 유저번호 : down
// 랜덤번호< 유저번호 : up
// reset버튼 누르면 게임이 리셋됨
// 5번으 기회를 다 쓰면 게임 끝 ( 더이상 추측 불가, 버튼 disable)
// 유저가 1~100 범위 밖의 숫자 입력하면 알려준다. 기회 깎지 않음
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회 깎지 않음

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