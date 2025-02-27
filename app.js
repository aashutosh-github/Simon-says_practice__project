let gameSeq = [];
let userSeq = [];
let buttonColours = ["red", "green", "blue", "yellow"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");
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
  btnFlash(randomButton);
}

function btnFlash(button) {
  button.classList.add("flash");
  setTimeout(() => {
    button.classList.remove("flash");
  }, 100);
}

function btnPress() {
  let btn = this;
  btnFlash(btn);
  let userColour = btn.getAttribute("id");
  userSeq.push(userColour);
  let lastIndex = userSeq.length - 1;
  checkAns(lastIndex);
}

for (let btn of btns) {
  btn.addEventListener("click", btnPress);
}

function checkAns(index) {
  if (gameSeq[index] === userSeq[index]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    let score = level - 1;
    if (score > highestScore && score > 0) {
      highestScore = score;
    }
    h2.innerHTML = `Game Over! Your score was <b>${score}</b> <br> Highest score is : ${highestScore} <br> Press any key to start.`;
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
