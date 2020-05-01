const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let page = 1;
userId = 1
// const flatten = require('lodash.flatten')
function addListeners(){ //didn't work
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
  fetch(QUESTIONS_URL + `?_limit=1&_page=${page}`) // may need return on this line
    .then(resp => resp.json())
    .then(json => json.forEach(question => renderQuestions(question)))
    // .then(questionsArr => renderMain(questionsArr))
}

function fetchQuestion() {
  fetch(`QUESTIONS_URL/${id}`)
    .then(resp => resp.json())
    .then(console.log)
}

function renderMain(){
  const h1 = document.createElement("h1")
  h1.innerText = "Welcome! Click here to begin."
  const main = document.querySelector(".main")
  main.append(h1)

  h1.addEventListener("click", () => fetchQuestions())
}

function renderQuestions(question) {
  console.log("Rendering question for user")
  const h1 = document.querySelector("h1")

  h1.style.display = "none"

  // const ul = document.querySelector(".questions-list")
  // const li = document.createElement("li")

  // li.innerText = question.question_text
  // ul.append(li)
  const div = document.querySelector(".question-container")
  // const p = document.createElement("p")
  // const p2 = document.createElement("p")
  // p2.innerText = question.incorrect_answers
  // p.innerText = question.question_text
  // div.append(p, p2)

  const ul = document.createElement("ul")
  ul.classList.add("questions-ul")
  const li = document.createElement("li")

  li.innerText = question.question_text
  ul.append(li)
  div.append(ul)
  startArr = question.incorrect_answers
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
  correctLi.innerText = question.correct_answer
  innerUl.append(correctLi)
  // incorrectAnswersArray.forEach(answer => {
  //   const wrongLi = document.createElement("li")
  //   wrongLi.classList.add("incorrect-answer")
    // wrongLi.innerText = answer
    // innerUl.append(wrongLi)
  
  // incorrectAnswersArray.forEach(function (answer) {
  //   const wrongLi = document.createElement("li")
  //   wrongLi.classList.add("incorrect-answer")
  //   wrongLi.innerText = answer
  //   innerUl.append(wrongLi)
  

  // const correctLi = document.createElement("li")
  // correctLi.classList.add("correct-answer")
  // // correctLi.innerText = question.correct_answer
  // // correctLi.innerText = question.map(function(x){ return x.correct_answer;})
  // // question.map(function(x){ return x.correct_answer;})
  // innerUl.append(correctLi)
  li.append(innerUl)

  const correct = document.querySelector(".correct-answer")
  // correct.addEventListener("click", (event) => submitAnswer(event, question))
  correct.addEventListener("click", (event) => submitAnswer(event, question))

  const incorrect = document.querySelectorAll(".incorrect-answer")
  incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event))})
}

function incorrectAns(event){
  event.preventDefault()
  console.log("Success!")

  //next question
}

function submitAnswer(event, question) {
  event.preventDefault()
  console.log("submitting")
  // if (event.target.innerText === question.correct_answer) {

    obj = {
      question_id: question.id,
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