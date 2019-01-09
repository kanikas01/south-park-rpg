// Declare global variables
var characterDisplayDiv = $("#character-display");
var yourCharacterDiv = $("#your-character");
var enemiesAvailableDiv = $("#enemies-available");
var fightSectionDiv = $("#fight-section");
var defenderDiv = $("#defender");
var characterArray = [];
var isHeroChosen = false;
var isEnemyChosen = false;
var myCharacter;

// Declare character objects
var lemmiwinks = { 
  name: "Lemmiwinks",
  pageElement: $("#lemmiwinks"),
  healthPoints: 888,
  attackPower: 888,
  counterAttackPower: 888
};

var mrKitty = { 
  name: "Mr. Kitty",
  pageElement: $("#mr-kitty"),
  healthPoints: 888,
  attackPower: 888,
  counterAttackPower: 888
};

var pete = { 
  name: "Pete",
  pageElement: $("#pete"),
  healthPoints: 888,
  attackPower: 888,
  counterAttackPower: 888
};

var towelie = { 
  name: "Towelie",
  pageElement: $("#towelie"),
  healthPoints: 888,
  attackPower: 888,
  counterAttackPower: 888
};

// Add character objects to an array
characterArray.push(lemmiwinks, mrKitty, pete, towelie);

$(document).ready(function () {
  
  // Choose your character and reposition all players
  $(".character").click(function() {
    if (!isHeroChosen) {
      var charName = $(this).attr("value");
      $(this).appendTo(yourCharacterDiv);
      characterArray.forEach(function(element) {
        if (element.name !== charName) {
          element.pageElement.toggleClass("enemy-character");
          element.pageElement.appendTo(enemiesAvailableDiv);
        }
        else {
          myCharacter = element;
        }
      });
      isHeroChosen = true;
      console.log(myCharacter);
    }
  });

  // Choose defender
  $('#enemies-available').on('click', '.enemy-character',function () {
    // var enemyName = $(this).attr("value");
    if(!isEnemyChosen) {
      $(this).toggleClass("defender");
      $(this).appendTo(defenderDiv);
      isEnemyChosen = true;
    }
  });

  $('#defender').on('click', '.defender', function () {
    location.reload();
  });

});