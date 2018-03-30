/* eslint func-names: 0,  no-unused-vars: 0, no-alert: 0, class-methods-use-this: 0 , no-plusplus: 0 , indend: 0 , no-restricted-syntax: 0 , no-use-before-define: 0 , no-loop-func: 0, func-names: 0, space-before-blocks: 0, indent: 0, max-len: 0 */
$(() => {
  // set up DOM:
  backgroundAnimation();
  const searchButton = document.getElementById('search');
  const pokemonDisplay = document.getElementById('pokemonDisplay');

  // console.log('globalV: ', globalV);
  // Pokemon class:
  class Pokemon {
    constructor(pokemonName, stats, abilities, pic, sprites, gif = null) {
      this.pokemonName = pokemonName;
      this.stats = stats;
      this.abilities = abilities;
      this.gif = gif;
      this.pic = pic;
      this.sprites = sprites;
    }
    getAbilities() {
      return this.abilities;
    }
  }
  Pokemon.prototype.gifs = {
    dragonair: 'http://www.pokestadium.com/sprites/xy/dragonair-2.gif',
    butterfree:
      'http://rs744.pbsrc.com/albums/xx87/jessstaardust/tumblr_n1234ahMHc1s2qnyjo1_250_zpsa8f9c122.gif~c200',
    charmeleon:
      'https://orig00.deviantart.net/5293/f/2016/030/b/7/charmeleon_gif_by_queenaries-d9px7h5.gif',
  };
  //  to do: put makePokemonInstance function on Pokemon.prototype
  function makePokemonInstance(pokemonObject, gif) {
    const abilities = pokemonObject.abilities;
    const pokemonName = pokemonObject.name;
    const stats = pokemonObject.stats;
    console.log('stats in makeInstance func:', stats);
    console.log('abilities in makeInstance func: ', abilities);
    console.log('pokemon object in makeInstance func', pokemonObject);
    const reformattedStats = {};
    stats.forEach((stat) => {
      reformattedStats[stat.stat.name] = stat.base_stat;
    });
    const reformattedAbilities = [];
    abilities.forEach((ability) => {
      reformattedAbilities.push(ability.ability.name);
    });
    console.log(reformattedAbilities);
    const pic = pokemonObject.sprites.front_default;
    const sprites = {};
    sprites.front = pic;
    sprites.back = pokemonObject.sprites.back_default;
    return new Pokemon(pokemonName, reformattedStats, reformattedAbilities, pic, sprites, gif);
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
  console.log(trainer);
  // click button to pre-load my three pokemon and add to trainer gym:
  //  once the pokemon are loaded, the search-bar will become active:
  const preLoadPokemonButton = document.getElementById('preLoadPokemon');
  preLoadPokemonButton.addEventListener('click', () => {
    console.log("Fetch trainer's pokemon clicked");
    // to do: grab search bar and change placeholder-text to 'waiting for pokemon to arrive'
    Trainer.prototype
      .getPokemonPromise('dragonair')
      .then((pokemon) => {
        console.log('pokemon', pokemon);
        const gif = Pokemon.prototype.gifs[pokemon.name] || null;
        trainer.gym[pokemon.name] = makePokemonInstance(pokemon, gif);
        // console.log(trainer);
        return Trainer.prototype.getPokemonPromise('butterfree');
      })
      .then((pokemon) => {
        console.log('data', pokemon);
        const pokemonName = 'butterfree';
        // console.log('pokemonName:', pokemonName);
        const gif = Pokemon.prototype.gifs[pokemon.name] || null;
        trainer.gym[pokemonName] = makePokemonInstance(pokemon, gif);
        return Trainer.prototype.getPokemonPromise('charmeleon');
      })
      .then((pokemon) => {
        console.log('data2', pokemon);
        const pokemonName = pokemon.name;
        const gif = Pokemon.prototype.gifs[pokemon.name] || null;
        trainer.gym[pokemonName] = makePokemonInstance(pokemon, gif);
        console.log('trainer.gym', trainer.gym);
        // make search bar active, now that pokemon have arrived:
        // make search bar active:
        const searchWrap = document.getElementById('searchWrapInactive');
        if (searchWrap) {
          searchWrap.id = 'searchWrapActive';
          searchButton.setAttribute('placeholder', 'the pokemon are in the gym');
        }
      })
      .catch((err) => {
        console.log(`${err} caught in initial loading pokemon promise`);
      });
  });
  // enter pokemon name in search bar and click the "go" button to display a pokemon that is in the gym:
  // #working on now:
  const goButton = document.getElementById('goButton');
  goButton.addEventListener('click', () => {
    const pokemonName = document.getElementById('search').value.toLowerCase();
    console.log('pokemonName in goButton event: ', pokemonName);
    const allNames = Object.keys(trainer.gym);
    if (allNames.includes(pokemonName)) {
      Pokemon.prototype.renderPokemon(pokemonName);
    } else {
      // render a prompt to the DOM:
      // alert(`please enter one of these names: ${allNames.join(' ')}`);
    }
  });
  // to do: put this function closer to Pokemon class:
  Pokemon.prototype.removePokemonFromDisplay = function () {
    // remove from pokedex display:
    // to do: fix timing on this:
    const pokedexDisplayPic = document.getElementById('pokemonPic');
    if (pokedexDisplayPic) {
      pokedexDisplayPic.classList.add('pokedexPokemonDisplayExit');
      setTimeout(() => {
        pokedexDisplayPic.remove();
      }, 1500);
    }
    const floatingImage = document.getElementById('floatingGifImage');
    if (floatingImage) {
      const floatingImageParent = floatingImage.parentNode;
      // alert(floatingImageParent);
      floatingImageParent.removeChild(floatingImage);
      // console.log('floatingImage: ', floatingImage);
      // add an exit animation with a duration
      // setTimeout for that duration, and remove the image from DOM:
      // floatingImage.remove();
    }
    // remove from stats:
    // <div id="floatingStats" permanent in html
    //  <div id="statsWrap" permanent in html:
    // <statWrap id="statName" --> one added for each stat
    const statsWrap = document.getElementById('statsWrap');
    console.log('** statsWrap: ', statsWrap);
    // add a class to fade out the children of the statsWrap
    // setTimeout to length of fade out:
    statsWrap.innerHTML = '';
  };
  // to do: put this closer to the Pokemon class:
  // to do: re-factor, so that it renders from an instance,
  // instead of passing object as param:
  // function to render the selected pokemon to the screen:
  Pokemon.prototype.renderPokemon = function (pokemonName) {
    const pokemonObject = trainer.gym[pokemonName];
    console.log('pokemon Object in renderPokemon', pokemonObject);
    // remove current pokemon from screen:
    Pokemon.prototype.removePokemonFromDisplay();
    // render pic to pokedex display:
    const pixImg = document.createElement('img');
    pixImg.setAttribute('id', 'pokemonPic');
    pixImg.src = pokemonObject.pic;
    pokemonDisplay.appendChild(pixImg);
    console.log('pixImg: ', pixImg);
    // see which stats are active:

    // render stats to floating stats display:
    // <div id='floatingStats
    //    <div id='statsWrap

    // render gif to floating display
    const floatingDisplay = document.getElementById('floatingDisplay');
    const img = document.createElement('img');
    img.setAttribute('id', 'floatingGifImage');
    img.setAttribute('src', pokemonObject.gif);
    img.classList.add('pokemonAppear');
    floatingDisplay.appendChild(img);

    // pasting in code from before re-factor:
    const { stats } = pokemonObject;
    renderStats(stats, pokemonName);
    function renderStats(stats, pokemonName) {
      // to do: this element might nnot be necessary:
      const container = document.getElementById('floatingStats');
      // console.log('** container: ', container);
      // const title = document.createElement('h1');
      // const formattedName = pokemonName[0].toUpperCase() + pokemonName.slice(1).toLowerCase();
      // const possessive = formattedName[formattedName.length - 1] === 's' ? '' : 's';
      // title.innerHTML = `${formattedName}'${possessive} stats:`;
      // container.prepend(title);

      // GET THE STATS WRAP DIV FROM THE DOM
      const statsWrap = document.querySelector('#statsWrap');
      // console.log('** statsWrap: ', statsWrap);
      // console.log('** stats: ', stats);
      const statNames = Object.keys(stats);

      // loop over statNames and create html for each stat:
      statNames.forEach((stat) => {
        console.log(stat);
        // make a statWrap for each stat and add everything to it:
        const statWrap = document.createElement('div');
        statWrap.classList.add('statWrap');
        // statWrap.setAttribute('id', `${stat}Wrap`);
        statWrap.setAttribute('id', 'statTitle');

        const statLabel = document.createElement('div');
        statLabel.setAttribute('id', 'statLabel');
        statLabel.innerHTML = `${stat}:  `;
        statWrap.appendChild(statLabel);

        const statBarWrap = document.createElement('div');
        statBarWrap.classList.add('statBarWrap');
        // add boxes inside of the statBarWrap:
        console.log('statBarWrap: ', statBarWrap);
        for (let i = 0; i < stats[stat]; i++) {
          // if (i < simpleStats[stat]) {
          setTimeout(() => {
            const statBox = document.createElement('div');
            statBox.classList.add('statBox');
            statBarWrap.appendChild(statBox);

            if (i === stats[stat] - 1) {
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
  };

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
