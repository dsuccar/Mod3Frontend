const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let page = 1;
let userId = 1
// const flatten = require('lodash.flatten')
function addListeners(){ //didn't work to fix multiple firing bug
  const correct = document.querySelector(".correct-answer")
  correct.addEventListener("click", (event) => submitAnswer(event))

  const incorrect = document.querySelectorAll(".incorrect-answer")
  incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event))})
}


document.addEventListener("DOMContentLoaded", () => {
  // fetchQuestions()
  renderMain()
  // addListeners()
})

// function fetchQuestions() {
//   console.log("Loading questions")
//   fetch(QUESTIONS_URL + `?_limit=1&_page=${page}`)
//     .then(resp => resp.json())
//     .then(questionsArr => renderMain(questionsArr))
// }

function fetchQuestions() {
  console.log("Loading questions")
  fetch(QUESTIONS_URL)// + `?_limit=1&_page=${page}`) // may need return on this line
    .then(resp => resp.json())
    .then(question => renderQuestions(question))
    // .then(json => json.forEach(question => renderQuestions(question)))
}

function renderMain(){
  const h1 = document.createElement("h1")
  h1.innerText = "Welcome! Click here to begin."
  const main = document.querySelector(".main")
  main.append(h1)

  h1.addEventListener("click", () => fetchQuestions())
}

function renderQuestions(question) {
  globalQuestion = question
  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * Math.floor(max));
  // }
  let randomQuestion = question[Math.floor(Math.random() * question.length)]//Math.floor(Math.random() * Math.floor(max));
 
  console.log("Rendering question for user")

  const submitButton = document.getElementById('submit');
  const resultsContainer = document.getElementById('results');


  const h1 = document.querySelector("h1")

  h1.style.display = "none"

  const div = document.getElementById("question-container")
  div.innerHTML = ""
  const ul = document.createElement("ul")
  ul.classList.add("questions-ul")
  const li = document.createElement("li")
  li.innerText = randomQuestion.question_text
  ul.append(li)
  div.append(ul)

  startArr = randomQuestion.incorrect_answers

  // let incorrectAnswers = question.map(function(x){ return x.incorrect_answers;})
  const nestedIncorrectAnswersArray = JSON.parse("[" + startArr + "]")
  const incorrectAnswersArray = nestedIncorrectAnswersArray.flat()

  const innerUl = document.createElement("ul")
  innerUl.classList.add("innerUl")

  const wrongLi = document.createElement("li")
  wrongLi.classList.add("incorrect-answer")
  // debugger
  for(let i = 0; i < incorrectAnswersArray.length; i++){
    const wrongLi = document.createElement("li")
    wrongLi.classList.add("incorrect-answer")
    wrongLi.innerText = incorrectAnswersArray[i]
    innerUl.append(wrongLi)
  }

  const correctLi = document.createElement("li")
  correctLi.classList.add("correct-answer")
  correctLi.innerText = randomQuestion.correct_answer
  // correctLi.innerText = question[getRandomInt(randomQuestion)].correct_answer
  innerUl.append(correctLi)

  li.append(innerUl)
  // debugger
  const correct = document.querySelector(".correct-answer")

  correct.addEventListener("click", (event) => submitAnswer(event, randomQuestion))

  const incorrect = document.querySelectorAll(".incorrect-answer")
  incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event))})
}

// function renderQuestions(question) {
//   console.log("Rendering question for user")
//   debugger
//   const quizContainer = document.getElementById('question-container');
//   const submitButton = document.getElementById('submit');
//   const resultsContainer = document.getElementById('results');


//   const h1 = document.querySelector("h1")

//   h1.style.display = "none"

//   const div = document.getElementById("question-container")

//   const ul = document.createElement("ul")
//   ul.classList.add("questions-ul")
//   const li = document.createElement("li")
//   li.innerText = question.question_text
//   ul.append(li)
//   div.append(ul)
//   startArr = question.incorrect_answers
//   // let incorrectAnswers = question.map(function(x){ return x.incorrect_answers;})
//   const nestedIncorrectAnswersArray = JSON.parse("[" + startArr + "]")
//   const incorrectAnswersArray = nestedIncorrectAnswersArray.flat()

//   const innerUl = document.createElement("ul")
//   innerUl.classList.add("innerUl")

//   const wrongLi = document.createElement("li")
//   wrongLi.classList.add("incorrect-answer")
//   // debugger
//   for(let i = 0; i < incorrectAnswersArray.length; i++){
//     const wrongLi = document.createElement("li")
//     wrongLi.classList.add("incorrect-answer")
//     wrongLi.innerText = incorrectAnswersArray[i]
//     innerUl.append(wrongLi)
//   }

//   const correctLi = document.createElement("li")
//   correctLi.classList.add("correct-answer")
//   correctLi.innerText = question.correct_answer
//   innerUl.append(correctLi)

//   li.append(innerUl)
//   // debugger
//   const correct = document.querySelector(".correct-answer")

//   correct.addEventListener("click", (event) => submitAnswer(event, question))

//   const incorrect = document.querySelectorAll(".incorrect-answer")
//   incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event))})
// }

function incorrectAns(event){
  event.preventDefault()

  console.log("Success!")
  //next question
  renderQuestions(globalQuestion)
}

function submitAnswer(event, randomQuestion) {
  event.preventDefault()
  console.log("submitting")
  // if (event.target.innerText === question.correct_answer) {

    obj = {
      question_id: randomQuestion.id,
      user_id: userId
    }

    fetch(USERQUESTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(obj)
    })
    renderQuestions(globalQuestion)
    // renderQuestions(question)
    // .then(resp => resp.json())
    // .then(submit => renderQuestions(submit))
    // div.append(ul)
    // container.append(div)
  // }
  // else {
  //   console.log("nope")
  // }
  //next question
}