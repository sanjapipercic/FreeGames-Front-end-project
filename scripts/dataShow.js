//function for showing game list
function createGamesList(games) {
  const gamesListElement = document.createElement("ol");

  for (const game of games) {
    const gameElement = document.createElement("li");
    gameElement.className = "game";
    gameElement.innerHTML += `<article class="game-item"  onclick="getGameDetail(event)">
        <div class="gameTitle">       
        <h2>${game.title}</h2>
        </h2>
        </div>
        <div class="image" data-gameId="${game.id}" style="background: url(${game.thumbnail});"> 
        </div>
        </article>`;

    gamesListElement.appendChild(gameElement);
  }

  return gamesListElement;
}

function showingSearchedGame(game){
  gamesSectionElement.innerHTML = '';
  const searchedGame = document.createElement('div');
  searchedGame.className = 'game';
  searchedGame.innerHTML += `<article class="game-item"  onclick="getGameDetail(event)">
  <div class="gameTitle">       
  <h2>${game.title}</h2>
  </h2>
  </div>
  <div class="image" data-gameId="${game.id}" style="background: url(${game.thumbnail});"> 
  </div>
  </article>`;
  gamesSectionElement.append(searchedGame);
}

function showingScreenshots(game) {
  let screenshotsEl = document.createElement("div");
  screenshotsEl.className = "screenshots";

  try {
    screenshotsEl.innerHTML = `<h3>${game.title} Screenshots</h3>`;
    let imagesEl = document.createElement("div");
    for (let i = 0; i < game.screenshots.length; i++) {
      imagesEl.innerHTML += `<img src="${game.screenshots[i].image}" class="screenshot">`;
      screenshotsEl.appendChild(imagesEl);
    }
    gamesSectionElement.appendChild(screenshotsEl);
  } catch {
    screenshotsEl.innerHTML = `<p>There are no screenshots available.</p>`;
    gamesSectionElement.appendChild(screenshotsEl);
  }
}


function showingRequirements(game) {
  let requirementsEl = document.createElement("div");
  requirementsEl.className = "requirements";

  try {
    //If there is not minimum_system_requirement show the message
    if (
      Object.values(game.minimum_system_requirements).some((value) => {
        //if any of minimum_system_requirement values are null, empty or undefined show the message
        if (value === null || value === "" || value === "undefined") {
          return true;
        }
      })
    ) {
      requirementsEl.innerHTML = `<h3>Minimal system Requirements <span>(${game.platform})</span></h3>
    <p class='warning'>The minimum system requirements for this game are currently not available.</p>`;
      gamesSectionElement.appendChild(requirementsEl);
    } else {
      requirementsEl.innerHTML += `
    <h3>Minimal system Requirements <span>(${game.platform})</span></h3>
    <div class="requirement">
    <div class="os"><h4>OS</h4><p>${game.minimum_system_requirements.os}</p></div>
    <div class="processor"><h4>Processor</h4><p>${game.minimum_system_requirements.processor}</p></div>
    <div class="memory"><h4>Memory</h4><p>${game.minimum_system_requirements.memory}</p></div>
    <div class="graphics"><h4>Graphics</h4><p>${game.minimum_system_requirements.graphics}</p></div>
    <div class="storage"><h4>Storage</h4><p>${game.minimum_system_requirements.storage}</p></div>
    </div>
    </div>`;
      gamesSectionElement.appendChild(requirementsEl);
    }
  } catch (error) {
    requirementsEl.innerHTML = `<h3>Minimal system Requirements <span>(${game.platform})</span></h3>
    <p class='warning'>The minimum system requirements for this game are currently not available.</p>`;
    gamesSectionElement.appendChild(requirementsEl);
  }
}

//showing detail about the game
function showingGameDetail(game) {
  gamesSectionElement.innerHTML = "";
  let gameDataEl = document.createElement("div");
  gameDataEl.className = "gameData";

  gameDataEl.innerHTML = `
    <div class="basic">
      <img src="${game.thumbnail}" alt="thumbnail" class="thumbnail">
      <div>
        <h1>${game.title}</h1>
        <p>${game.short_description}</p>
        <a href="${game.game_url}" target="_blank">PLAY NOW</a>
      </div>
    </div>
    <h3>About ${game.title}</h3>
    <div class="about">
      <p>${game.description}</p>
    </div>
    <h3>Additional Information</h3>
    <div class="info">
      <div class="title">
        <h4>Title</h4>
        <p>${game.title}</p>
      </div>
      <div class="developer">
        <h4>Developer</h4>
        <p>${game.developer}</p>
      </div>
      <div class="publisher">
        <h4>Publisher</h4>
        <p>${game.publisher}</p>
      </div>
      <div class="releaseDate">
        <h4>Release Date</h4>
        <p>${game.release_date}</p>
      </div>
      <div class="genre">
        <h4>Genre</h4>
        <p>${game.genre}</p>
      </div>
      <div class="platfrom">
        <h4>Platform</h4>
        <p>${game.platform}</p>
      </div>
    </div>`;
  gamesSectionElement.appendChild(gameDataEl);

  const thumbnailEl = document.querySelectorAll('.thumbnail');
  new simpleParallax(thumbnailEl, {overflow: true});
  showingScreenshots(game);
  showingRequirements(game);

  h1CategoryElement.innerHTML = "";
}
