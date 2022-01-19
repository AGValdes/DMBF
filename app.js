'use strict';

//TODO: 
//Take in form input for Character name and Initiative value, and make them into instances of character objects with a constructor function.
//Push those instances into an array.
//Sort them in decending order based on their initiative value.
//Append them to the page in order.
//Upon the end of their turn, probably a click event, move them from the top of the display to the bottom, while maintaining the correct initiative order. 


//-------Global Variables---------//

let charactersInCombat = [1, 7, 2, 25, 12, 14];
let sortedCharacters;
let characterForm = document.getElementById('add-character-form');

let initListParentElement = document.getElementById('init-list');

//-------Constructor and Prototypes-------------//

///Takes in arguments: string name, integer initiative, and boolean isPlayer
function Character(name, init, isPlayer) {
  this.Name = name;
  this.Init = init;
  this.isPlayer = isPlayer;

  charactersInCombat.push(this);
}

function sortCharactersDesc() {
  sortedCharacters = charactersInCombat.sort(function (a, b) { return b - a });
  console.log(sortedCharacters);
}

sortCharactersDesc();

