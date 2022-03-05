'use strict';

//TODO: 
//Upon the end of their turn, probably a click event, move them from the top of the display to the bottom, while maintaining the correct initiative order. 


//-------Global Variables---------//

let charactersInCombat = [];

let characterForm = document.getElementById('add-char-form');
let endOfTurnButton = document.getElementById('end-of-turn');
let initListParentElement = document.getElementById('init-list');

//-------Constructor-------------//

///Takes in arguments: string name, integer initiative, and boolean isPlayer, makes instances of character objects. Upon creation these instances will then be pushed into the charactersInCombat array and sorted. 
function Character(name, init, isPlayer) {
  this.Name = name;
  this.Init = init;
  this.isPlayer = isPlayer;

  this.PositionInQueue;
  this.Next;
  this.Previous;

  charactersInCombat.push(this);
}


//-------Helper Functions-------//

///Takes in the array of characters and sorts them using a bubble sort algorithm along with the reverse() built-in method to achieve descending order based on their Init property, which represents the initiative value they have calculated.
function sortCharactersDesc(charArr) {
  var len = charArr.length;
  for (var i = len - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {

      if (charArr[j - 1].Init > charArr[j].Init) {
        var temp = charArr[j - 1];
        charArr[j - 1] = charArr[j];
        charArr[j] = temp;
      }

    }
  }
  return charArr.reverse();
}

//Displays appends each character as an li element and assigns each one a class based on their "isPlayer" property for styling purposes later.
function displayCharacters() {
  charactersInCombat.forEach(element => {
    if (element.isPlayer) {
      $('#init-list').append('<li class="PC" >' + element.Name + '</li>');
    }
    else {
      $('#init-list').append('<li class="NPC" >' + element.Name + '</li>');
    }
  });

  applyStylingToLiElements();
}

//Helper function to dynamically style the li elements as they appear on the DOM.
function applyStylingToLiElements() {
  $('li').css("height", "50px");
  $('li').css("width", "75%");
  $('li').css("text-align", "center");
  $('li').css("padding-top", "5%");
  $('li').css("font-size", "200%");

  $('.PC').css("background-color", "green");
  $('.NPC').css("background-color", "red");
}

//Gives character instances reference to where they are in the Queue
function establishPosition(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].PositionInQueue = i + 1;
    arr[i].Previous = arr[i - 1];
    arr[i].Next = arr[i + 1];
  }
}

//-------Event Handling-------//

function handleSubmit(event) {

  event.preventDefault();
  initListParentElement.innerHTML = '';

  let name = event.target.name.value;
  let init = Number(event.target.initValue.value);
  let isPlayer = event.target.isPlayer.checked;

  new Character(name, init, isPlayer);

  sortCharactersDesc(charactersInCombat);
  establishPosition(charactersInCombat);
  displayCharacters();

  //reset form feilds after each character is added to the list
  let form = document.getElementById('add-char-form');
  form.reset();

  console.log(charactersInCombat);
}

function handleTurnOver(event) {
  event.preventDefault();
  initListParentElement.innerHTML = '';

  let turnOverCharacter = charactersInCombat[0];
  charactersInCombat.push(turnOverCharacter);
  charactersInCombat.shift(charactersInCombat[0]);

  establishPosition(charactersInCombat);
  displayCharacters();
}

//---------Executable Code-----------//

characterForm.addEventListener('submit', handleSubmit);
endOfTurnButton.addEventListener('click', handleTurnOver);