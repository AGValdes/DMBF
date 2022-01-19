'use strict';

//TODO: 
//Take in form input for Character name and Initiative value, and make them into instances of character objects with a constructor function.
//Push those instances into an array.
//Sort them in decending order based on their initiative value.
//Append them to the page in order.
//Upon the end of their turn, probably a click event, move them from the top of the display to the bottom, while maintaining the correct initiative order. 


//-------Global Variables---------//

let charactersInCombat = [];

let characterForm = document.getElementById('add-character-form');

let initListParentElement = document.getElementById('init-list');

//-------Constructor-------------//

///Takes in arguments: string name, integer initiative, and boolean isPlayer
function Character(name, init, isPlayer) {
  this.Name = name;
  this.Init = init;
  this.isPlayer = isPlayer;

  charactersInCombat.push(this);
}


//-------Helper Functions-------//

///Takes in an 
function sortCharactersDesc(charArr) {
  var len = charArr.length;
  for (var i = len - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (charArr[j - 1].Init > charArr[j].Init) {
        var temp = charArr[j - 1].Init;
        charArr[j - 1].Init = charArr[j].Init;
        charArr[j].Init = temp;
      }
    }
  }

  return arr.reverse();
}



