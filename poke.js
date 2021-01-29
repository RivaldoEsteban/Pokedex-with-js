const pokeTitle = window.pokeTitle
const pokeName = document.getElementById('pokeName')
const pokeImage = document.getElementById('pokeImage')
const pokeInput = document.getElementById('inputtwo')
const abilityName = document.getElementById('ability')
const pokemonType = document.getElementById('type')
const image2 = document.getElementById('image2')
const image3 = document.getElementById('image3')
const image4 = document.getElementById('image4')
const image1 = document.getElementById('image1')

async function getPokemon (id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  const data = await response.json()
  return data
}
async function init() {
  const pokemon = await getPokemon(25)
  updatePokemon(pokemon,25)
  getAbilities(pokemon.abilities)
  getTypes(pokemon.types)
}
function roundOut (id){
  const longitud = id.toString().length
  if(longitud <= 2){
    return id.toString().padStart(3, "0")
  }
  return id
}

function updatePokemon (pokemon,id) {
  const numberId = roundOut(id)
  image1.setAttribute('src',`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numberId}.png`)
  pokeImage.setAttribute('src',pokemon.sprites.front_default)
  image2.setAttribute('src',pokemon.sprites.back_default)
  image3.setAttribute('src',pokemon.sprites.back_shiny)
  image4.setAttribute('src',pokemon.sprites.front_shiny_female)
  pokeName.textContent = pokemon.name
}

function getAbilities (abilities) {
  abilities.map(ability => {
    const name = ability.ability.name
    const printName = `<p>${name}</p>`
    abilityName.insertAdjacentHTML('beforeend', printName)
  })
}

function getTypes (types) {
  types.map(type => {
    const printType = `<p>${type.type.name}</p>`
    pokemonType.insertAdjacentHTML('beforeend', printType )
  })
}

pokeInput.addEventListener('change' , async () => {
  const pokemon = await getPokemon(pokeInput.value)
  updatePokemon(pokemon , pokeInput.value )
  getAbilities(pokemon.abilities)
  getTypes(pokemon.types)
})

init()
