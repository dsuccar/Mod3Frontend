const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let globalPoints = 0
let globalCount = 70
// let count = 7
let count = globalCount
let globalLives = 5
let lives = globalLives
let timer

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
  const string17 = string16.replace(/&ocirc;/g, "ô")
  const string18 = string17.replace(/&rsquo;/g, "'")
  const string19 = string18.replace(/&aicute;/g, "í")
  const string20 = string19.replace(/&oacute;/g, "ó")
  const string21 = string20.replace(/&ldquo;/g, "“")
  const string22 = string21.replace(/&rdquo;/g, "”")
  return string22
}

function stopTimer(){
  clearInterval(timer)
}

function timeLeft(user, users){
  // function stopTimer(){
  //   clearInterval(timer)
  // }
timer = setInterval(function(){
  count -= 1
  // if(stopwatch !== null && stopwatch !== undefined){
  stopwatch = document.getElementById("timer")
  stopwatch.innerText = "Time left: " + count

if(count <= 0){
  // stopTimer()
  gameOver(user, users)
  count = 70
} },1000)
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers()
})

function fetchUsers(){
  console.log("fetching users")
  return fetch(USERS_URL)
  .then(resp => resp.json())
  .then(users => loginPage(users))
}

function loginPage(users){
  console.log("login page")
  // lives = globalLives
  const h1 = document.getElementById("click-here-to-begin")
  if(h1 !== null){
  h1.style.display = "none"
  }
  const scoreCheckX = document.querySelectorAll(".score-check-x")
  for(let i = 0; i < scoreCheckX.length; i++){
    if(scoreCheckX[i] !== ""){
      scoreCheckX[i].innerText = ""
    }
    scoreCheckX[i].style.display = "none"
  }

  const main = document.querySelector(".main")
  // const loginContainer = document.createElement("div")
  // loginContainer.setAttribute("id", "login-container")
  const loginContainer = document.getElementById("login-container")

  // const input = document.createElement("input")
  // input.placeholder = "Log in here..." 
  const input = document.querySelector("input")
  input.style.display = "block"

  // const submitBtn = document.createElement("button")
  // submitBtn.innerText = "Login"
  const loginBtn = document.getElementById("login-button")
  loginBtn.style.display = "block"

  // const loggedIn = document.createElement("h6")
  const loggedIn = document.getElementById("logged-in-message")
  // loggedIn.setAttribute("id", "logged-in-message")
  // loggedIn.classList.add("is-6")
  // loggedIn.innerText = "You have successfully logged in!"
  loggedIn.style.display = "none"

  // const scoreContainer = document.createElement("div")
  // scoreContainer.setAttribute("id", "score-container")
  const scoreContainer = document.getElementById("score-container")
  // scoreContainer.style.display = "block"
  // const scoreContainerTitle = document.createElement("h3")
  // scoreContainerTitle.setAttribute("id", "score-container-title")
  // scoreContainerTitle.innerText = "Click here to see our users"
  const scoreContainerTitle = document.getElementById("score-container-title")
  // scoreContainerTitle.style.display = "block"
  ul = document.getElementById("leaderboard-scores")

  // scoreContainerTitle.addEventListener("click", () => {
  //   if(ul.style.display === "none"){
  //     ul.style.display = "block"
  //   }else if (ul.style.display = "block"){
  //     ul.style.display = "none"
  //   }
  // });

  // leaderboard
  scoreBoard(users)

  // loginContainer.append(input, submitBtn, scoreContainerTitle)
  // loginContainer.append(loggedIn)
  // main.append(loginContainer)
  // const loginForm = document.getElementById("login-form")
  loginBtn.addEventListener("click", (event) => submitLogin(event, users) )
  // loginBtn.onclick = submitLogin(event, users)
  // loginForm.addEventListener("submit", (event) => submitLogin(event, users) )
  // loginBtn.addEventListener("click", (event) => beforeSubmitLogin(event, users) )
}

