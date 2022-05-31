import * as q from "./quiz.js";

const quiz = q.quiz;
const quizTitleQues = document.querySelector(".quiz_Container p");
let timer = document.querySelector(".timer");
const initBtn = document.querySelector(".initBtn");

//Random index
const randIndex = (length) => Math.floor(Math.random() * length);

//Init will:
// -change the display of .quiz_Container h1 to a random question
// -change the display of .quiz_ContainerDesc to a button group that are the ans choices
// -will start the timer

const startTimer = () => {
  while(timer.innerHTML > 0) {
    console.log("timer", timer.innerHTML);

    timer.innerHTML = timer.innerHTML--;
  }
  clearInterval(startTimer);
}

initBtn.addEventListener("click", () => {
  console.log("started");
  console.log("quizTitleQues", quizTitleQues);
  console.log("timer", timer);
  console.log("quiz", quiz.length);
  console.log("rand", randIndex(quiz.length));
  //Start timer at 70
  timer.innerHTML=70;
  //This will write a random quiz question to the element
  quizTitleQues.innerHTML=quiz[randIndex(quiz.length)].question;
  setInterval(startTimer, 1000);
  console.log("past the interval")
})