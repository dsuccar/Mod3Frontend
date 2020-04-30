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
    .then(questionsArr =>
      questionsArr.forEach(question =>
        renderQuestions(question))
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

  let wrongAnswers = JSON.parse("[" + startArr + "]")

  console.log(wrongAnswers)

  let newArr = []
  for (i = 0; i < wrongAnswers.length; i++) {
    newArr.push(wrongAnswers[i])
  }

  const innerUl = document.createElement("ul")
  const finalArr = newArr[0]
  finalArr.forEach(function (answer) {
    const wrongLi = document.createElement("li")
    wrongLi.classList.add("answer")
    wrongLi.innerText = answer
    innerUl.append(wrongLi)
  })

  const correctLi = document.createElement("li")
  correctLi.classList.add("answer")
  correctLi.innerText = question.correct_answer
  innerUl.append(correctLi)
  li.append(innerUl)
  ul.append(li)

  const answerClick = document.querySelectorAll(".answer")
  answerClick.addEventListener("click", (event) => submitAnswer(event, question))
}

function submitAnswer(event, question){
  debugger
  if (event.target.value === question.correct_answer){

  obj = {
    question_id: question.id,

  }

  fetch(USERQUESTIONS_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json",
    "Accept": "application/json"},

  })
  // div.append(ul)
  // container.append(div)
}
  else{
    console.log("nope")
}}
// create_table "questions", force: :cascade do |t|
// t.string "question_text"
// t.string "correct_answer"
// t.string "incorrect_answers"
// t.datetime "created_at", precision: 6, null: false
// t.datetime "updated_at", precision: 6, null: false
// end





// const BASE_URL = "http://localhost:3000"
// // const USERS_URL = `${BASE_URL}/users`
// // const QUESTIONS_URL = `${BASE_URL}/questions

// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`
// function fetchTrainers(){
//     fetch(TRAINERS_URL)
//     .then(resp => resp.json())
//     .then(trainerArr => trainerArr.forEach(renderTrainers))
// }

// function renderTrainers(trainer){
//     const container = document.querySelector("main"),
//       div = document.createElement("div"),
//       p = document.createElement("p"),
//       button = document.createElement("button"),
//       ul = document.createElement("ul")
//       div.className = "card"
//       div.setAttribute('data-id', `${trainer.id}`)
//       p.innerText = trainer.name
//       button.setAttribute('data-trainer-id', `${trainer.id}`)
//       button.innerText = "Add Pokemon"
//       container.appendChild(div)
//       div.append(p, button, ul)

//       trainer.pokemons.forEach(pokemon => renderPokemons(pokemon, ul))

//       button.onclick = () => addPokemon(event)
// }

// function renderPokemons(pokemon, ul){
//   const li = document.createElement('li'),
//             button = document.createElement('button')
//        li.innerText = `${pokemon.nickname} (${pokemon.species})`
//        button.className = "release"
//        button.innerText = "release"
//        button.setAttribute('data-pokemon-id', `${pokemon.id}`)
//        li.appendChild(button)
//        ul.appendChild(li)

//   button.addEventListener("click", deletePokemon)
// }

// function addPokemon(event){
//   const id = event.target.dataset.trainerId
//   fetch(TRAINERS_URL + `/${id}`)
//   .then(resp => resp.json())
//   .then(trainer => addPokemon2(event, trainer))
// }

// function addPokemon2(event, trainer){
//   if (trainer.pokemons.length < 6){
//     const newPokemon = {
//       trainer_id: trainer.id
//     }
//     fetch(POKEMONS_URL, {
//       method: "POST",
//       headers: {"Content-type": "application/json", 
//       "Accept": "application/json"},
//       body: JSON.stringify(newPokemon)

//     })
//     .then(resp => resp.json())
//     .then(pokemon => { 
//       const ul = event.target.nextElementSibling
//       renderPokemons(pokemon,ul)
//     } )
//   } else {
//     console.log("nope")
//   }
// }


// function deletePokemon(){

//   pokemon = event.target.dataset.pokemonId
//     const toDelete = {
//       id: pokemon
//     }
//     fetch(POKEMONS_URL + `/${parseInt(pokemon)}`, {
//       method: "DELETE",
//       headers: {"Content-type": "application/json", 
//       "Accept": "application/json"},
//       body: JSON.stringify(toDelete)

//     })
//     event.target.parentNode.remove()
//   }