function scoreBoard(users){
  console.log("scoreboard")
  // leaderboard
  const scoreContainer = document.getElementById("score-container")

  // const scoreContainerTitle = document.getElementById("score-container-title")
  
  // scoreContainer.style.display = "none"

  // ul = document.createElement("ul")
  // ul.setAttribute("id", "leaderboard-scores")
  ul = document.getElementById("leaderboard-scores")

  const highScorers = []
  let usersInfo = users
  let result = []
  for(let i = 0; i < usersInfo.length; i++){
    usersInfo[i].user_questions = usersInfo[i].user_questions.length
    result.push(usersInfo)
  }
  usersInfo.sort(function(a, b) { 
    return b.user_questions - a.user_questions;
  })
  console.log(usersInfo)

  let variable
  if(10 > users.length){
    variable = users.length
  }else{
    variable = 10
  }
  const li = document.querySelectorAll(".leaderboard")
  // for(let i = 0; i < 10; i++){
    // for(let i = 0; i < variable; i++){
  for(let i = 0; i < variable; i++){
    // highScorers.push(users[i].user_questions)

    // const li = document.createElement("li")
    // li.classList.add("leaderboard")
    li[i].innerText = `${usersInfo[i].name}: ${usersInfo[i].user_questions} points`
    // ul.append(li)
  }

  // scoreContainerTitle.addEventListener("click", () => {
  //   if(scoreContainer.style.display === "none"){
  //     scoreContainer.style.display = "block"
  //   }else if (scoreContainer.style.display = "block"){
  //     scoreContainer.style.display = "none"
  //   }
  // });

  // scoreContainerTitle.append(scoreContainer)
  // scoreContainer.append(ul)
}

// function beforeSubmitLogin(event, users){
//   console.log("hit me")
//   submitLogin(event, users)
// }

function submitLogin(event, users){ //login finds a user, or creates new
  // event.preventDefault()
  // debugger
  console.log("submitting login")
  const input = document.querySelector("input")
  input.style.display = "none"

  const loginBtn = document.getElementById("login-button")
  loginBtn.style.display = "none"

  const attach = document.getElementById("attach")
  // const loggedIn = document.createElement("h6")
  const loggedIn = document.getElementById("logged-in-message")

  // loggedIn.setAttribute("id", "logged-in-message")
  // loggedIn.classList.add("is-6")
  // loggedIn.classList.add("subtitle")
  // loggedIn.innerText = "You have successfully logged in!"
  loggedIn.style.display = "block"

  const loginMessage = document.getElementById("login-message")
  // loginMessage.classList.add("is-1")
  loginMessage.append(loggedIn)

  let existingUser
  let mappedUsers
  let user
  function myFunc(user) {
    return user.name
  }
  debugger
  if(Array.isArray(users) === true){
    mappedUsers = users.map(myFunc)
  }else{
    mappedUsers = users
  }

  if(users.length > 1){
    user = users.find(user => user.name === input.value )
  }
  // if(!input){
  //   existingUser = users
  //   // renderMain(existingUser)
  //   fetchQuestions(user)
  // }else if (input.value !== null && mappedUsers.includes(input.value)){  

    if (input.value !== null && mappedUsers.includes(input.value)){  
      existingUser = user
      // renderMain(user)
      // fetchQuestions(user, users)
      fetchQuestions(existingUser, users)
    }else{
      const obj = {
        name: event.target.parentNode.children[1].value
        // user_questions: user.user_questions
        }
      fetch(USERS_URL, {
        method: "POST",
        headers: {"Content-Type" : "application/json",
          "Accept" : "application/json"},
        body: JSON.stringify(obj)
      }).then(resp => resp.json()).then(user => fetchQuestions(user, users))
      // }).then(resp => resp.json()).then(user => renderMain(user))
  }
}

function fetchQuestions(user, users) {

  console.log("Loading questions")
  fetch(QUESTIONS_URL)
    .then(resp => resp.json())
    .then(question => beforeRenderQuestions(question, user, users))
    // .then(question => renderQuestions(question, user))
}

// function renderMain(user){
//   lives = globalLives

//   const scoreCheckX = document.querySelectorAll(".score-check-x")
//   for(let i = 0; i < scoreCheckX.length; i++){
//     if(scoreCheckX[i] !== ""){
//       scoreCheckX[i].innerText = ""
//     }
//     scoreCheckX[i].style.display = "none"
//   }

