/* eslint func-names: 0,  no-unused-vars: 0, no-alert: 0, class-methods-use-this: 0 , no-plusplus: 0 , indend: 0 */
$(() => {
  // GLOBAL VARIABLES:
  const search = document.getElementById('search');
  search.setAttribute('placeholder', 'waiting to load pokemon');
  // Pokemon class:
  class Pokemon {
    constructor(pokemonData) {
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
          console.log('in the promise ... ');
          const newPokemon = new Pokemon(pokemonObject);
          resolve(newPokemon);
        }));
    }
  }
  Pokemon.prototype.baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  // Where the pokemon instances are stored:
  Pokemon.prototype.pokemonGym = {};
  const makePokemon = Pokemon.prototype.makePokemonInstancePromise;
  // INVOKING THE POKEMON PROMISE TO RETURN POKEMON OBJECTS:
  Promise.all([makePokemon('dragonair'), makePokemon('butterfree'), makePokemon('decidueye')]).then((pokemon) => {
    // loop through the array of pokemon objects and create Pokemon instances
    pokemon.forEach((pokie, index) => {
      Pokemon.prototype.pokemonGym[pokie.name] = pokie;
      Pokemon.prototype.pokemonGym[pokie.name].gymDisplayOrder = index;
    });
    console.log('pokemonGym: ', Pokemon.prototype.pokemonGym);
    const { dragonair, butterfree, decidueye } = Pokemon.prototype.pokemonGym;
    // const floatingDisplay = document.getElementById('floatingDisplay');
    // const img = document.createElement('img');
    // img.setAttribute('src', decidueye.pic);
    // img.classList.add('pokemonAppear');
    // floatingDisplay.appendChild(img);

    const searchWrap = document.getElementById('searchWrapInactive');
    if (searchWrap) {
      searchWrap.id = 'searchWrapActive';
      search.setAttribute('placeholder', 'the pokemon are in the gym');
    }
  });

  // GLOBAL OBJECTS:
  const pokemonPositions = ['dragonair', 'butterfree', 'decidueye'];
  const selectedIndex = 0;

  // #POKEMON API CODE:
  const pokemonDisplay = document.getElementById('pokemonDisplay');
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
