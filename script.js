import * as q from "./quiz.js";

const quiz = q.quiz;
const quizTitleQues = document.querySelector(".quiz_Container p");
const initBtn = document.querySelector(".initBtn");
const quizAnswers = document.querySelector(".quiz_ContainerDesc");
const pointCont = document.querySelector(".header_right");
const verdictCont = document.querySelector(".verdict_Container");
const section = document.querySelector(".section"); 
let current = 0;
let timer = document.querySelector(".timer");
let seconds;
let currentQuestion;
let quesObj;
let points = 0;

const startTimer = () => {
  timer.innerHTML = 70;
  seconds = timer.innerHTML;
  console.log("timer", timer.textContent);
  let interval = setInterval(() => {
    if (seconds < 0) {
      timer.textContent = 0;
    } else {
      seconds--;
      timer.textContent = seconds;
    }
    if (seconds <= 0) {
      clearInterval(interval);
      //game over screen
      gameover();
    }
  }, 1000)
}

//game over
function gameover() {
  clear(section);
  section.innerHTML = "Game over";
  //reveal form for hs
  //restart button
  //
}

//clear the div
const clear = (element) => element.innerHTML = '';

const makeButtonGroup = () => {
  clear(quizAnswers);
  for (const ans in quesObj.answers) {
    //make the label and button for each from the quiz_ContainerDesc
    if (quesObj.answers[ans] === null) {
      return
    } else {
      let button = document.createElement('button');
      button.innerHTML = quesObj.answers[ans];
      button.setAttribute(`data-answer`, `${ans}`);
      button.classList.add("quizAnswerButton");
      console.log("attribute", button.dataset.answer);
      button.onclick = (e) => isCorrect(e);
      quizAnswers.appendChild(button);
    }
  }
}

//initQuiz will:
//randomize all array without dupes: source: fisher-yaters shuffle: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//it checks if the element is already in the given array and if it isn't the function continues
const initQuiz = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    return array;
  }
}

//add event listener that will check if the button chose is correct.
const isCorrect = (e) => {
  e.preventDefault();
  if (e.target.dataset.answer === quesObj.correct_answer) {
    verdict(true);
    //points go up
    points = points + 10;
    pointCont.innerHTML = points;
    //next question;
    current++
    setCurrentQuestion();
  } else {
    verdict(false);
    //-10 seconds from the timer
    if (seconds < 0) {
      timer.textContent = 0;
    } else {
      seconds -= 10;
      timer.textContent = seconds;
    }
  }
}


//Prints out whether or not the answer chosen was correct.
function verdict(verdict) {
  switch(verdict) {
    case true:
      verdictCont.innerHTML="That's correct!"
    break;
    case false:
      verdictCont.innerHTML="That was wrong. Ten second penalty!"
    break;
    default:
      verdictCont.innerHTML="Good Luck."
    break;
  }
}

const setCurrentQuestion = () => {
  quesObj = quiz[current];
  console.log(quiz);
  currentQuestion = quesObj.question;
  quizTitleQues.innerHTML = currentQuestion;
  //Make the button group
  makeButtonGroup();
}

//Init will:
// -change the display of .quiz_Container h1 to a random question
// -change the display of .quiz_ContainerDesc to a button group that are the ans choices
// -will start the timer
initBtn.addEventListener("click", () => {
  //randomizes quiz
  initQuiz(quiz);
  //This will write a random quiz question to the element
  setCurrentQuestion();
  startTimer();
});

