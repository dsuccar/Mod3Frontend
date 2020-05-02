const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`
const USERS_URL = `${BASE_URL}/users`
let page = 1;
let userId = 1
let globalPoints = 0
// debugger
function stringFixer1(string){
  return string.replace(/&quot;/g, "'")
}

function stringFixer2(string){
  return string.replace(/&#039;/g, "'")
}

function stringFixer3(string){
  return string.replace(/&amp/g, "&")
}

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

function fetchUser(user){
  console.log("Fetching user")
  fetch(`USERS_URL/${user.id}`)
  .then(resp => resp.json())
  .then(user => renderQuestion(user))
}

function renderMain(user){ //params = (user, inputted number?)
  const mainPageContent = document.createElement("div")
  mainPageContent.classList.add("mainPage")
  const h1 = document.createElement("h1")
  h1.innerText = "Welcome! Click here to begin."
  const main = document.querySelector(".main")
  // debugger
  // leaderboard
  // sortedUser = user.sort((a, b) => b - a)
  ul = document.createElement("ul")
  ul.classList.add("leaderboard-scores")
  for(let i = 0; i < user.length; i++){
    const li = document.createElement("li")
    li.classList.add("leaderboard")
    li.innerText = `${user[i].name}: ${user[i].user_questions.length} points`
    ul.append(li)
  }
  const input = document.createElement("input")
  input.placeholder = "Log in here..." //build login function instead. then attach render main to an event listener
  const submitBtn = document.createElement("button")
  submitBtn.innerText = "Login"
  // input.append(submitBtn)

  submitBtn.addEventListener("click", (event) => submitLogin(event, user) )
  
  main.append(mainPageContent)
  mainPageContent.append(h1, ul, input, submitBtn)

  // h1.addEventListener("click", () => fetchQuestions())
  // submitBtn.addEventListener("click", () => fetchQuestions())
}

function submitLogin(event, user){
  event.preventDefault()
  
  const obj = {
    name: event.target.parentNode.children[2].value,
    user_questions: user.user_questions
  }

  fetch(USERS_URL, {
    method: "POST",
    headers: {"Content-Type" : "application/json",
      "Accept" : "application/json"},
    body: JSON.stringify(obj)
  })
  fetchQuestions()
}

function renderQuestions(question) {
  globalQuestion = question //intentional global variable
  const points = document.querySelector(".round-points")
  points.innerText = `Points: ${globalPoints}`

  let randomQuestion = question[Math.floor(Math.random() * question.length)]//Math.floor(Math.random() * Math.floor(max));
 
  console.log("Rendering question for user")

  const mainPage = document.querySelector(".mainPage")

  mainPage.style.display = "none"

  const questionContainer = document.getElementById("question-container")
  questionContainer.innerHTML = ""
  const questionText = document.createElement("h3")
  questionText.classList.add("question-text")
  let dataText3 = randomQuestion.question_text
  console.log(dataText3) //string
  
  let dataText2 = stringFixer1(dataText3)
  let dataText = stringFixer2(dataText2)
  questionText.innerText = dataText
  // questionText.innerText = randomQuestion.question_text

  questionContainer.append(questionText)
  
  const answerContainer = document.createElement("div")
  answerContainer.classList.add("answer-container")
  questionContainer.append(answerContainer)

  let dataCorrect3 = randomQuestion.correct_answer
  let dataCorrect2 = stringFixer1(dataCorrect3)
  let dataCorrect = stringFixer2(dataCorrect2)
  let rawAnswersArray = []
  rawAnswersArray.push(dataCorrect)
  // rawAnswersArray.push(randomQuestion.correct_answer)

  let stringOfNestedWrongAnswersArray = randomQuestion.incorrect_answers
  let dataIncorrect3 = stringOfNestedWrongAnswersArray
  let dataIncorrect2 = stringFixer1(dataIncorrect3)
  let dataIncorrect = stringFixer2(dataIncorrect2)

  nestedIncorrectAnswersArray = JSON.parse("[" + dataIncorrect + "]")
  incorrectAnswersArray = nestedIncorrectAnswersArray.flat()

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
  debugger
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