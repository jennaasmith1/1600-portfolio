import { species } from '../starWarsData/species.js'


const main = document.querySelector('main')



for (let i = 0; i < species.length; i += 1) {
    let h3 = document.createElement("h3")
    h3.textContent = species[i].name
    let p = document.createElement("p")
    p.innerHTML = `Average Lifespan: ${species[i].average_lifespan} <br/> Language: ${species[i].language}`

    let cardText = document.createElement('div')
    cardText.className = "cardText"
    cardText.appendChild(h3)
    cardText.appendChild(p)
    let img = document.createElement("img")

    const urlSplit = species[i].url.split('/')
    //https://swapi.co/api/species/5/
    //["https:", "", "swapi.com", "api", "species", "5", ""]
    const id = urlSplit[urlSplit.length - 2]
    img.src = `https://starwars-visualguide.com/assets/img/species/${id}.jpg`    

    let cardDiv = document.createElement('div')
    cardDiv.className = "card"
    cardDiv.appendChild(img)
    cardDiv.appendChild(cardText)

    main.appendChild(cardDiv)
}
