// Declare global variables
var characterDisplayDiv = $("#character-display");
var yourCharacterDiv = $("#your-character");
var enemiesAvailableDiv = $("#enemies-available");
var fightSectionDiv = $("#fight-section");
var defenderDiv = $("#defender");
var battleProgressDiv = $("#battle-progress p");
var characterArray = [];
var isHeroChosen = false;
var isEnemyChosen = false;
var enemiesRemaining = 3;
var myCharacter;
var currentEnemy;

// Declare character objects
var lemmiwinks = { 
  name: "Lemmiwinks",
  pageElement: "#lemmiwinks",
  healthPoints: 120,
  attackPower: 8,
  attackIncrease: 8,
  counterAttackPower: 8
};

var mrKitty = { 
  name: "Mr. Kitty",
  pageElement: "#mr-kitty",
  healthPoints: 100,
  attackPower: 5,
  attackIncrease: 5,
  counterAttackPower: 5
};

var pete = { 
  name: "Pete",
  pageElement: "#pete",
  healthPoints: 150,
  attackPower: 20,
  attackIncrease: 20,
  counterAttackPower: 20
};

var towelie = { 
  name: "Towelie",
  pageElement: "#towelie",
  healthPoints: 180,
  attackPower: 25,
  attackIncrease: 25,
  counterAttackPower: 25
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
          $(element.pageElement).toggleClass("enemy-character");
          $(element.pageElement).appendTo(enemiesAvailableDiv);
        }
        else {
          myCharacter = element;
        }
      });
      isHeroChosen = true;
      console.log(myCharacter.name);
    }
  });

  // Choose defender
  $('#enemies-available').on('click', '.enemy-character',function () {
    // var enemyName = $(this).attr("value");
    if(!isEnemyChosen) {
      battleProgressDiv.html('');
      var charName = $(this).attr("value");
      $(this).appendTo(yourCharacterDiv);
      characterArray.forEach(function (element) {
        if (element.name == charName) {
          currentEnemy = element;
        }
      });
      $(this).toggleClass("defender");
      $(this).appendTo(defenderDiv);
      isEnemyChosen = true;
      console.log(currentEnemy.name);
    }
  });

  $('#attack-button').on('click', function () {
    if(isHeroChosen && isEnemyChosen) {
      currentEnemy.healthPoints -= myCharacter.attackPower;
      
      if (currentEnemy.healthPoints <= 0) {
        currentEnemy.healthPoints = 0;
        $(currentEnemy.pageElement + " p").html(currentEnemy.healthPoints);
        battleProgressDiv.html(`You defeated ${currentEnemy.name}!`);
        $(currentEnemy.pageElement).detach();
        isEnemyChosen = false;
        enemiesRemaining--;
        currentEnemy = '';
      }
      else if(myCharacter.healthPoints <= 0) {
        battleProgressDiv.html(`You have been defeated!`);
        $("#attack").css("display", "none");
        $("#reset").css("display", "block");
      }
      else {
        $(currentEnemy.pageElement + " p").html(currentEnemy.healthPoints);
        myCharacter.healthPoints -= currentEnemy.counterAttackPower;
        $(myCharacter.pageElement + " p").html(myCharacter.healthPoints);

        battleProgressDiv.html(`You attacked ${currentEnemy.name} for ${myCharacter.attackPower} damage!<br>
        ${currentEnemy.name} attacked you back for ${currentEnemy.counterAttackPower} damage!`);

        myCharacter.attackPower += myCharacter.attackIncrease;
      }
      
      if (!enemiesRemaining) {
        battleProgressDiv.html(`You won! Game Over!`);
        // Hide attack button and show reset button
        $("#attack").css("display", "none");
        $("#reset").css("display", "block");
      }
    }
  });

  // Reload and reset the game
  $('#reset').on('click', '#reset-button', function () {
    location.reload();
  });

});