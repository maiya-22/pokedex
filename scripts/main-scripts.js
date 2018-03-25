/* eslint func-names: 0,  no-unused-vars: 0, no-alert: 0, class-methods-use-this: 0 , no-plusplus: 0 */
$(() => {
  // POKEMON CLASS
  class Pokemon {
    constructor(name, stats) {
      this.name = name;
      this.stats = stats;
      // this.hp = hp; // number'
      // this.attack = attack;
      // this.defense = defense;
    }
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
    makePokemonInstance(pokemonName) {
      Pokemon.prototype.pokemonObjectPromise(pokemonName).then((pokemonObject) => {
        const { name, stats } = pokemonObject;

        // console.log('pokemonObject: ', pokemonObject);
        // console.log('pokemonObject.name: ', pokemonObject.name);
        // console.log('pokemonObject.stats ', stats);
        // stats.forEach((stat) => {
        //   console.log('stat: ', stat);
        // });
      });
    }
  }
  Pokemon.prototype.baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  Pokemon.prototype.makePokemonInstance('dragonair');

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
