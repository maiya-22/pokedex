START POKEMON CLASS
  class Pokemon {
    constructor(pokemonData) {
      //  to do: re-factor constructor, simplify, and remove duplicate data:
      this.allData = pokemonData;
      const { name, sprites, stats } = pokemonData;
      this.name = name;
      this.sprites = sprites;
      this.pic = this.sprites.front_default;
      this.stats = stats; // an array of objects
      // refactor, to add to stat object (now simpleStats)
      stats.forEach((stat) => {
        this[stat.stat.name] = stat.base_stat; // assign the name of the stat to be its base value
      });
      this.simpleStats = {
        // default stats that ever
        attack: this.attack || 'no attack',
        defense: this.defense || 'no defense',
        'special-attack': this['special-attack'] || 'no special attack',
        'special-defense': this['special-defense'] || 'no special defense',
        speed: this.speed || 'no speed',
        hp: this.hp || 'no hp',
      };
    }
    // Fetch the data from the api and return a promise:
    // pokemonObjectPromise(pokemonName) {
    //   const endpoint = pokemonName;
    //   return new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', `${this.baseUrl}/${pokemonName}/`);
    //     xhr.send();
    //     xhr.onload = function () {
    //       resolve(JSON.parse(xhr.responseText));
    //     };
    //     xhr.onerror = function () {
    //       reject(xhr.statusText);
    //     };
    //   });
    // }
    // // Use the pokemonObjectPromise to make an pokemon instance:
    // makePokemonInstancePromise(pokemonName) {
    //   return Pokemon.prototype.pokemonObjectPromise(pokemonName).then(pokemonObject =>
    //       new Promise((resolve, reject) => {
    //         // console.log('in the promise ... ');
    //         const newPokemon = new Pokemon(pokemonObject);
    //         resolve(newPokemon);
    //       }));
    // }
    // loopThroughSprites() {
    //   const { sprites } = this;
    //   // console.log(`${this.name}'s sprites: ${sprites}`);
    //   for (const sprite in sprites) {
    //     if (sprites.hasOwnProperty(sprite)) {
    //       // console.log(sprites[sprite]);
    //     }
    //   }
    // }
  }
  Pokemon.prototype.baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  Pokemon.prototype.pokemonGym = {};
  // END POKEMON CLASS

  // global variables:
  const search = document.getElementById('search');
  const pokemonDisplay = document.getElementById('pokemonDisplay');
  const floatingStats = document.getElementById('floatingStats');
  search.setAttribute('placeholder', 'waiting to load pokemon');
  // Object Classes:
  class Pokedex {
    constructor() {
      this.statOptions = {
        attack: false,
        defense: false,
        'special-attack': false,
        'special-defense': false,
        hp: false,
      };
    }
    toggleStatusOption(option) {
      this.statusOptions[option] = !this.statusOptions[option];
    }
  }
  const pokedex = new Pokedex();
  // Trainer class:
  class Trainer {
    constructor(name) {
      this.name = name;
      this.trainerGym = {};
    }
    get allPokemon() {
      const allPokemon = [];
      for (const pokemon in this.gym) {
        if (this.gym.hasOwnProperty(pokemon)) {
          allPokemon[allPokemon.length] = this.gym[pokemon];
        }
      }
      return allPokemon;
    }
    getPokemon(pokemonName) {
      return this.trainerGym[pokemonName];
    }
    get gym() {
      return this.trainerGym;
    }
    addPokemon() {
      // function to fetch a new pokemon and add it to the gym:
    }
  }
  const trainer = new Trainer('Chuck');

  const makePokemon = Pokemon.prototype.makePokemonInstancePromise;
  // INVOKING THE POKEMON PROMISE TO RETURN POKEMON OBJECTS:
  Promise.all([makePokemon('dragonair'), makePokemon('butterfree'), makePokemon('charmeleon')])
    .then((pokemon) => {
      // pokemon objects have arrived:
      // loop through the array of pokemon objects and create Pokemon instances
      // and add them to the pokemon gym:
      pokemon.forEach((pokie, index) => {
        // Pokemon gym property to hold all pokemon
        Pokemon.prototype.pokemonGym[pokie.name] = pokie;
        Pokemon.prototype.pokemonGym[pokie.name].gymDisplayOrder = index;
        // add pokemon to the trainer:
        trainer.gym[pokie.name] = pokie;
      });
      // create variables that point to the pokemon in the gym:
      const { dragonair, butterfree, charmeleon } = trainer.gym;
      // add gifs to pokemon instances:
      dragonair.gif = 'http://www.pokestadium.com/sprites/xy/dragonair-2.gif';
      butterfree.gif =
        'http://rs744.pbsrc.com/albums/xx87/jessstaardust/tumblr_n1234ahMHc1s2qnyjo1_250_zpsa8f9c122.gif~c200';
      charmeleon.gif =
        'https://orig00.deviantart.net/5293/f/2016/030/b/7/charmeleon_gif_by_queenaries-d9px7h5.gif';
      console.log(dragonair);
      // add a pokemon to the floating display:

      // want to put all of this code in the global scope:
      goButton.addEventListener('click', (evt) => {
        const pokemonName = document.getElementById('search').value.toLowerCase();
        const allNames = Object.keys(trainer.gym);
        if (allNames.includes(pokemonName)) {
          const pokemonObject = trainer.getPokemon(pokemonName);
          console.log('pokemon from trainer:', pokemonObject);
        }
        removePokemonFromScreen();
        console.log('looking for pokie');
        // addPokemonToScreen(pokemonName); //first function - rough draft
        const pokemonObject = trainer.gym[pokemonName];
        // displayPokemon(pokemonObject, pokemonName); // function to add all pokies
        // access the pokemon object
        // display the pokemon object on the screen:
      });

      function removePokemonFromScreen() {
        const pokedexPokemonDisplay = document.getElementById('pokedexPokemonDisplay');
        if (pokedexPokemonDisplay) {
          pokedexPokemonDisplay.classList.add('pokedexPokemonDisplayExit');
          setTimeout(() => {
            pokedexPokemonDisplay.remove();
          }, 1500);
        }

        console.log('pokedex: ', pokedexPokemonDisplay);
      }

      function addPokemonToScreen(pokemonName) {
        // add picture to display:
        const pokemonObject = trainer.getPokemon(pokemonName);
        const pixImg = document.createElement('img');
        pixImg.setAttribute('id', 'pokedexPokemonDisplay');
        pixImg.src = pokemonObject.pic;
        pokemonDisplay.appendChild(pixImg);

        // add gif to floating display:
        const floatingDisplay = document.getElementById('floatingDisplay');
        const img = document.createElement('img');
        img.setAttribute('src', pokemonObject.gif);
        img.classList.add('pokemonAppear');
        floatingDisplay.appendChild(img);

        // add stats:
        const stats = pokemonObject.stats;
        for (const stat in stats) {
          if (stats.hasOwnProperty) {
            const statDiv = document.createElement('div');
            statDiv.innerHTML = `${stats[stat].stat.name} : ${stats[stat].base_stat}`;
            const statButton = document.getElementById(stats[stat].stat.name);
            if (statButton) {
              statButton.innerHTML = `${stats[stat].stat.name} : ${stats[stat].base_stat}`;
            }
            // statButton.appendChild(statDiv);
            floatingStats.appendChild(statDiv);
            // console.log('STAT', stats[stat].stat.name);
            // console.log('STAT', stats[stat].base_stat);
          }
        }
      }
      // addPokemonToScreen(butterfree);

      // make search bar active:
      const searchWrap = document.getElementById('searchWrapInactive');
      if (searchWrap) {
        searchWrap.id = 'searchWrapActive';
        search.setAttribute('placeholder', 'the pokemon are in the gym');
      }
    })
    .catch((err) => {
      console.log(`error caught: ${err}`);
    });

  // GLOBAL OBJECTS:
  const pokemonPositions = ['dragonair', 'butterfree', 'decidueye'];
  const selectedIndex = 0;

  // DOM ELEMENTS:
  const forwardArrowButton = document.getElementById('forward');
  const backwardArrowButton = document.getElementById('backward');
  const goButton = document.getElementById('goButton');
  // DOM EVENT-LISTENERS:
  // forwardArrowButton.addEventListener('click', () => {
  //   // change view to pokemon to the right:
  //   // trigger click-sound
  // });
  // forwardArrowButton.addEventListener('click', () => {
  //   // change view to pokemon to the left:
  //   // trigger click-sound
  // });
  // gets a pokemon and displays it:

  const pokedexWrap = document.getElementById('pokedexWrap');
  pokedexWrap.addEventListener('click', (e) => {
    const target = e.target;
    const data = target.getAttribute('data');
    target.classList.add('pressed');
    // console.log(target);
  });

  // ANIMATION TO DISPLAY POKEMON
  function displayPokemon(pokemonObject) {
    const pokemonName = pokemonObject.name;
    console.log(pokemonObject, pokemonName);
    // display pic in pokedex:
    // display stats in pokedex
    // display giff animation
    // display stats animation

    const { simpleStats } = pokemonObject;
    renderStats(simpleStats, pokemonName);
    function renderStats(stats, pokemonName) {
      const container = document.getElementById('floatingStats');
      // const title = document.createElement('h1');
      // const formattedName = pokemonName[0].toUpperCase() + pokemonName.slice(1).toLowerCase();
      // const possessive = formattedName[formattedName.length - 1] === 's' ? '' : 's';
      // title.innerHTML = `${formattedName}'${possessive} stats:`;
      // container.prepend(title);
      const statsWrap = container.querySelector('#statsWrap');
      const statNames = Object.keys(stats);
      // loop over statNames and create html for each stat:
      statNames.forEach((stat) => {
        console.log(stat);
        // make a statWrap for each stat and add everything to it:
        const statWrap = document.createElement('div');
        statWrap.classList.add('statWrap');
        statWrap.setAttribute('id', `${stat}Wrap`);

        const statLabel = document.createElement('div');
        statLabel.innerHTML = stat;
        statWrap.appendChild(statLabel);

        const statBarWrap = document.createElement('div');
        statBarWrap.classList.add('statBarWrap');
        // add boxes inside of the statBarWrap:
        console.log('statBarWrap: ', statBarWrap);
        for (let i = 0; i < simpleStats[stat]; i++) {
          // if (i < simpleStats[stat]) {
          setTimeout(() => {
            const statBox = document.createElement('div');
            statBox.classList.add('statBox');
            statBarWrap.appendChild(statBox);

            if (i === simpleStats[stat] - 1) {
              setTimeout(() => {
                const statNumberBox = document.createElement('div');
                statNumberBox.classList.add('statNumberBox');
                statNumberBox.innerHTML = stats[stat];
                statBarWrap.appendChild(statNumberBox);
              }, 20);
            }
          }, i * 20);
          // }
          statWrap.appendChild(statBarWrap);
        }

        // and end of loop:
        statsWrap.appendChild(statWrap);
      });
    }
  }
