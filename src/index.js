const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let globalPoints = 0
let count = 6

function stringFixer(string){ //cleans data from database. figure out how to do this in back-end if you have time
  const string2 = string.replace(/&quot;/g, "'")
  const string3 = string2.replace(/&#039;/g, "'")
  const string4 = string3.replace(/&amp/g, "&")
  const string5 = string4.replace(/&eacute;/g, "é")
  const string6 = string5.replace(/&aacute;/g, "á")
  const string7 = string6.replace(/Llanfair&shy;/g, "Llanfair")
  const string8 = string7.replace(/pwllgwyngyll&shy;/g, "pwllgwyngyll")
  const string9 = string8.replace(/gogery&shy;/g, "gogery")
  const string10 = string9.replace(/chwyrn&shy;/g, "chwyrn")
  const string11 = string10.replace(/drobwll&shy;/g, "drobwll")
  const string12 = string11.replace(/llan&shy;/g, "llan")
  const string13 = string12.replace(/silio&shy;/g, "silio")
  const string14 = string13.replace(/gogo&shy;/g, "gogo")
  const string15 = string14.replace(/&atilde;/g, "ã")
  return string15
}

// function timeLeft(){ //putting this inside a function is the same as below effect
  // const timeLeft = setInterval(function(){ //global variable that include what I think is called an anonymous function
    const time = setInterval(function(){
    const timer = document.getElementById("timer") //lines 27, 28, 30 look repetitive but it allows timer to decrement each sec
    timer.innerText = 0; 
    count -= 1
    timer.innerHTML = "Time left: " + count
    if(count === 0){
      gameOver()
    }
  }, 1000) 
//the problem here is visible when you open console inside of webpage

// function timeLeft(){ 
//   const timer = document.getElementById("timer")
//   count -= 1
//   timer.innerHTML="Time left: " + count
//   if(count < 0){
//     setInterval(timeLeft, 1000)
//   }
//   else if(count === 0){
//     gameOver()
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers()
})

function fetchQuestions(user) {
  console.log("Loading questions")
  fetch(QUESTIONS_URL)
    .then(resp => resp.json())
    .then(question => renderQuestions(question, user))
}

function fetchUsers(){
  console.log("Retrieving Danny's total score")
  fetch(USERS_URL)
  .then(resp => resp.json())
  .then(users => loginPage(users))
}

function loginPage(users){
  const main = document.querySelector(".main")
  const loginDiv = document.createElement("div")
  loginDiv.setAttribute("id", "login-container")

  const input = document.createElement("input")
  input.placeholder = "Log in here..." 
  const submitBtn = document.createElement("button")
  submitBtn.innerText = "Login"

  const scoreContainer = document.createElement("div")
  scoreContainer.setAttribute("id", "score-container")

  const scoreContainerTitle = document.createElement("h3")
  scoreContainerTitle.setAttribute("id", "score-container-title")
  scoreContainerTitle.innerText = "Click here to see our users"

  // leaderboard
  scoreContainer.style.display = "none"
  // sortedUser = user.sort((a, b) => b - a)
  ul = document.createElement("ul")
  ul.setAttribute("id", "leaderboard-scores")
  for(let i = 0; i < users.length; i++){
    const li = document.createElement("li")
    li.classList.add("leaderboard")
    li.innerText = `${users[i].name}: ${users[i].user_questions.length} points`
    ul.append(li)
  }
  scoreContainerTitle.addEventListener("click", () => {
    if(scoreContainer.style.display === "none"){
      scoreContainer.style.display = "block"
    }else if (scoreContainer.style.display = "block"){
      scoreContainer.style.display = "none"
    }
  });

  scoreContainerTitle.append(scoreContainer)
  scoreContainer.append(ul)
  loginDiv.append(input, submitBtn, scoreContainerTitle)
  main.append(loginDiv)
  
  submitBtn.addEventListener("click", (event) => submitLogin(event) ) //log in
}

function submitLogin(event){
  event.preventDefault()

  const obj = {
    name: event.target.parentNode.children[0].value
    // user_questions: user.user_questions
  }

  fetch(USERS_URL, {
    method: "POST",
    headers: {"Content-Type" : "application/json",
      "Accept" : "application/json"},
    body: JSON.stringify(obj)
  }).then(resp => resp.json()).then(user => renderMain(user))
}

