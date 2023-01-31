const gamesSectionElement = document.getElementById("games");
const gameSectionElement = document.querySelector('.game');
const categoryBtnElements = document.querySelectorAll(".categories a");
const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const h1CategoryElement = document.querySelector(".category");
const form = document.querySelector('.search form');

form.addEventListener('submit', getGameByName);

categoryBtnElements.forEach((btn) => {
  btn.addEventListener("click", getCategoryGames);
});

window.addEventListener('load', fetchGames);
