let titleH1;
let directorSpan;
let producerSpan;
let release_dateSpan;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  directorSpan = document.querySelector('span#director');
  producerSpan = document.querySelector('span#producer');
  release_dateSpan = document.querySelector('span#release_date')
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    console.log(film)
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
  nameH1.textContent = film?.title;
  directorSpan.textContent = film?.director;
  producerSpan.textContent = film?.producer;
  release_dateSpan.textContent = film?.release_date;
}
