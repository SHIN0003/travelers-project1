let titleH1;
let directorSpan;
let producerSpan;
let release_dateSpan;
let descriptionSpan;
let charactersUl;
let planetsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  directorSpan = document.querySelector('span#director');
  producerSpan = document.querySelector('span#producer');
  release_dateSpan = document.querySelector('span#release_date');
  descriptionSpan = document.querySelector('span#description');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
  getFilmCharacters(id)
  getFilmPlanets(id)
});

function storeLocalArray(type, id, name) {
    const key = `${type}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    if (!data.some(item => item.id === id )) {
        data.push({ id, name });
        localStorage.setItem(key, JSON.stringify(data));
    }
}

function getArrayItem(type, id) {
    const key = `${type}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const found = data.find(item => item.id === id);
    return found ? found.name : null;
}

// FILM

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    console.log(film);
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);

}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
    titleH1.textContent = film?.title;
    directorSpan.textContent = film?.director;
    producerSpan.textContent = film?.producer;
    release_dateSpan.textContent = film?.release_date;
    descriptionSpan.textContent = film?.opening_crawl;
}

// FILM CHARACTERS

async function getFilmCharacters(id) {
    let characters;
    try {
        characters = await fetchFilmCharacters(id)
        console.log(characters);
    }
    catch (ex) {
        console.error(`Error reading film ${id} character data.`, ex.message);
    }
    renderFilmCharacters(characters);
  
}

async function fetchFilmCharacters(id) {
    let filmCharactersUrl = `${baseUrl}/films/${id}/characters`;
    return await fetch(filmCharactersUrl)
      .then(res => res.json())
}

const renderFilmCharacters = filmCharacters => {
    const filmCharactersList = filmCharacters.map(character => {
        storeLocalArray('film_characters', character.id, character.name);
        return `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`;
    })
    charactersUl.innerHTML = filmCharactersList.join("");
}

// FILM PLANETS

async function getFilmPlanets(id) {
    let planets;
    try {
        planets = await fetchFilmPlanets(id)
        console.log(planets);
    }
    catch (ex) {
        console.error(`Error reading film ${id} planets data.`, ex.message);
    }
    renderFilmPlanets(planets);
  
}

async function fetchFilmPlanets(id) {
    let filmPlanetsUrl = `${baseUrl}/films/${id}/planets`;
    return await fetch(filmPlanetsUrl)
      .then(res => res.json())
}

const renderFilmPlanets = filmPlanets => {
    const filmPlanetsList = filmPlanets.map(planet => {
        storeLocalArray("film_planets", planet.id, planet.name);
        return `<li><a href="/planet.html?id=${planet.id}">${planet.name}</a></li>`;
    })
    planetsUl.innerHTML = filmPlanetsList.join("");
}