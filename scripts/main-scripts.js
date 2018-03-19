
window.onload = function(evt){
    console.log(`js loaded`);
    const body = document.getElementsByTagName('body')[0];

    let button = document.getElementById('set-style');

    //re-factor this as reusable function:
    let containerElements = 'frame one two three four five six'.split(' ');
    let elementSelector = document.getElementById('select-element');
    containerElements.forEach((element, index) => {
        let newSelect = document.createElement('option');
        newSelect.innerHTML = element;
        newSelect.setAttribute('value', element);
        elementSelector.appendChild(newSelect);
    });

    let classNames = 'this that and the other'.split(' ');
    let classSelector = document.getElementById('select-class');
    classNames.forEach((className, index) => {
        let newSelect = document.createElement('option');
        newSelect.innerHTML = className;
        newSelect.setAttribute('value', className);
        classSelector.appendChild(newSelect);
    });

    button.addEventListener('click', function(evt) {
        evt.preventDefault();
        let selectedElement = document.getElementById( "select-element" );
        let selectClassName = document.getElementById("select-class");
        let elementId = selectedElement.value;
        let element = document.getElementById(elementId);
        console.log('element: ', element);
        alert(element);



    });
   




    
    

}