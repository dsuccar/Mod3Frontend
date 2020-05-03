const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let page = 1;
let userId = 1
let globalPoints = 0
let timeLeft = 3
let count = 6

function stringFixer(string){
  const string2 = string.replace(/&quot;/g, "'")
  const string3 = string2.replace(/&#039;/g, "'")
  const string4 = string3.replace(/&amp/g, "&")
  const string5 = string4.replace(/&eacute;/g, "e")
  const string6 = string5.replace(/&aacute;/g, "a")
  const string7 = string6.replace(/Llanfair&shy;/g, "Llanfair")
  const string8 = string7.replace(/pwllgwyngyll&shy;/g, "pwllgwyngyll")
  const string9 = string8.replace(/gogery&shy;/g, "gogery")
  const string10 = string9.replace(/chwyrn&shy;/g, "chwyrn")
  const string11 = string10.replace(/drobwll&shy;/g, "drobwll")
  const string12 = string11.replace(/llan&shy;/g, "llan")
  const string13 = string12.replace(/silio&shy;/g, "silio")
  const string14 = string13.replace(/gogo&shy;/g, "gogo")
  return string14
}

function timer(){
  span = document.getElementById("timer")
  let counter = setInterval(timer, 1000); //timer decrements every second
  // clearInterval(counter);
  count = count - 1;
  if(count <= 0)
  {
    // count = count - 1;
    clearInterval(counter);
    //counter ended, do something here
    // return
  }
  if(count === 0){
    // clearInterval(counter)
    alert("Time's up!")
  }
  // document.getElementById("timer").innerHTML="Time left: " + count
  span.innerHTML="Time left: " + count
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

  const span = document.createElement("span")
  span.setAttribute("id", "timer")
  h1.append(span)
  main.append(mainPageContent)
  mainPageContent.append(h1)

  // h1.addEventListener("click", () => fetchQuestions(user))
  h1.addEventListener("click", () => timer())
  // submitBtn.addEventListener("click", () => fetchQuestions())
}

function renderQuestions(question, user) {
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
  console.log(dataText) //string

  questionText.innerText = dataText

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

    // alert("Correct Answer!")

    obj = {
      question_id: randomQuestion.id,
      user_id: user.id //used to be hardcoded to always be DannyTwoThumbs.
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