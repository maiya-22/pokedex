/* eslint func-names: 0,  no-unused-vars: 0, no-alert: 0, class-methods-use-this: 0 , no-plusplus: 0 , indend: 0 , no-restricted-syntax: 0 , no-use-before-define: 0 , no-loop-func: 0, func-names: 0, space-before-blocks: 0, indent: 0 */
$(() => {
  // GLOBAL VARIABLES:
  // invoke global functions:
  // backgroundAnimation();
  // global varibles:
  const search = document.getElementById('search');
  const pokemonDisplay = document.getElementById('pokemonDisplay');
  const floatingStats = document.getElementById('floatingStats');
  search.setAttribute('placeholder', 'waiting to load pokemon');
  // DOM event-listeners

  // Object Classes:
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
      this.simpleStats = {
        attack: this.attack || 'no attack',
        defense: this.defense || 'no defense',
        'special-attack': this['special-attack'] || 'no special attack',
        'special-defense': this['special-defense'] || 'no special defense',
        speed: this.speed || 'no speed',
      };
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
      // console.log(`${this.name}'s sprites: ${sprites}`);
      for (const sprite in sprites) {
        if (sprites.hasOwnProperty(sprite)) {
          // console.log(sprites[sprite]);
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
        // Pokemon gym property to hold all pokemon
        Pokemon.prototype.pokemonGym[pokie.name] = pokie;
        Pokemon.prototype.pokemonGym[pokie.name].gymDisplayOrder = index;
        // add pokemon to the trainer:
        trainer.gym[pokie.name] = pokie;
      });
      // create variables that point to the pokemon in the gym:
      const { dragonair, butterfree, charmeleon } = trainer.gym;
      // add gifs to pokemon instances:
      // dragonair.gif = 'http://www.pokestadium.com/sprites/xy/dragonair-2.gif';
      // butterfree.gif =
      //   'http://rs744.pbsrc.com/albums/xx87/jessstaardust/tumblr_n1234ahMHc1s2qnyjo1_250_zpsa8f9c122.gif~c200';
      // charmeleon.gif =
      //   'https://orig00.deviantart.net/5293/f/2016/030/b/7/charmeleon_gif_by_queenaries-d9px7h5.gif';
      console.log(dragonair);
      // add a pokemon to the floating display:

      // want to put all of this code in the global scope:
      goButton.addEventListener('click', (evt) => {
        const pokemonName = document.getElementById('search').value.toLowerCase();
        const allNames = Object.keys(trainer.gym);
        if (allNames.includes(pokemonName)) {
          const pokie = trainer.getPokemon(pokemonName);
          // console.log(pokie);
        }
        removePokemonFromScreen();
        addPokemonToScreen(pokemonName);
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
  forwardArrowButton.addEventListener('click', () => {
    // change view to pokemon to the right:
    // trigger click-sound
  });
  forwardArrowButton.addEventListener('click', () => {
    // change view to pokemon to the left:
    // trigger click-sound
  });
  // gets a pokemon and displays it:

  const pokedexWrap = document.getElementById('pokedexWrap');
  pokedexWrap.addEventListener('click', (e) => {
    const target = e.target;
    const data = target.getAttribute('data');
    target.classList.add('pressed');
    // console.log(target);
  });

  // ANIMATION TO DISPLAY POKEMON
  function displayPokemon(pokemonName) {
    // display pic in pokedex:
    // display stats in pokedex
    // display giff animation
    // display stats animation
  }

  // BACKGROUND ANIMATION:
  function backgroundAnimation() {
    // make an array of the file-names in the folder:
    const numberOfImageFiles = 11;
    const imageFiles = [];
    const rootFileName = 'img-000';
    for (let i = 2; i < numberOfImageFiles; i++) {
      const fileName = `${rootFileName}${i}`;
      imageFiles[imageFiles.length] = fileName;
    }
    // first two files that animation will start with:
    const starterImage = 'black-image';
    const starterImageTwo = 'img-0001';
    let imageIndex = 0;
    let imageOne = document.getElementById('one');
    let imageTwo = document.getElementById('two');
    setSource(imageOne, starterImage);
    makeDisplayedState(imageOne);
    setSource(imageTwo, starterImageTwo);
    let round = 0;
    const rounds = 'infinite'; // imageFiles.length; //the total # of rounds or cycles to run
    let count = 0;
    let time = 0;
    const transitionTime = 2000;
    const displayTime = 500;
    // run first cycle, because interval is spaced for time of slideshow
    showCycle();
    const setIntervalFunction = setInterval(() => {
      showCycle();
    }, transitionTime + displayTime);
    function showCycle() {
      // console.log(`round ${round}.  ImageOne: `, imageOne);
      // console.log(`round ${round}.  ImageTwo: `, imageTwo);
      count++;
      // timeOne:
      time += transitionTime;
      setTimeout(() => {
        makeHidingState(imageOne);
        const fileName = imageFiles[imageIndex];
        setSource(imageTwo, fileName);
        makeShowingState(imageTwo);
        imageIndex++;
        imageIndex = imageIndex === imageFiles.length ? 0 : imageIndex;
      }, time);
      time += transitionTime;
      // timeTwo
      setTimeout(() => {
        makeHiddenState(imageOne);
        makeDisplayedState(imageTwo);
      }, time);
      time += displayTime;
      // timeThree
      setTimeout(() => {
        // switch the images:
        const tempImageElementHolder = imageOne;
        imageOne = imageTwo;
        imageTwo = tempImageElementHolder;
        round++;
        // if rounds is 'infinite' don't clear the interval
        if (rounds !== 'infinite' && round === rounds - 1) {
          clearInterval(setIntervalFunction);
        }
      }, time + 1);
    }
    function setSource(divElement, fileName, format = 'png') {
      const path = `images/pokemon-preview/${fileName}.${format}`;
      // imageElement.setAttribute('src', path);
      // document.body.style.backgroundImage = "url('img_tree.png')";
      divElement.style.backgroundImage = `url('${path}')`;
      // console.log('divElement: ', divElement);
      // divElement.style.backgroundSize = `contain`;
    }
    function makeHiddenState(imageElement) {
      // remove all other classes of state:
      removeAllStatesExcept(imageElement, 'hidingState');
      imageElement.classList.add('hiddenState');
      imageElement.classList.remove('hidingState');
    }
    function makeShowingState(imageElement) {
      removeAllStatesExcept(imageElement, 'hiddenState');
      imageElement.classList.add('showingState');
      // imageElement.classList.remove('hiddenState');
    }
    function makeDisplayedState(imageElement) {
      removeAllStatesExcept(imageElement, 'showingState');
      imageElement.classList.add('displayedState');
      imageElement.classList.remove('showingState');
    }
    function makeHidingState(imageElement) {
      removeAllStatesExcept(imageElement, 'displayedState');
      imageElement.classList.add('hidingState');
      imageElement.classList.remove('displayedState');
    }
    function removeAllStatesExcept(imageElement, exception) {
      // console.log('classList:', imageElement.classList);
      if (imageElement.classList) {
        if (exception !== 'displayedState') imageElement.classList.remove('displayedState');
        if (exception !== 'hiddenState') imageElement.classList.remove('hiddenState');
        if (exception !== 'showingState') imageElement.classList.remove('showingState');
        if (exception !== 'hidingState') imageElement.classList.remove('hidingState');
      }
    }
  }
});
