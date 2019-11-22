const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', function(){
  fetchTrainers()
  addPokeBtn()
  releasePokeBtn()
})

function releasePokeBtn() {
  main.addEventListener('click', function(){
  const pokemonID = event.target.dataset.pokemonId
  releasePoke(pokemonID, event)
  })
}

function releasePoke(pokemonID, event) {
  const pokeRelease = event.target.parentElement
  if (event.target.className === 'release')
  fetch(`${POKEMONS_URL}/${pokemonID}`, {method: "DELETE"})
  .then(pokeRelease.remove())

}

function addPokeBtn() {
  main.addEventListener('click', function(){
    const ul = event.target.nextElementSibling
    if (event.target.dataset.trainerId && ul.childElementCount < 6){
      const trainerID = event.target.dataset.trainerId
      createPoke(trainerID)
    }
  })
}

function createPoke(trainerID) {
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    },
   body: JSON.stringify({
      trainer_id: trainerID
   })
  }
  fetch(`${POKEMONS_URL}`, reqObj)
  .then(resp => resp.json())
  .then(json => renderPokemon(json))
}

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
    addTrainers(trainers)
    trainers.forEach(trainer => renderPokemons(trainer))
  })
}

function addTrainers(trainers) {
  trainers.forEach(trainer => {
    addTrainer(trainer)
  })
}

function addTrainer(trainer) {
  const trainerCard = `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  <ul id="ul-${trainer.id}"></ul>
  </div>`
  main.insertAdjacentHTML( 'beforeend', trainerCard )
}

function renderPokemons(trainer){
  trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

function renderPokemon(pokemon) {
  console.log(pokemon)
  const poke_list = document.getElementById(`ul-${pokemon.trainer_id}`)
  const pokeHTML = `<li id=${pokemon.id}>${pokemon.nickname}<button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
    poke_list.insertAdjacentHTML('beforeend', pokeHTML)
}
