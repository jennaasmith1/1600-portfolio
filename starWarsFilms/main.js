import { films } from '../starWarsData/films.js'

const main = document.querySelector('main')

for (let i = 0; i < 7; i++) {
    let figure = document.createElement('figure')
    let figImg = document.createElement('img')

    const urlSplit = films[i].url.split('/')
    const id = urlSplit[urlSplit.length - 2]
    figImg.src = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`

    let figCaption = document.createElement('figcaption')
    figCaption.textContent = films[i].title

    figure.appendChild(figImg)
    figure.appendChild(figCaption)
    main.appendChild(figure)
}
