async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

async function fechPokemon() {
    const allPokemon = {}
    const allPokemonData = await getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`)
    for (const pokemon of allPokemonData.results) {
        const pokeData = await getAPIData(pokemon.url)
        //console.log(pokemon)
        allPokemon[pokemon.name] = pokeData
    }
    console.log(allPokemon)
    return allPokemon
}


function createCard(pokeName, pokeInfo) {
    const front = document.createElement('div')
    front.classList.add("card__face")
    front.classList.add("card__face--front")
    const img = document.createElement('img')
    //img.src = `https://github.com/fanzeyi/pokemon.json/blob/master/images/${i + 1}.png.jpg`
    const characterName = document.createElement('h2')
    characterName.textContent = pokeName
    front.appendChild(img)
    front.appendChild(characterName)

    const back = document.createElement('div')
    back.classList.add("card__face")
    back.classList.add("card__face--back")
    const characterInfo = document.createElement('ul')
    Object.entries(pokeInfo).forEach(attribute => {
        const item = document.createElement('li')
        item.textContent = `${attribute[0]}: ${attribute[1]}`
    characterInfo.appendChild(item)
    })
    back.appendChild(characterInfo)

    const card = document.createElement('div')
    card.classList.add("card")
    card.appendChild(front)
    card.appendChild(back)
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
      });
    
    return card

}

async function main() {
    const main = document.querySelector('main')
    const pokemon = await fechPokemon()
    console.log(pokemon)
    Object.entries(pokemon).forEach(([name, pokeData]) => {
        const pokeInfo = {
            Species: pokeData.species.name,
            Height: pokeData.height,
            Weight: pokeData.weight,
            "Base Experience": pokeData.base_experience
        }
        const card = createCard(name, pokeInfo)
        main.appendChild(card)
    })
}

main()
//const main = document.querySelector('main')


//main.appendChild(card)


// for   (let i = 0; i < 7; i++) {
//     let figure = document.createElement('figure')
//     let figImg = document.createElement('img')
//     figImg.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
//     let figCaption = document.createElement('figcaption')
//     figCaption.textContent = films[i].title

//     figure.appendChild(figImg)
//     figure.appendChild(figCaption)
//     main.appendChild(figure)
// }
