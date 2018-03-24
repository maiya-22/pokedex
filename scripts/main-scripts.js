/* eslint func-names: 0,  no-unused-vars: 0, no-alert: 0 */
$(() => {
  // POKEMON CLASS
  class Pokemon {
    constructor(name, hp, attack, defense) {
      this.name = name;
      // this.hp = hp; // number'
      // this.attack = attack;
      // this.defense = defense;
    }
    fetchPokemonObject(pokemonName) {
      const makeErrorGoAway = this.name;
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`,
        dataType: 'json',
        success(data) {
          console.log('data ', data);
          return data;
        },
        error() {
          console.log('ERROR');
        },
      });
    }
    makePokemonInstance(pokemonName) {
      const pokemonInstance = new Pokemon(pokemonName);
      console.log('pokemonInstance: ', pokemonInstance);
    }

    // create pokemon instance:

    // display profile pic

    // display stats

    // $.ajax({
    //   url: 'https://pokeapi.co/api/v2/pokemon/',
    //   // dataType: 'jsonp',
    //   success(data) {
    //     const pokemonName = data.results;
    //     console.log('pokemon name: ', data);

    //     //
    //   },
    //   error() {
    //     console.log('ERROR!');
    //   },
    // });

    makeVanillaJSRequestPractice(pokemonName) {
      const request = new XMLHttpRequest();
      const endpoint = pokemonName || this.name || 'squirtle';
      request.open('GET', `${this.baseUrl}/${endpoint}/`);
      request.send();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            // success function:
            const data = JSON.parse(request.responseText);
            const picUrl = data.sprites.front_default;

            const floatingDisplay = document.getElementById('floatingDisplay');
            const profilePic = document.createElement('img');
            profilePic.src = picUrl;
            profilePic.style.width = '100%';
            floatingDisplay.appendChild(profilePic);
            // console.log(picUrl, profilePic, floatingDisplay);

            // console.log(data);
          } else {
            // if there is an error:
            alert('there was some error');
            // console.log('error message: ', request.statusText);
          }
        }
      };
    }
  }
  Pokemon.prototype.baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  // Make pokemon instance from prototype:
  Pokemon.prototype.makePokemonInstance('dragonair');

  // MAKE POKEMON INSTANCES:
  const dragonair = new Pokemon('dragonair');
  //  console.log(dragonair.baseUrl);
  // dragonair.makeVanillaJSRequestPractice();
  dragonair.fetchPokemonObject('dragonair');
  // 'https://pokeapi.co/api/v2/pokemon'

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
});
