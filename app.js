let gameSeq = [];
let userSeq = [];
let buttonColours = ["red", "green", "blue", "yellow"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");
let score = 0;
let highestScore = 0;

document.addEventListener("keypress", () => {
  if (start == false) {
    console.log("game has started");
    start = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIndex = Math.floor(Math.random() * 4);
  let randomColour = buttonColours[randIndex];
  gameSeq.push(randomColour);
  let randomButton = document.querySelector(`.${randomColour}`);
  gameBtnFlash(randomButton);
}

function gameBtnFlash(button) {
  button.classList.add("game-flash");
  setTimeout(() => {
    button.classList.remove("game-flash");
  }, 200);
}

function userBtnFlash(button) {
  button.classList.add("user-flash");
  setTimeout(() => {
    button.classList.remove("user-flash");
  }, 200);
}

function btnPress() {
  let btn = this;
  userBtnFlash(btn);
  let userColour = btn.getAttribute("id");
  userSeq.push(userColour);
  let lastIndex = userSeq.length - 1;
  checkAns(lastIndex);
}

for (let btn of btns) {
  btn.addEventListener("click", btnPress);
}

function checkAns(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    if (score >= 0 && start == true) {
      score = level - 1;
      if (score > highestScore && score >= 0) {
        highestScore = score;
      }
    } else {
      score = 0;
    }
    h2.innerHTML = `Game Over! Your score was <b>${score}</b> <br> Highest score : ${highestScore} <br> Press any key to start.`;
    reset();
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
  }
}

function reset() {
  start = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}
