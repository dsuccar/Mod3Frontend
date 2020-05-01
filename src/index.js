const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let page = 1;
let userId = 1
let globalPoints = 0

// function stringFixer1(string){
//   return string.replace(/&quot;/g, "'")
// }

// function stringFixer2(string){
//   return string.replace(/&#039;/g, "'")
// }

// function stringFixer3(string){
//   return string.replace(/&amp/g, "&")
// }

document.addEventListener("DOMContentLoaded", () => {
  // fetchQuestions()
  fetchUsers()
  // renderMain()
  // addListeners()
})

function fetchQuestions() {
  console.log("Loading questions")
  fetch(QUESTIONS_URL)// + `?_limit=1&_page=${page}`) // may need return on this line
    .then(resp => resp.json())
    .then(question => renderQuestions(question))
    // .then(json => json.forEach(question => renderQuestions(question)))
}

function fetchUsers(){
  console.log("Retrieving Danny's total score")
  fetch(USERS_URL)
  .then(resp => resp.json())
  .then(user => renderMain(user))
}

function renderMain(user){
  const h1 = document.createElement("h1")
  h1.innerText = "Welcome! Click here to begin."
  const main = document.querySelector(".main")

  const p = document.createElement("p")
  p.classList.add("leaderboard")
  p.innerText = `${user[0].name}: ${user[0].user_questions.length} points`
  // debugger
  const input = document.createElement("input")
  input.placeholder = "Log in here..."
  main.append(h1, p)

  h1.addEventListener("click", () => fetchQuestions())
}

function renderQuestions(question) {
  globalQuestion = question //intentional global variable
  const points = document.querySelector(".round-points")
  points.innerText = `Points: ${globalPoints}`

  let randomQuestion = question[Math.floor(Math.random() * question.length)]//Math.floor(Math.random() * Math.floor(max));
 
  console.log("Rendering question for user")

  const mainTitle = document.querySelector("h1")
  leaderboard = document.querySelector(".leaderboard")

  mainTitle.style.display = "none"
  leaderboard.style.display = "none"

  const questionContainer = document.getElementById("question-container")
  questionContainer.innerHTML = ""
  const questionText = document.createElement("h3")
  questionText.classList.add("question-text")
  let dataText = randomQuestion.question_text
  console.log(dataText) //string
  
  // let dataText1 = stringFixer1(dataText)
  // let dataText2 = stringFixer2(dataText1)
  // questionText.innerText = dataText2
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
    if(answersArr[i] === randomQuestion.correct_answer) {
      answer.setAttribute("id", "correct-answer")
    }else{
      answer.setAttribute("id", "incorrect-answer")
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  
  for (let i = answerContainer.children.length; i >= 0; i--) {
    // debugger
        answerContainer.appendChild(answerContainer.children[getRandomInt(answersArr.length)]); //4
  }

  const correct = document.getElementById("correct-answer")
  correct.addEventListener("click", (event) => submitAnswer(event, randomQuestion))

  const incorrect = document.querySelectorAll("#incorrect-answer")
  incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event))})

  // debugger
  // const correct = document.querySelector(".correct-answer")
  // 

  // const incorrect = document.querySelectorAll(".incorrect-answer")
  // incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event))})


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

  const bigGreenCheckmark = document.querySelector(".big-green-checkmark")
  bigGreenCheckmark.innerText = ""

  // const previousQuestion = event.target.parentNode.parentNode
  const h2 = document.querySelector("h2")
  const redX = document.querySelector(".big-red-x")
  redX.innerText = "❌"
  h2.append(redX)

  console.log("Success!")
  //next question
  renderQuestions(globalQuestion)
}

function submitAnswer(event, randomQuestion) {
  event.preventDefault()
  
  const points = document.querySelector(".round-points")
  points.innerText = `Points: ${++globalPoints}`

  const bigRedX = document.querySelector(".big-red-x")
  bigRedX.innerText = ""

  const h2 = document.querySelector("h2")
  const greenCheckmark = document.querySelector(".big-green-checkmark")
  h2.append(greenCheckmark)
  greenCheckmark.innerText = "✅"

  console.log("submitting")

    // alert("Correct Answer!")
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
}