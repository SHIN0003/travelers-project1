let titleH1;
let directorSpan;
let producerSpan;
let release_dateSpan;
let charactersUl;
let planetsUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  directorSpan = document.querySelector('span#director');
  producerSpan = document.querySelector('span#producer');
  release_dateSpan = document.querySelector('span#release_date')
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
  getFilmCharacters(id)
});


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
    const filmCharactersLis = filmCharacters.map(character =>
        `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`
    )
    charactersUl.innerHTML = filmCharactersLis.join("");
}

// FILM PLANETS