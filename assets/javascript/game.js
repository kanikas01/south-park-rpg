// Declare global variables
var characterDisplayDiv = $("#character-display");
var yourCharacterDiv = $("#your-character");
var enemiesAvailableDiv = $("#enemies-available");
var fightSectionDiv = $("#fight-section");
var defenderDiv = $("#defender");
var characterArray = [];
var isHeroChosen = false;

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

var towelie = { name: "Towelie",
  pageElement: $("#towelie"),
  healthPoints: 888,
  attackPower: 888,
  counterAttackPower: 888
};

characterArray.push(lemmiwinks, mrKitty, pete, towelie);

$(".character").click(function() {
  var hero = '';
  var charName = ($(this).attr("value"));
  if (!isHeroChosen) {
    $(this).appendTo(yourCharacterDiv);
    characterArray.forEach(function(element) {
      if (element.name == charName) {
        hero = characterArray.splice(characterArray.indexOf(element), 1); 
      }
      // Else give them the enemies class and add them to the enemies list
      
    });
  }
  isHeroChosen = true;
  hero = hero[0];
  console.log(hero, characterArray.length);
});