
$(function() {
    console.log('connected');

    let pokemonDisplay = document.getElementById('pokemonDisplay');
    //select an item and assign a click function to it:
    let goButton = document.getElementById('goButton');
    goButton.addEventListener('click', function(evt) {
        // $.ajax()
        let name = document.getElementById('search').value;
        name = name.toLowerCase();
        // $.load();
        console.log(name);
    });
});





