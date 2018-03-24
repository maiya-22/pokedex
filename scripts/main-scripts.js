/* eslint func-names: 0,  no-unused-vars: 0, no-alert: 0 */
$(() => {
  // 'https://pokeapi.co/api/v2/pokemon'

  // const pokemon = 'pikachu';

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

  // #POKEMON API CODE:
  const pokemonDisplay = document.getElementById('pokemonDisplay');
  console.log(pokemonDisplay);
  // select an item and assign a click function to it:
  const goButton = document.getElementById('goButton');
  goButton.addEventListener('click', (evt) => {
    // $.ajax()
    const pokemonName = document.getElementById('search').value;
    console.log(pokemonName);
    // pokemonName = pokemonName.toLowerCase();
    // console.log(pokemonName);
  });

  // make a list of stats to find and also change color of buttons when clicked:
  //   const statButtons = document.querySelectorAll('#pokemonStats div');
  //   const statQuery = {
  //     name: false,
  //     power: false,
  //   };
  const pokedexWrap = document.getElementById('pokedexWrap');
  pokedexWrap.addEventListener('click', (e) => {
    const target = e.target;
    const data = target.getAttribute('data');
    target.classList.add('pressed');
    // console.log(target);
  });

  const backgroundImages = '0001 0002 0003 0004'.split(' ').map(imageName => `${imageName}.jpg`);

  // #SET STYLE CODE:
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
    console.log('element: ', element);
    alert(element);
  });

  // https://pokeapi.co/api/v2/pokemon/bulbasaur/

  class Pokemon {
    constructor(name, hp, attack, defense) {
      this.name = name;
      this.hp = hp; // number'
      this.attack = attack;
      this.defense = defense;
    }
    getPokemonByName(name) {
      this.makeRequest(this.name);
    }
    makeRequest(query) {
      const request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            // const myData = request.responseText;
            console.log(data);
            // console.log('status 200.');
            // console.log('request.responseText:', request.responseText);
            // alert(`${request.status} ${request.statusText}`);
          } else {
            alert('there was some error');
          }
        }
      };
      const endpoint = query || 'squirtle';
      request.open('GET', `${this.baseUrl}/${endpoint}/`);
      request.send();
    }
  }
  Pokemon.prototype.baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  const testPokemon = new Pokemon();
  console.log(testPokemon.baseUrl);

  testPokemon.makeRequest();
});