//   globalPoints = 0
//   // const gameOverMessage = document.createElement("h1")
//   // const gameOverMessage = document.getElementById("game-over-message")
//   // gameOverMessage.innerHTML = ""

//   // const mainPageContent = document.createElement("div")
//   // mainPageContent.setAttribute("id", "main-page")
//   // if(!h1){}
//   let h1 = document.createElement("h1")
//   h1.setAttribute("id", "click-here-to-begin")
//   h1.innerText = "Welcome! Click here to begin."
//   let mainPageContent = document.getElementById("main-page")
//   if(mainPageContent === null){
//     mainPageContent = document.createElement("div")
//     h1 = document.createElement("h1")
//     h1.setAttribute("id", "click-here-to-begin")
//     mainPageContent.setAttribute("id", "main-page") 
//     h1.innerText = "Welcome! Click here to begin."
//   }else{
//     mainPageContent.style.display = "block"
//     // const h1 = document.getElementById("click-here-to-begin")
//     h1.style.display = "block"
//     mainPageContent.append(h1)
//   }

//   const main = document.querySelector(".main")

//   const loginContainer = document.getElementById("login-container")
//   // if(loginContainer){
//   //   loginContainer.remove()
//   // }

//   main.append(mainPageContent)
//   // mainPageContent.append(h1)

  // h1.addEventListener("click", () => (timeLeft(user), fetchQuestions(user))) //count usually decrements only once here and doesn't let you click on event listener. it automatically activates
//   // h1.addEventListener("click", () => timeLeft, fetchQuestions(user)) // does nothing
//   // h1.addEventListener("click", () => fetchQuestions(user))
//   // h1.addEventListener("click", () => timeLeft())
// }

function beforeRenderQuestions(question, user, users){
  console.log("before rendering")

  const scoreContainer = document.getElementById("score-container")
  scoreContainer.style.display = "none"
  const scoreContainerTitle = document.getElementById("score-container-title")
  scoreContainerTitle.style.display = "none"
  const ul = document.getElementById("leaderboard-scores")
  ul.style.dispay = "none"
  // const li = document.querySelectorAll(".leaderboard")
  // li.style.display = "none"
  // ul.remove()
  lives = globalLives
  globalPoints = 0
  timeLeft(user, users)
  renderQuestions(question, user, users)
}

function renderQuestions(question, user, users){
  console.log("Rendering question for user")

  const h1 = document.getElementById("click-here-to-begin")
  const mainPageContent = document.getElementById("main-page")

  if(mainPageContent !== null && h1 !== null){
    h1.remove()
    mainPageContent.remove()
  }

  const scoreCheckX = document.querySelectorAll(".score-check-x")
  for(let i = 0; i < scoreCheckX.length; i++){
  scoreCheckX[i].style.display = "block"
  }

  globalQuestion = question //intentional global variable to allow incorrectAns and correctAns functions to run

  const points = document.getElementById("round-points")
  if(globalPoints > 0){
    points.innerText = `Points: ${globalPoints}`
  }else{
    points.innerText = `Points: 0`
  }
  let randomQuestion = question[Math.floor(Math.random() * question.length)]//Math.floor(Math.random() * Math.floor(max));

  const loginContainer = document.getElementById("login-container")

  const questionContainer = document.getElementById("question-container")
  questionContainer.style.display = "block"
  questionContainer.innerHTML = ""
  const questionText = document.createElement("h3")
  questionText.classList.add("question-text")

  let rawQuestionText = randomQuestion.question_text
  let dataText = stringFixer(rawQuestionText)

  questionText.innerText = dataText

  const chancesLeft = document.createElement("p")
  chancesLeft.setAttribute("id", "timer")
  chancesLeft.innerText = "Lives: " + lives

  const stopwatch = document.createElement("span")
  stopwatch.setAttribute("id", "timer")
  stopwatch.innerText = "Time left: " + count
  questionContainer.append(questionText, stopwatch, chancesLeft)
  
  const answerContainer = document.createElement("div")
  answerContainer.setAttribute("id", "answer-container")
  
  questionContainer.append(answerContainer)

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
  correct.addEventListener("click", (event) => correctAns(event, randomQuestion, user.id, user.name, users))

  const incorrect = document.querySelectorAll("#incorrect-answer")
  incorrect.forEach((el) => {el.addEventListener("click", (event) => incorrectAns(event, user, users))})
}

