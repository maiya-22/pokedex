/* eslint func-names: 0,  no-unused-vars: 0, no-alert: 0, class-methods-use-this: 0 , no-plusplus: 0 , indend: 0 , no-restricted-syntax: 0 */
$(() => {
  // GLOBAL VARIABLES:
  const search = document.getElementById('search');
  const pokemonDisplay = document.getElementById('pokemonDisplay');
  const floatingStats = document.getElementById('floatingStats');
  search.setAttribute('placeholder', 'waiting to load pokemon');
  // Pokemon class:
  class Pokemon {
    constructor(pokemonData) {
      this.allData = pokemonData;
      const { name, sprites, stats } = pokemonData;
      this.name = name;
      this.sprites = sprites;
      this.pic = this.sprites.front_default;
      this.stats = stats; // an array of objects
      stats.forEach((stat) => {
        this[stat.stat.name] = stat.base_stat; // assign the name of the stat to be its base value
      });
    }
    // Fetch the data from the api and return a promise:
    pokemonObjectPromise(pokemonName) {
      const endpoint = pokemonName;
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${this.baseUrl}/${pokemonName}/`);
        xhr.send();
        xhr.onload = function () {
          resolve(JSON.parse(xhr.responseText));
        };
        xhr.onerror = function () {
          reject(xhr.statusText);
        };
      });
    }
    // Use the pokemonObjectPromise to make an pokemon instance:
    makePokemonInstancePromise(pokemonName) {
      return Pokemon.prototype.pokemonObjectPromise(pokemonName).then(pokemonObject =>
        new Promise((resolve, reject) => {
          // console.log('in the promise ... ');
          const newPokemon = new Pokemon(pokemonObject);
          resolve(newPokemon);
        }));
    }
    loopThroughSprites() {
      const { sprites } = this;
      console.log(`${this.name}'s sprites: ${sprites}`);
      for (const sprite in sprites) {
        if (sprites.hasOwnProperty(sprite)) {
          console.log(sprites[sprite]);
        }
      }
    }
  }
  Pokemon.prototype.baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  Pokemon.prototype.pokemonGym = {};
  const makePokemon = Pokemon.prototype.makePokemonInstancePromise;
  // INVOKING THE POKEMON PROMISE TO RETURN POKEMON OBJECTS:
  Promise.all([makePokemon('dragonair'), makePokemon('butterfree'), makePokemon('charmeleon')])
    .then((pokemon) => {
      // pokemon objects have arrived:

      // loop through the array of pokemon objects and create Pokemon instances
      // and add them to the pokemon gym:
      pokemon.forEach((pokie, index) => {
        Pokemon.prototype.pokemonGym[pokie.name] = pokie;
        Pokemon.prototype.pokemonGym[pokie.name].gymDisplayOrder = index;
      });

      // create variables that point to the pokemon in the gym:
      console.log('pokemonGym: ', Pokemon.prototype.pokemonGym);
      const { dragonair, butterfree, charmeleon } = Pokemon.prototype.pokemonGym;

      // add gifs to pokemon instances:
      dragonair.gif = 'http://www.pokestadium.com/sprites/xy/dragonair-2.gif';
      butterfree.gif =
        'http://rs744.pbsrc.com/albums/xx87/jessstaardust/tumblr_n1234ahMHc1s2qnyjo1_250_zpsa8f9c122.gif~c200';
      charmeleon.gif =
        'https://orig00.deviantart.net/5293/f/2016/030/b/7/charmeleon_gif_by_queenaries-d9px7h5.gif';

      // add a pokemon to the floating display:

      function addPokemonToScreen(pokemonObject) {
        // add picture to display:
        const pixImg = document.createElement('img');
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
            console.log('STAT', stats[stat].stat.name);
            // console.log('STAT', stats[stat].base_stat);
          }
        }
      }
      addPokemonToScreen(butterfree);

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

  // #POKEMON API CODE:
  // const pokemonDisplay = document.getElementById('pokemonDisplay');
  // console.log(pokemonDisplay);
  // select an item and assign a click function to it:
  const goButton = document.getElementById('goButton');
  goButton.addEventListener('click', (evt) => {
    // $.ajax()
    const pokemonName = document.getElementById('search').value.toLowerCase();
    // console.log(pokemonName);
  });

  const pokedexWrap = document.getElementById('pokedexWrap');
  pokedexWrap.addEventListener('click', (e) => {
    const target = e.target;
    const data = target.getAttribute('data');
    target.classList.add('pressed');
    // console.log(target);
  });

  const backgroundImages = '0001 0002 0003 0004'.split(' ').map(imageName => `${imageName}.jpg`);

  // #SET POP-DOWN BOX CODE:
  const button = document.getElementById('set-style');
  // re-factor this as reusable function:
  const containerElements = 'frame one two three four five six'.split(' ');
  const elementSelector = document.getElementById('select-element');
  containerElements.forEach((element, index) => {
    const newSelect = document.createElement('option');
    newSelect.innerHTML = element;
    newSelect.setAttribute('value', element);
    elementSelector.appendChild(newSelect);
  });

  const classNames = 'this that and the other'.split(' ');
  const classSelector = document.getElementById('select-class');
  classNames.forEach((className, index) => {
    const newSelect = document.createElement('option');
    newSelect.innerHTML = className;
    newSelect.setAttribute('value', className);
    classSelector.appendChild(newSelect);
  });

  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    const selectedElement = document.getElementById('select-element');
    const selectClassName = document.getElementById('select-class');
    const elementId = selectedElement.value;
    const element = document.getElementById(elementId);
    // console.log('element: ', element);
    alert(element);
  });

  // https://pokeapi.co/api/v2/pokemon/bulbasaur/

  // create pokemon instance:

  // display profile pic

  // display stats
});
