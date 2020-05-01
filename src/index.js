const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`

document.addEventListener("DOMContentLoaded", () => {
  fetchQuestions()
  // fetchUserQuestions()
})

function fetchQuestions() {
  fetch(QUESTIONS_URL)
    .then(resp => resp.json())
    .then(questionsArr => questionsArr.forEach(question => renderQuestions(question))
    )
}

function renderQuestions(question) {
  const container = document.querySelector("main"),
    ul = document.querySelector(".questions-list"),
    // div = document.createElement("div"),
    li = document.createElement("li")
  li.innerText = question.question_text

  let startArr = []
  startArr = question.incorrect_answers
  // wrongAnswers = wrongAnswers.substring(0, wrongAnswers.length -1)

  let wrongAnswers = JSON.parse("[" + startArr + "]")

  console.log(wrongAnswers)

  let newArr = []
  for (i = 0; i < wrongAnswers.length; i++) {
    newArr.push(wrongAnswers[i])
  }

  const innerUl = document.createElement("ul")
  innerUl.classList.add("innerUl")
  finalArr = newArr[0]

  finalArr.forEach(function (answer) {
    const wrongLi = document.createElement("li")
    wrongLi.classList.add("answer")
    wrongLi.innerText = answer
    innerUl.append(wrongLi)
  })

  // wizards.forEach(function (wizard) {
  //   var li = document.createElement('li');
  //   li.textContent = wizard;
  //   list.appendChild(li);
  // });

  const correctLi = document.createElement("li")
  correctLi.classList.add("correct-answer")
  correctLi.innerText = question.correct_answer
  innerUl.append(correctLi)
  li.append(innerUl)
  ul.append(li)

  const correct = document.querySelector(".correct-answer")
  correct.addEventListener("click", (event) => submitAnswer(event, question))

//   document.querySelectorAll(".answer").forEach(item => {
//     item.addEventListener("click", (event) => submitAnswer(event, question)
//     )
//   }
//   )

}
// document.querySelectorAll('.some-class').forEach(item => {
//   item.addEventListener('click', event => {
//     //handle click
//   })
// })
function submitAnswer(event, question) {
  event.preventDefault()
  console.log("submitting")
  if (event.target.innerText === question.correct_answer) {

    obj = {
      question_id: question.id

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
}

// .then(resp => resp.json())
// .then(pokemon => { 
//   const ul = event.target.nextElementSibling
//   renderPokemons(pokemon,ul)
// } )

  // wizards.forEach(function (wizard) {
  //   var li = document.createElement('li');
  //   li.textContent = wizard;
  //   list.appendChild(li);
  // });

  // const correctLi = document.createElement("li")
  // correctLi.innerText = question.correct_answer
  // innerUl.classList.add("innerUl")
  // innerUl.append(correctLi)
  // li.append(innerUl)
  // ul.append(li)


// create_table "questions", force: :cascade do |t|
// t.string "question_text"
// t.string "correct_answer"
// t.string "incorrect_answers"
// t.datetime "created_at", precision: 6, null: false
// t.datetime "updated_at", precision: 6, null: false
// end