function incorrectAns(event, user, users){
  event.preventDefault()
  questionContainer = document.getElementById("question-container")
  lives -= 1
  // if(lives <= 0){
  //   gameOver(user)

  // }

  // const bigGreenCheckmark = document.querySelector(".big-green-checkmark")
  const bigGreenCheckmark = document.getElementById("big-green-checkmark")
  bigGreenCheckmark.innerText = ""

  const h2 = document.querySelector("h2")
  // const redX = document.querySelector(".big-red-x")
  const redX = document.getElementById("big-red-x")
  redX.innerText = "❌"
  redX.style.display = "block"

  h2.append(redX)

  console.log("Incorrect!")
  if(lives <= 0){
    gameOver(globalQuestion, user, users)
  }else{
  renderQuestions(globalQuestion, user, users) //render next question
  }
}

function correctAns(event, randomQuestion, userId, userName, users) {
  event.preventDefault()

  const points = document.getElementById("round-points")
  points.innerText = `Points: ${++globalPoints}`

  const bigRedX = document.getElementById("big-red-x")
  bigRedX.innerText = ""

  const h2 = document.querySelector("h2")
  const greenCheckmark = document.getElementById("big-green-checkmark")
  h2.append(greenCheckmark)
  greenCheckmark.innerText = "✅"
  greenCheckmark.style.display = "block"

  console.log("submitting")

    obj = {
      question_id: randomQuestion.id,
      user_id: userId
      // user_id: user.id
    }

    fetch(USERQUESTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(obj)
    })

    user = {
      id: userId,
      name: userName
    }

    renderQuestions(globalQuestion, user, users)
}

function gameOver(question, user, users){

  // scoreBoard(users)
  stopTimer()
  count = globalCount

  const main = document.querySelector(".main")
  const questionContainer = document.getElementById("question-container")
  // const clickHereToBegin = document.getElementById("click-here-to-begin")
  questionContainer.style.display = "none"

  const bigRedX = document.getElementById("big-red-x")
  bigRedX.style.display = "none"
  const bigGreenCheckmark = document.getElementById("big-green-checkmark")
  bigGreenCheckmark.style.display = "none"

  const gameOverMessage = document.createElement("h1")
  gameOverMessage.setAttribute("id", "game-over-message")
  
  gameOverMessage.innerText = "Game Over!"

  const restart = document.createElement("h3")
  restart.innerText = "Would you like to try again?"

  // yesBtn = document.createElement("button")
  // yesBtn.setAttribute("id", "yes-btn")
  // yesBtn.innerText = "Yes"

  noBtn = document.createElement("button")
  noBtn.setAttribute("id", "no-btn")
  // noBtn.innerText = "No"
  noBtn.innerText = "Yes"
  
  restart.append(noBtn)
  gameOverMessage.append(restart)
  main.append(gameOverMessage)

  // yesBtn.addEventListener("click", (event) => (gameOverMessage.remove(), clickHereToBegin.remove(), submitLogin(event)))
  // yesBtn.addEventListener("click", (event) => (gameOverMessage.remove(), submitLogin(event)))
  // yesBtn.addEventListener("click", (event) => (gameOverMessage.remove(), submitLogin(event, user)))
 
  // noBtn.addEventListener("click", () => (gameOverMessage.remove(), beforeRenderQuestions(question, user), scoreBoard(user)))
  //the above doesn't work because you don't pass in multiple users in this function
  // noBtn.addEventListener("click", () => (gameOverMessage.remove(), beforeRenderQuestions(question, user, users)))
  noBtn.addEventListener("click", () => (gameOverMessage.remove(), fetchUsers())) //has the "double bug"
  // noBtn.addEventListener("click", () => (gameOverMessage.remove(), location.reload())) //works but I don't like it
}
