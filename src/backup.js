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
  const string7 = string6.replace(/Llanfair&shy;/g, "Llanfair") //string17 to string24 is for the long welsh name. putting them all together inside one //g made the result look strange
  const string8 = string7.replace(/pwllgwyngyll&shy;/g, "pwllgwyngyll")
  const string9 = string8.replace(/gogery&shy;/g, "gogery")
  const string10 = string9.replace(/chwyrn&shy;/g, "chwyrn")
  const string11 = string10.replace(/drobwll&shy;/g, "drobwll")
  const string12 = string11.replace(/llan&shy;/g, "llan")
  const string13 = string12.replace(/silio&shy;/g, "silio")
  const string14 = string13.replace(/gogo&shy;/g, "gogo")
  const string15 = string14.replace(/&atilde;/g, "ã")
  const string16 = string15.replace(/&micro;/g, "µ")
  return string16
}

function timeLeft(user){ //putting this inside a function is the same as below effect
  // const timeLeft = setInterval(function(){ //global variable that includes an anonymous function
  
  function stopTimer(){
    clearInterval(time)
  }
  
  const time = setInterval(function(){ //can give it name by doing function <name>(){
 
    const timer = document.createElement("span")
    timer.setAttribute("id", "timer")
    // const timer = document.getElementById("timer") //lines after this are repeated later but this section allows timer to decrement each sec
    // timer.innerText = 0; //prevents timer from starting the moment you call renderMain
    // const timer = document.getElementById("timer")
    debugger
    count -= 1
    timer.innerText = "Time left: " + count //commenting this out means time is always undefined
    if(count === 0){
      stopTimer()
      gameOver(user)
      // count = 6
    }
  }, 1000)
  return time
//the problem here is visible when you open console inside of webpage
}

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
  const scoreCheckX = document.querySelectorAll(".score-check-x")
  for(let i = 0; i < scoreCheckX.length; i++){
    if(scoreCheckX[i] !== ""){
      scoreCheckX[i].innerText = ""
    }
    scoreCheckX[i].style.display = "none"
  }

  const main = document.querySelector(".main")
  const loginContainer = document.createElement("div")
  loginContainer.setAttribute("id", "login-container")

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
  loginContainer.append(input, submitBtn, scoreContainerTitle)
  main.append(loginContainer)
  
  submitBtn.addEventListener("click", (event) => submitLogin(event, users) ) //log in
}

//login finds a user, or creates new

function submitLogin(event, users){
  event.preventDefault()
  // const input = document.querySelector("input")
  //   if(users.includes(input.value)){
  //   let existingUser = input.value
  //   renderMain(existingUser)
  //   }else{
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
  // }
}



function renderMain(user){
  const scoreCheckX = document.querySelectorAll(".score-check-x")
  for(let i = 0; i < scoreCheckX.length; i++){
    if(scoreCheckX[i] !== ""){
      scoreCheckX[i].innerText = ""
    }
    scoreCheckX[i].style.display = "none"
  }

  globalPoints = 0
  const gameOverMessage = document.createElement("h1")

  gameOverMessage.innerHTML = ""

  const mainPageContent = document.createElement("div")
  mainPageContent.setAttribute("id", "main-page")

  const h1 = document.createElement("h1")
  h1.setAttribute("id", "click-here-to-begin")
  h1.innerText = "Welcome! Click here to begin."

  const main = document.querySelector(".main")

  const loginContainer = document.getElementById("login-container")
  if(loginContainer){
    loginContainer.remove()
  }

  main.append(mainPageContent)
  mainPageContent.append(h1)

  h1.addEventListener("click", () => (timeLeft(user), fetchQuestions(user))) //count usually decrements only once here and doesn't let you click on event listener. it automatically activates
  // h1.addEventListener("click", () => timeLeft, fetchQuestions(user)) // does nothing
  // h1.addEventListener("click", () => fetchQuestions(user))
  // h1.addEventListener("click", () => timeLeft())
} //figure out how to add event listener for timer here?

