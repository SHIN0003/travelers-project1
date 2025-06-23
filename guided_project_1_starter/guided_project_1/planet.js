let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  terrainSpan = document.querySelector("span#terrain");
  climateSpan = document.querySelector("span#climate");
  diameterSpan = document.querySelector("span#diameter");
  charactersUl = document.querySelector("#characters>ul");
  filmsUl = document.querySelector("#films>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    planet.character = await fetchCharacter(planet);
    planet.films = await fetchFilms(planet);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl).then((res) => res.json());
}

async function fetchCharacter(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const character = await fetch(url).then((res) => res.json());
  return character;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  terrainSpan.textContent = planet?.terrain;
  climateSpan.textContent = planet?.climate;
  diameterSpan.textContent = planet?.diameter;

  const filmsLis = planet?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsUl.innerHTML = filmsLis.join("");

  const charactersLis = planet?.character?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );

  charactersUl.innerHTML = charactersLis.join("");
};
