const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let page = 1;
userId = 1

document.addEventListener("DOMContentLoaded", () => {
  fetchQuestions()
})

function fetchQuestions() {
  console.log("Loading questions")
  fetch(QUESTIONS_URL + `?_limit=1&_page=${page}`)
    .then(resp => resp.json())
    .then(questionsArr => renderMain(questionsArr))
    
}

function fetchQuestion() {
  fetch(`QUESTIONS_URL/${id}`)
    .then(resp => resp.json())
    .then(console.log)
    // .then(question => renderQuestion(question))
    
}

function renderMain(questions){
  const h1 = document.createElement("h1")
  h1.innerText = "Welcome! Click here to begin."
  const main = document.querySelector(".main")
  main.append(h1)
  // debugger
  h1.addEventListener("click", () => renderQuestion(questions))
}


function renderQuestion(question) {
  console.log("Rendering question for user")
  const h1 = document.querySelector("h1")
  h1.style.display = "none"
  const container = document.querySelector("main")
  const ul = document.querySelector(".questions-list")
    // div = document.createElement("div"),
  const li = document.createElement("li")
  li.innerText = question.question_text

  // let startArr = []
  // startArr = question.incorrect_answers
  let startArr = question.map(function(x){ return x.incorrect_answers;})
  let wrongAnswers = JSON.parse("[" + startArr + "]")
  wrongAnswers = startArr
  debugger
  console.log(wrongAnswers)

  let newArr = []
  for (i = 0; i < wrongAnswers.length; i++) {
    newArr.push(wrongAnswers[i])
  }

  const innerUl = document.createElement("ul")
  innerUl.classList.add("innerUl")
  finalArr = newArr[0]
  debugger
  finalArr.forEach(function (answer) {
    const wrongLi = document.createElement("li")
    // wrongLi.classList.add("wrong-answer")
    wrongLi.classList.add("incorrect-answer")
    wrongLi.innerText = answer
    innerUl.append(wrongLi)
  })

  const correctLi = document.createElement("li")
  // correctLi.classList.add("correct-answer")
  correctLi.classList.add("correct-answer")
  correctLi.innerText = question.correct_answer
  innerUl.append(correctLi)
  li.append(innerUl)
  ul.append(li)

  const correct = document.querySelector(".correct-answer")
  correct.addEventListener("click", (event) => submitAnswer(event, question))

  const incorrect = document.querySelectorAll(".incorrect-answer")
  incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event))})

}

function incorrectAns(event){
  console.log("Success!")
  //next question
}

function submitAnswer(event, question) {
  event.preventDefault()
  console.log("submitting")
  if (event.target.innerText === question.correct_answer) {

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
  }
  else {
    console.log("nope")
  }
  //next question
}



// function renderQuestions(question) {
//   const container = document.querySelector("main"),
//     ul = document.querySelector(".questions-list"),
//     // div = document.createElement("div"),
//     li = document.createElement("li")
//   li.innerText = question.question_text

//   let startArr = []
//   startArr = question.incorrect_answers
//   // wrongAnswers = wrongAnswers.substring(0, wrongAnswers.length -1)

//   let wrongAnswers = JSON.parse("[" + startArr + "]")

//   console.log(wrongAnswers)

//   let newArr = []
//   for (i = 0; i < wrongAnswers.length; i++) {
//     newArr.push(wrongAnswers[i])
//   }

//   const innerUl = document.createElement("ul")
//   innerUl.classList.add("innerUl")
//   finalArr = newArr[0]

//   finalArr.forEach(function (answer) {
//     const wrongLi = document.createElement("li")
//     wrongLi.classList.add("answer")
//     wrongLi.innerText = answer
//     innerUl.append(wrongLi)
//   })

//   const correctLi = document.createElement("li")
//   correctLi.classList.add("correct-answer")
//   correctLi.innerText = question.correct_answer
//   innerUl.append(correctLi)
//   li.append(innerUl)
//   ul.append(li)

//   const correct = document.querySelector(".correct-answer")
//   correct.addEventListener("click", (event) => submitAnswer(event, question))
// }

// document.querySelectorAll('.some-class').forEach(item => {
//   item.addEventListener('click', event => {
//     //handle click
//   })
// })