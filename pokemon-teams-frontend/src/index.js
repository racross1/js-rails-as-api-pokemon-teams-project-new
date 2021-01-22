const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchAllTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(trainer => loadTrainer(trainer)))
}

function postPokemon(trainerId) {
    fetch(POKEMONS_URL,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'
    }, 
        body: JSON.stringify({'trainer_id': trainerId}),
    })
    .then(resp => resp.json())
    .then(pokemon => loadPokemon(pokemon))
}

function deletePokemon(pokemon){
    fetch(POKEMONS_URL+`/${pokemon.id}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())   
    .then(() => {
        let oldPokemon = document.getElementById(`li ${pokemon.id}`)
        oldPokemon.remove()
    })
}

function loadTrainer(trainer) {
    let main = document.querySelector('main')

    let div = document.createElement('div')
    let p = document.createElement('p')
    let addBtn = document.createElement('button')
    let ul = document.createElement('ul')
    ul.id = `ul ${trainer.id}`
    
    div.className = 'card'
    div.setAttribute('data-id', trainer.id)
    p.textContent = trainer.name 
    addBtn.setAttribute('data-trainer-id', trainer.id)
    addBtn.textContent = 'Add Pokemon'
    addBtn.addEventListener('click', () => handleClick(trainer))

    div.append(p, addBtn, ul)
    main.appendChild(div)

    let pokemons = trainer.pokemons
    pokemons.forEach(p => loadPokemon(p))
}

function loadPokemon(pokemon) {
    let ul = document.getElementById(`ul ${pokemon.trainer_id}`)

    let li = document.createElement('li')
    let releaseBtn = document.createElement('button')

    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    releaseBtn.className = 'release'
    releaseBtn.textContent = 'Release'
    releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
    releaseBtn.addEventListener('click', () => deletePokemon(pokemon))
    li.id = `li ${pokemon.id}`


    li.appendChild(releaseBtn)
    ul.appendChild(li)
}

function handleClick(trainer) {
    if (trainer.pokemons.length < 6) {
        postPokemon(trainer.id) 
    } else {
        alert("you can't add any more pokemon")
    }
}







fetchAllTrainers()



