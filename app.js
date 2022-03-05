'use strict';

//TODO: 
//Upon the end of their turn, probably a click event, move them from the top of the display to the bottom, while maintaining the correct initiative order. 


//-------Global Variables---------//

let charactersInCombat = [];

let characterForm = document.getElementById('add-char-form');
let initListParentElement = document.getElementById('init-list');

let endOfTurnButton = document.getElementById('end-of-turn');


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

function establishPosition(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].PositionInQueue = i;
    arr[i].Previous = arr[i - 1];
    arr[i].Next = arr[i + 1];
  }
}
//Displays appends each character as an li element and assigns each one a class based on their "isPlayer" property for styling purposes later.
function displayCharacters() {
  charactersInCombat.forEach(element => {
    if (element.isPlayer) {
      let childToBeAppended = '<li class="PC">' + element.Name + '<button class="move-up">^</button><button class="move-down" id="temp">v</button></li>'
      $('#init-list').append(childToBeAppended);
      $('#temp').attr("id", element.PositionInQueue);
    }
    else {
      let childToBeAppended = '<li class="NPC" >' + element.Name + '<button class="move-up">^</button> <button class="move-down" id="temp">v</button></li>'
      $('#init-list').append(childToBeAppended);
      $('#temp').attr("id", element.PositionInQueue);
    }
  });

  applyStylingToDynamicElements();
  giveMoveDownButtonsEventListeners();
}

//Helper function to dynamically style elements as they appear on the DOM.
function applyStylingToDynamicElements() {
  $('li').css("height", "50px");
  $('li').css("width", "75%");
  $('li').css("text-align", "center");
  $('li').css("padding-top", "5%");
  $('li').css("font-size", "200%");

  $('.PC').css("background-color", "green");
  $('.NPC').css("background-color", "red");

  $('.move-up').css("margin-left", "20%");
}

//Gives character instances reference to where they are in the Queue


function giveMoveDownButtonsEventListeners() {
  document.querySelectorAll('.move-down').forEach(item => {
    item.addEventListener('click', event => {
      handleMoveDownTheOrder();
    })
  })
}

//prevents page refresh and clears inner html of the ol container
function prepareListForNewDisplay() {
  event.preventDefault();
  initListParentElement.innerHTML = '';
}


//-------Event Handling-------//

function handleSubmit(event) {
  prepareListForNewDisplay();

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
  prepareListForNewDisplay();

  let turnOverCharacter = charactersInCombat[0];
  charactersInCombat.push(turnOverCharacter);
  charactersInCombat.shift(charactersInCombat[0]);

  establishPosition(charactersInCombat);
  displayCharacters();
}

function handleMoveDownTheOrder(event) {
  prepareListForNewDisplay();

  console.log("we made it!");

}
//---------Executable Code-----------//

characterForm.addEventListener('submit', handleSubmit);
endOfTurnButton.addEventListener('click', handleTurnOver);
