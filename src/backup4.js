const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let globalPoints = 0
let globalLives = 5
let lives = globalLives
let users

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

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers()
})

function fetchUsers(){
    console.log("fetching users")
    fetch(USERS_URL)
    .then(resp => resp.json())
    .then(users => loginPage(users))
}

function loginPage(users){
  console.log("login page")
  globalUsers = users // intentional global variable

  const scoreCheckX = document.querySelectorAll(".score-check-x")
  for(let i = 0; i < scoreCheckX.length; i++){
    if(scoreCheckX[i] !== ""){
      scoreCheckX[i].innerText = ""
    }
    scoreCheckX[i].style.display = "none"
  }

  const input = document.querySelector("input")
  input.style.display = "block"

  const loginBtn = document.getElementById("login-button")
  loginBtn.style.display = "block"

  const loggedIn = document.getElementById("logged-in-message")
  loggedIn.style.display = "none"

  ul = document.getElementById("leaderboard-scores")

  const lives = document.getElementById("lives")
  lives.innerText = ""
//   scoreBoard(users)
    scoreBoard(globalUsers)

//   loginBtn.addEventListener("click", (event) => submitLogin(event, users) )
    // loginBtn.addEventListener("click", (event) => submitLogin(event, globalUsers) )
// loginBtn.addEventListener("click", (event) => beforeSubmitLogin(event, users) )
    // beforeSubmitLogin(event, users)
    // loginBtn.onclick = submitLogin
    loginBtn.onclick = beforeSubmitLogin
}

function beforeSubmitLogin(){
    const loginBtn = document.getElementById("login-button")
        loginBtn.addEventListener = submitLogin(event, globalUsers)
}

function submitLogin(event, globalUsers){ //login finds a user, or creates new
// function submitLogin(event, users){ //login finds a user, or creates new
  // event.preventDefault()

  console.log("submitting login")
  const input = document.querySelector("input")
  input.style.display = "none"

  const loginBtn = document.getElementById("login-button")
  loginBtn.style.display = "none"

  const loggedIn = document.getElementById("logged-in-message")
  loggedIn.style.display = "block"

  const loginMessage = document.getElementById("login-message")
  loginMessage.append(loggedIn)

  let existingUser
  let mappedUsers
  let user
  function myFunc(user) {
    return user.name
  }
  if(Array.isArray(users) === true){
    // mappedUsers = users.map(myFunc)
        mappedUsers = globalUsers.map(myFunc)
  }else{
    // mappedUsers = users
    mappedUsers = globalUsers
  }

//   if(users.length > 1){
  if(globalUsers.length > 1){
    // user = users.find(user => user.name === input.value )
    user = globalUsers.find(user => user.name === input.value )
  }

    if (input.value !== null && mappedUsers.includes(input.value)){  
      existingUser = user
    //   fetchQuestions(existingUser, users)
        fetchQuestions(existingUser, globalUsers)
    }else{
      const obj = {
        name: event.target.parentNode.children[1].value
        }
      fetch(USERS_URL, {
        method: "POST",
        headers: {"Content-Type" : "application/json",
          "Accept" : "application/json"},
        body: JSON.stringify(obj)
        }).then(resp => resp.json()).then(user => fetchQuestions(user, globalUsers))
    // }).then(resp => resp.json()).then(user => fetchQuestions(user, users))
  }
}

function scoreBoard(users){
    console.log("scoreboard")
  
    ul = document.getElementById("leaderboard-scores")
  
    let usersInfo = users
    for(let i = 0; i < usersInfo.length; i++){
      //   if(usersInfo[i].user_questions.length > 1){
 
      if(Array.isArray(usersInfo[i].user_questions) === true){
          usersInfo[i].user_questions = usersInfo[i].user_questions.length
      }else{
          usersInfo[i].user_questions
      }
    }
    usersInfo.sort(function(a, b) { 
      return b.user_questions - a.user_questions;
    })
  
    let variable
    if(10 > users.length){
      variable = users.length
    }else{
      variable = 10
    }
    const li = document.querySelectorAll(".leaderboard")
    for(let i = 0; i < variable; i++){
      li[i].innerText = `${usersInfo[i].name}: ${usersInfo[i].user_questions} points`
    }
}

function fetchQuestions(user, users) {

  console.log("Loading questions")
  fetch(QUESTIONS_URL)
    .then(resp => resp.json())
    .then(question => beforeRenderQuestions(question, user, users))
}

function beforeRenderQuestions(question, user, users){
  console.log("before rendering")

  const scoreContainer = document.getElementById("score-container")
  scoreContainer.style.display = "none"
  const scoreContainerTitle = document.getElementById("score-container-title")
  scoreContainerTitle.style.display = "none"
  const ul = document.getElementById("leaderboard-scores")
  ul.style.dispay = "none"

  lives = globalLives
  globalPoints = 0

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
  let randomQuestion = question[Math.floor(Math.random() * question.length)]

  const questionContainer = document.getElementById("question-container")
  questionContainer.style.display = "block"
  questionContainer.innerHTML = ""
  const questionText = document.createElement("h3")
  questionText.classList.add("question-text")

  let rawQuestionText = randomQuestion.question_text
  let dataText = stringFixer(rawQuestionText)

  questionText.innerText = dataText

  const chancesLeft = document.getElementById("lives")
  chancesLeft.innerText = "Lives: " + lives

  questionContainer.append(questionText)
  
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

  const bigGreenCheckmark = document.getElementById("big-green-checkmark")
  bigGreenCheckmark.innerText = ""

  const h2 = document.querySelector("h2")

  const redX = document.getElementById("big-red-x")
  redX.innerText = "❌"
  redX.style.display = "block"

  h2.append(redX)

  console.log("Incorrect!")
  if(lives <= 0){
    // gameOver(globalQuestion, user, users)
    // gameOver(globalQuestion, users)
    gameOver(users)
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

function gameOver(users){

  const main = document.querySelector(".main")
  const questionContainer = document.getElementById("question-container")
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

  yesBtn = document.createElement("button")
  yesBtn.setAttribute("id", "no-btn")

  yesBtn.innerText = "Yes"
  
  restart.append(yesBtn)
  gameOverMessage.append(restart)
  main.append(gameOverMessage)

  yesBtn.addEventListener("click", () => (gameOverMessage.remove(), fetchUsers()))
 
    // yesBtn.addEventListener("click", () => (gameOverMessage.remove(), loginPage(users)))
}
