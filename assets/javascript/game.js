// Declare global variables
var characterDisplayDiv = $("#character-display");
var yourCharacterDiv = $("#your-character");
var enemiesAvailableDiv = $("#enemies-available");
var fightSectionDiv = $("#fight-section");
var defenderDiv = $("#defender");
var characterArray = [];
var isHeroChosen = false;
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

// Choose your character and reposition all players
$(".character").click(function() {
  var charName = ($(this).attr("value"));
  if (!isHeroChosen) {
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