function renderMain(user){
  const mainPageContent = document.createElement("div")
  mainPageContent.setAttribute("id", "main-page")

  const h1 = document.createElement("h1")
  h1.innerText = "Welcome! Click here to begin."

  const main = document.querySelector(".main")

  const loginContainer = document.getElementById("login-container")
  loginContainer.style.display = "none"

  main.append(mainPageContent)
  mainPageContent.append(h1)

  // h1.addEventListener("click", () => timeLeft(), fetchQuestions(user)) //count usually decrements only once here and doesn't let you click on event listener. it automatically activates
  // h1.addEventListener("click", () => timeLeft, fetchQuestions(user)) // does nothing
  h1.addEventListener("click", () => fetchQuestions(user))
  // h1.addEventListener("click", () => timeLeft())
  // submitBtn.addEventListener("click", () => fetchQuestions())
} //figure out how to add event listener for timer here?

function renderQuestions(question, user, count) { //count allows us to start the countdown and have it persist
  globalQuestion = question //intentional global variable to allow incorrectAns and correctAns functions to run
  const points = document.querySelector(".round-points")
  points.innerText = `Points: ${globalPoints}`

  let randomQuestion = question[Math.floor(Math.random() * question.length)]//Math.floor(Math.random() * Math.floor(max));

  console.log("Rendering question for user")
  const mainPage = document.getElementById("main-page")
  mainPage.style.display = "none"
  
  const loginContainer = document.getElementById("login-container")
  loginContainer.style.display = "none"

  const questionContainer = document.getElementById("question-container")
  questionContainer.innerHTML = ""
  const questionText = document.createElement("h3")
  questionText.classList.add("question-text")

  let rawQuestionText = randomQuestion.question_text
  let dataText = stringFixer(rawQuestionText)
  console.log(dataText)

  questionText.innerText = dataText

  questionContainer.append(questionText)
  
  const answerContainer = document.createElement("div")
  answerContainer.setAttribute("id", "answer-container")

  const stopwatch = document.createElement("span")
  stopwatch.setAttribute("id", "timer")
  stopwatch.innerText = "Time left: " + count //allows the count to load at the same time as the questions
  //if we don't do this then timer loads AFTER the questions with a lag time

  questionContainer.append(answerContainer, stopwatch)

  let rawCorrectAnswer = randomQuestion.correct_answer
  let dataCorrect = stringFixer(rawCorrectAnswer)
  let rawAnswersArray = []
  rawAnswersArray.push(dataCorrect)

  let stringOfNestedWrongAnswersArray = randomQuestion.incorrect_answers
  let rawIncorrectAnswer = stringOfNestedWrongAnswersArray
  let dataIncorrect = stringFixer(rawIncorrectAnswer)

  nestedIncorrectAnswersArray = JSON.parse("[" + dataIncorrect + "]")
  incorrectAnswersArray = nestedIncorrectAnswersArray.flat()

  rawAnswersArray.push(incorrectAnswersArray)
  let answersArr = rawAnswersArray.flat()

  for(let i = 0; i < answersArr.length; i++){
    const answer = document.createElement("div")
    answer.classList.add("answer")
    answer.innerText = answersArr[i]
    answerContainer.append(answer)
    if(answersArr[i] === dataCorrect) {
      answer.setAttribute("id", "correct-answer")
    }else{
      answer.setAttribute("id", "incorrect-answer")
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  for (let i = answerContainer.children.length; i >= 0; i--) {
        answerContainer.appendChild(answerContainer.children[getRandomInt(answersArr.length)]); //4
  }

  const correct = document.getElementById("correct-answer")
  correct.addEventListener("click", (event) => correctAns(event, randomQuestion, user))

  const incorrect = document.querySelectorAll("#incorrect-answer")
  incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event, user))})
}

function incorrectAns(event, user){
  event.preventDefault()

  const bigGreenCheckmark = document.querySelector(".big-green-checkmark")
  bigGreenCheckmark.innerText = ""

  const h2 = document.querySelector("h2")
  const redX = document.querySelector(".big-red-x")
  redX.innerText = "❌"
  h2.append(redX)

  console.log("Success!")

  renderQuestions(globalQuestion, user) //render next question
}

function correctAns(event, randomQuestion, user) {
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

    obj = {
      question_id: randomQuestion.id,
      user_id: user.id
    }

    fetch(USERQUESTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(obj)
    })
    renderQuestions(globalQuestion, user)
}

function gameOver(){
  const main = document.querySelector(".main")
  const questionContainer = document.getElementById("question-container")
  questionContainer.style.display = "none"

  const gameOverMessage = document.createElement("h1")
  gameOverMessage.innerText = "Game Over!"

  const restart = document.createElement("h3")
  restart.innerText = "Would you like to try again?"
  main.append(gameOverMessage, restart)
}