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

  const mainTitle = document.querySelector("h1")

  mainTitle.style.display = "none"

  const questionContainer = document.getElementById("question-container")
  questionContainer.innerHTML = ""
  const questionText = document.createElement("h3")
  questionText.classList.add("question-text")
  questionText.innerText = randomQuestion.question_text

  questionContainer.append(questionText)
  
  const answerContainer = document.createElement("div")
  answerContainer.classList.add("answer-container")
  questionContainer.append(answerContainer)

  let rawAnswersArray = []
  rawAnswersArray.push(randomQuestion.correct_answer)

  let stringOfNestedWrongAnswersArray = randomQuestion.incorrect_answers
  const nestedIncorrectAnswersArray = JSON.parse("[" + stringOfNestedWrongAnswersArray + "]")
  const incorrectAnswersArray = nestedIncorrectAnswersArray.flat()
  rawAnswersArray.push(incorrectAnswersArray)
  let answersArr = rawAnswersArray.flat()

  for(let i = 0; i < answersArr.length; i++){
    const answer = document.createElement("div")
    answer.classList.add("answer")
    answer.innerText = answersArr[i]
    answerContainer.append(answer)
  }
  // debugger

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  
  for (let i = answerContainer.children.length; i >= 0; i--) {
        answerContainer.appendChild(answerContainer.children[getRandomInt(4)]);
  }
    
  

  // so answers are on bottom

  // const correctAnswers = document.createElement("div")
  // correctAnswers.classList.add("correct-answer")
  
  // let startArr = randomQuestion.incorrect_answers
  // const nestedIncorrectAnswersArray = JSON.parse("[" + startArr + "]")
  // const incorrectAnswersArray = nestedIncorrectAnswersArray.flat()

  // for(let i = 0; i < incorrectAnswersArray.length; i++){
  //   const incorrectAnswers = document.createElement("div")
  //   incorrectAnswers.classList.add("incorrect-answer")
  //   incorrectAnswers.innerText = incorrectAnswersArray[i]
  //   questionContainer.append(incorrectAnswers)
  // }

  // correctAnswers.innerText = randomQuestion.correct_answer
  // questionContainer.append(correctAnswers)

  // const correct = document.querySelector(".correct-answer")
  // correct.addEventListener("click", (event) => submitAnswer(event, randomQuestion))

  // const incorrect = document.querySelectorAll(".incorrect-answer")
  // incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event))})

  //above is so the answer is always on the bottom
}

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