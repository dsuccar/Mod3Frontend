const BASE_URL = "http://localhost:3000"
const QUESTIONS_URL = `${BASE_URL}/questions`
const USERQUESTIONS_URL = `${BASE_URL}/user_questions`

document.addEventListener("DOMContentLoaded", () => {
    fetchQuestions()
    // fetchUserQuestions()
})

function fetchQuestions(){
  fetch(QUESTIONS_URL)
  .then(resp => resp.json())
  .then (questionsArr => questionsArr.forEach(question => renderQuestions(question))
)}

function renderQuestions(question){
  const container = document.querySelector("main"),
    ul = document.querySelector(".questions-list"),
    // div = document.createElement("div"),
    li = document.createElement("li")
    li.innerText = question.question_text

    // let arr = "['Tied to a boulder for eternity, being pecked by birds., Standing in a lake filled with water he could not drink., To fell a tree that regenerated after every axe swing.']"
    // // arr
    // console.log(arr)
    // console.log("--------------------")
    // let wrongAnswers = arr.split(".")
    // wrongAnswers.unshift(arr[0])
    // wrongAnswers.slice(wrongAnswers[0][1])
    // wrongAnswers.shift()
    // wrongAnswers.pop()
    // console.log(wrongAnswers)
    // console.log("--------------------")
    // let anotherArr = wrongAnswers

    // questionArr.push(question.correct_answer)
    incorrectAnswers.push(question.incorrect_answers)
    // let wrongAnswers = incorrectAnswers
    let wrongAnswers = []
    wrongAnswers = question.incorrect_answers

    wrongAnswers.split(".")
    wrongAnswers.slice(wrongAnswers[0][1])
    console.log(wrongAnswers)
    // wrongAnswers.shift()
    // wrongAnswers.pop()
    // console.log(wrongAnswers)
    const innerUl = document.createElement("ul")
    debugger
    
    incorrectAnswers.forEach(answer => {
      const wrongLi = document.createElement("li")
      wrongLi.innerText = answer
      innerUl.append(wrongLi)
    })
      const correctLi = document.createElement("li")
      correctLi.innerText = question.correct_answer
      innerUl.append(correctLi)
    li.append(innerUl)
    ul.append(li)
    // div.append(ul)
    // container.append(div)
}
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