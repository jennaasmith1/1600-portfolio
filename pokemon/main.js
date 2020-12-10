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
        allPokemon[pokemon.name] = pokeData
    }
    console.log(allPokemon)
    return allPokemon
}

function getImageNumber(id) {
    if (id < 10) {
        return `00${id}`
    } else if (id > 9 && id < 100) {
        return `0${id}`
    } else if (id > 99 && id < 810) {
        return `${id}`
    }
    return `pokeball`
}


function createCard(id, pokeName, pokeInfo) {
    const front = document.createElement('div')
    front.classList.add("card__face")
    front.classList.add("card__face--front")
    const img = document.createElement('img')
    img.src = "images/" + getImageNumber(id) + ".png"
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
    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
    });

    return card

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const createPokemon = document.querySelector('#createPokemon')
createPokemon.addEventListener('click', () => {
    console.log("i clicked!")
    const pokeName = prompt('What is your new Pokemon name?')
    const pokeInfo = {
        Height: getRandomInt(3, 40) + " decimeters",
        Weight: getRandomInt(50, 1000) + " hectograms",
        "Base Experience": getRandomInt(30, 300)
    }
    const newCard = createCard(900, pokeName, pokeInfo)
    const mainNode = document.querySelector('main')
    mainNode.insertBefore(newCard, mainNode.children[1])
})

async function main() {
    const mainNode = document.querySelector('main')
    const pokemon = await fechPokemon()
    // console.log(pokemon)
    Object.entries(pokemon).forEach(([name, pokeData]) => {
        const abilitiesToString = abilitiesRaw => {
            const abilities = abilitiesRaw.map(ability => ability.ability.name)
            return abilities.join(", ")
        }
        const hiddenAbilities = pokeData.abilities.filter(ability => ability.is_hidden)
        const abilities = pokeData.abilities.filter(ability => !ability.is_hidden)
        console.log(abilities, pokeData.abilities)
        const pokeInfo = {
            Height: pokeData.height + " decimeters",
            Weight: pokeData.weight + " hectograms",
            "Base Experience": pokeData.base_experience,
            Abilities: abilitiesToString(abilities),
            "Hidden Abilities": abilitiesToString(hiddenAbilities)
        }
        const card = createCard(pokeData.id, name, pokeInfo)
        mainNode.appendChild(card)
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
