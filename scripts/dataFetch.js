//function for fetching all games
async function fetchGames() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8178533653msh9d871bc920cfbd4p11897cjsn7bd0c5351d8e",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  const gamesListElement = createGamesList(data);

  gamesSectionElement.innerHTML = "";
  gamesSectionElement.appendChild(gamesListElement);
}

//function for fetching games in category that is chosen by using dataset
async function getCategoryGames(event) {
  event.preventDefault();
  const category = event.target.dataset.category;
  categoryBtnElements.forEach(element => {
    element.classList.remove('checked');
  });
  event.target.classList.add('checked');
  closeBurgerMenu();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8178533653msh9d871bc920cfbd4p11897cjsn7bd0c5351d8e",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  if (category == "all") {
    fetchGames();
    h1CategoryElement.textContent = "ALL GAMES";
  } else {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const data = await response.json();
    const gamesListElement = createGamesList(data);

    gamesSectionElement.innerHTML = "";
    gamesSectionElement.appendChild(gamesListElement);
    h1CategoryElement.textContent = category;
  }
}

//getting single game detail by using dataset
async function getGameDetail(event) {
  const gameId = event.target.dataset.gameid; 
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8178533653msh9d871bc920cfbd4p11897cjsn7bd0c5351d8e",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
    options
  );
  const data = await response.json();
  if (!response.ok) {
    h1CategoryElement.innerHTML = "";
    gamesSectionElement.innerHTML = "";
    gamesSectionElement.innerHTML = `<h1>Sorry, something went wrong</h1><p>Sorry, something went wrong. Try again latter.</p>`;
  } else {
    showingGameDetail(data);
  }
}

async function getGameByName(event) {
  h1CategoryElement.innerHTML = '';
  event.preventDefault();
closeBurgerMenu();
  const formData = new FormData(event.target);
  const enteredName = String(formData.get("gamename")).toLowerCase();
  console.log(enteredName);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8178533653msh9d871bc920cfbd4p11897cjsn7bd0c5351d8e",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  for(let i = 0; i < data.length; i++){
    if(String(data[i].title).toLowerCase() === enteredName){
      console.log(String(data[i].title).toLowerCase())
      console.log(data[i]);
      showingSearchedGame(data[i]);
      break;
     }else{
      gamesSectionElement.innerHTML = '';
      gamesSectionElement.innerHTML = `<h1>Sorry, we do not have a game by that name!</h1><p>Try typing the full name of the game.</p>`;
    }
  
  }


}
