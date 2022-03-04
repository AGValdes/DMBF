'use strict';

//TODO: 
//Take in form input for Character name and Initiative value, and make them into instances of character objects with a constructor function.
//Push those instances into an array.
//Sort them in decending order based on their initiative value.
//Append them to the page in order.
//Upon the end of their turn, probably a click event, move them from the top of the display to the bottom, while maintaining the correct initiative order. 


//-------Global Variables---------//

let charactersInCombat = [];

let characterForm = document.getElementById('add-char-form');

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


function displayCharacters() {

  charactersInCombat.forEach(element => {
    if (element.isPlayer) {
      $('#init-list').append('<li class="PC" >' + element.Name + '</li>');
    }
    else {
      $('#init-list').append('<li class="NPC" >' + element.Name + '</li>');
    }
  });

  $('.PC').css("background-color", "green");
  $('.NPC').css("background-color", "red");
}

function establishPosition(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].PositionInQueue = i + 1;
    arr[i].Previous = arr[i - 1];
    arr[i].Next = arr[i + 1];
  }
}

//-------Form Event Handling-------//

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


//---------Executable Code-----------//

characterForm.addEventListener('submit', handleSubmit);
