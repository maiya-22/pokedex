/* eslint func-names: 0,  no-unused-vars: 0, no-alert: 0, class-methods-use-this: 0 , no-plusplus: 0 , indend: 0 , no-restricted-syntax: 0 , no-use-before-define: 0 , no-loop-func: 0, func-names: 0, space-before-blocks: 0, indent: 0 */
$(() => {
  // set up DOM:
  backgroundAnimation();
  const globalV = 'true';
  console.log('globalV: ', globalV);
  // Pokemon class:
  class Pokemon {
    constructor(name, stats, abilities, pic, sprites, gif = 'no giff') {
      this.name = name;
      this.stats = stats;
      this.abilities = abilities;
      this.gif = gif;
      this.pic = pic;
      this.sprites = sprites;
    }
    makePokemonInstance(pokemonObject, gif) {
      // console.log(pokemonObject);
      const { name, stats, abilities } = pokemonObject;
      const reformattedStats = {};
      stats.forEach((stat) => {
        reformattedStats[stat.stat.name] = stat.base_stat;
      });
      const reformattedAbilities = [];
      abilities.forEach((ability) => {
        reformattedAbilities.push(ability.ability.name);
      });
      const pic = pokemonObject.sprites.front_default;
      const sprites = {};
      sprites.front = pic;
      sprites.back = pokemonObject.sprites.back_default;
      return new Pokemon(name, reformattedStats, reformattedAbilities, pic, sprites, gif);
    }
    get abilities() {
      return this.abilities;
    }
  }

  class Trainer {
    constructor(trainerName) {
      this.trainerName = trainerName;
      this.gym = {};
    }
    // Fetch the data from the api and return a promise:
    getPokemonPromise(pokemonName) {
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
  }
  Trainer.prototype.baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  Trainer.prototype.get = Trainer.prototype.getPokemonPromise;

  const trainer = new Trainer('Chuck');
  // console.log(trainer);

  // click button to pre-load my three pokemon and add to trainer gym:
  const preLoadPokemonButton = document.getElementById('preLoadPokemon');
  preLoadPokemonButton.addEventListener('click', () => {
    console.log('clicked');
    Trainer.prototype
      .getPokemonPromise('dragonair')
      .then((pokemon) => {
        console.log('pokemon', pokemon);

        // trainer.gym = Pokemon.prototype.makePokemonInstance(pokemon);

        return Trainer.prototype.getPokemonPromise('butterfree');
      })
      .then((pokemon) => {
        console.log(pokemon);
        // const pokemonName = pokemon.name;
        // console.log('pokemonName:', pokemonName);
        // trainer.gym[pokemonName] = Pokemon.prototype.makePokemonInstance(pokemon);
        return Trainer.prototype.getPokemonPromise('charmeleon');
      })
      .then((pokemon) => {
        console.log(pokemon);
        // trainer.gym.sup = Pokemon.prototype.makePokemonInstance(pokemon);
        // console.log(trainer.gym);
      })
      .catch((err) => {
        // console.log(`${err} caught in initial loading pokemon promise`);
      });
  });

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
    // elements that will alternate fading in and out
    let imageOne = document.getElementById('one');
    let imageTwo = document.getElementById('two');
    setSource(imageOne, starterImage);
    makeDisplayedState(imageOne);
    setSource(imageTwo, starterImageTwo);
    let round = 0; // current cycle number running
    const rounds = 'infinite'; // imageFiles.length; //the total # of rounds or cycles to run
    let count = 0;
    let time = 0; // for the setTimeOut functions
    const transitionTime = 2000; // time for images fading in and out
    const displayTime = 500; // time for image to have full display
    // run first cycle, because interval is spaced for time of slideshow
    showCycle();
    //  then do invoke the cycle on setInterval
    const setIntervalFunction = setInterval(() => {
      showCycle();
    }, transitionTime + displayTime);
    function showCycle() {
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