function renderQuestions(question, user){

  const scoreCheckX = document.querySelectorAll(".score-check-x")
  for(let i = 0; i < scoreCheckX.length; i++){
  scoreCheckX[i].style.display = "block"
  }
  // let count = 6
  globalQuestion = question //intentional global variable to allow incorrectAns and correctAns functions to run
  // const points = document.querySelector(".round-points")
  const points = document.getElementById("round-points")
  if(globalPoints > 0){
    points.innerText = `Points: ${globalPoints}`
  }else{
    points.innerText = `Points: 0`
  }
  let randomQuestion = question[Math.floor(Math.random() * question.length)]//Math.floor(Math.random() * Math.floor(max));

  console.log("Rendering question for user")
  // let mainPageContent = document.createElement("div")
  // mainPageContent.setAttribute("id", "main-page")
  let mainPageContent = document.getElementById("main-page")
  // debugger
  if(mainPageContent){
    mainPageContent.remove()
  }
  const loginContainer = document.getElementById("login-container")
  if(loginContainer){
    loginContainer.remove()
  }
  // loginContainer.style.display = "none"

  const questionContainer = document.getElementById("question-container")
  questionContainer.style.display = "block"
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

  // const stopwatch = document.createElement("span")
  // stopwatch.setAttribute("id", "timer")
  // timer.setAttribute("id", "timer")
  const stopwatch = document.getElementById("timer")
  // debugger
  // timer.innerText = "Time left: " + count
  stopwatch.innerText = "Time left: " + count //allows the count to load at the same time as the questions
  //if we don't do this then timer loads AFTER the questions with a lag time
  
  questionContainer.append(answerContainer, stopwatch)
  // questionContainer.append(answerContainer, timer)

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
  // const bigGreenCheckmark = document.querySelector(".big-green-checkmark")
  const bigGreenCheckmark = document.getElementById("big-green-checkmark")
  bigGreenCheckmark.innerText = ""

  const h2 = document.querySelector("h2")
  // const redX = document.querySelector(".big-red-x")
  const redX = document.getElementById("big-red-x")
  redX.innerText = "❌"
  h2.append(redX)

  console.log("Success!")

  renderQuestions(globalQuestion, user) //render next question
}

function correctAns(event, randomQuestion, user) {
  event.preventDefault()

  // const points = document.querySelector(".round-points")
  const points = document.getElementById("round-points")
  points.innerText = `Points: ${++globalPoints}`

  // const bigRedX = document.querySelector(".big-red-x")
  const bigRedX = document.getElementById("big-red-x")
  bigRedX.innerText = ""

  const h2 = document.querySelector("h2")
  // const greenCheckmark = document.querySelector(".big-green-checkmark")
  const greenCheckmark = document.getElementById("big-green-checkmark")
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

function gameOver(user){
  const main = document.querySelector(".main")
  const questionContainer = document.getElementById("question-container")
  const clickHereToBegin = document.getElementById("click-here-to-begin")
  questionContainer.style.display = "none"
  // questionContainer.remove()

  const gameOverMessage = document.createElement("h1")
  
  gameOverMessage.innerText = "Game Over!"

  const restart = document.createElement("h3")
  restart.innerText = "Would you like to try again?"

  yesBtn = document.createElement("button")
  yesBtn.setAttribute("id", "yes-btn")
  yesBtn.innerText = "Yes"

  noBtn = document.createElement("button")
  noBtn.setAttribute("id", "no-btn")
  noBtn.innerText = "No"
  
  restart.append(yesBtn,noBtn)
  gameOverMessage.append(restart)
  main.append(gameOverMessage)
  
  // yesBtn.addEventListener("click", (event) => (gameOverMessage.remove(), clickHereToBegin.remove(), submitLogin(event)))
  yesBtn.addEventListener("click", (event) => (gameOverMessage.remove(), submitLogin(event)))
  noBtn.addEventListener("click", (event) => (gameOverMessage.remove(), fetchUsers(event)))
}