/* eslint func-names: 0  no-unused-vars: 0 */
$(() => {
  console.log('connected');
  const pokemonDisplay = document.getElementById('pokemonDisplay');
  console.log(pokemonDisplay);
  // select an item and assign a click function to it:
  const goButton = document.getElementById('goButton');
  goButton.addEventListener('click', (evt) => {
    // $.ajax()
    let name = document.getElementById('search').value;
    name = name.toLowerCase();
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
    console.log(target);
  });

  const backgroundImages = '0001 0002 0003 0004'.split(' ').map(imageName => `${imageName}.jpg`);
  // how to animate the background-source?
  //   const body = document.getElementsByTagName('body');
  //   body.syle.background
  //   document.getElementByID("divtest").style.backgroundImage = string;
  // document.getElementByID("imgtest").src = string;
});
