const h2 = document.querySelector("h2");
const btns = document.querySelectorAll(".btn");
let level = 0;
let start = false;
let btnColours = ["green", "red", "yellow", "blue"];
let gameSeq = [];
let userSeq = [];
let score = 0;
let highestScore = 0;

//first to start the game
document.addEventListener("keydown", () => {
  if (start === false) {
    levelUp();
    start = true;
  }
});

function reset() {
  start = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  score = 0;
}

//level up function
function levelUp() {
  level++;
  h2.innerText = `level ${level}`;
  userSeq = [];
  let randomIndex = Math.floor(Math.random() * 4);
  let randomColour = btnColours[randomIndex];
  let btn = document.querySelector(`#${randomColour}`);
  let btnColour = btn.getAttribute("id");
  gameSeq.push(btnColour);
  btnFlash(btn);
}

//flashing the buttons
function btnFlash(button) {
  button.classList.add("flash");
  setTimeout(() => {
    button.classList.remove("flash");
  }, 150);
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
    h2.innerHTML = `Game over ! Your score was <b>${score}</b> <br> Your highest score is : <b>${highestScore} </b> <br> Press any key to continue.`;
    reset();
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
  }
}

//adding event listeners on all the buttons
for (let btn of btns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  btnFlash(btn);
  let colour = btn.getAttribute("id");
  userSeq.push(colour);
  let lastIndex = userSeq.length - 1;
  checkAns(lastIndex);
}
