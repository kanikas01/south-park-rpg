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
  attackPower: 12,
  attackIncrease: 12,
  counterAttackPower: 12
};

var mrKitty = { 
  name: "Mr. Kitty",
  pageElement: "#mr-kitty",
  healthPoints: 100,
  attackPower: 12,
  attackIncrease: 12,
  counterAttackPower: 12
};

var pete = { 
  name: "Pete",
  pageElement: "#pete",
  healthPoints: 150,
  attackPower: 14,
  attackIncrease: 14,
  counterAttackPower: 14
};

var towelie = { 
  name: "Towelie",
  pageElement: "#towelie",
  healthPoints: 180,
  attackPower: 16,
  attackIncrease: 16,
  counterAttackPower: 16
};

// Add character objects to an array
characterArray.push(lemmiwinks, mrKitty, pete, towelie);

$(document).ready(function () {
  
  // Choose your character and reposition all players
  $(".character").click(chooseHero);

  // Choose defender
  $('#enemies-available').on('click', '.enemy-character',chooseOpponent);

  $('#attack-button').on('click', function () {
    if (isHeroChosen && isEnemyChosen) {
      // You attack the enemy
      currentEnemy.healthPoints -= myCharacter.attackPower;
      // You beat the enemy
      if (currentEnemy.healthPoints <= 0 ) {
        currentEnemy.healthPoints = 0;
        enemiesRemaining--;
        $(currentEnemy.pageElement).detach();
        // Check if there are still enemies left to fight
        if (enemiesRemaining) {
          battleProgressDiv.html(`You have defeated ${currentEnemy.name}!<br>You can choose to fight another enemy.`);
        } 
        else {
          winGame();
        }
        isEnemyChosen = false;
        currentEnemy = '';
        return;
      }
      // If enemy survives, they counterattack
      else { 
        $(currentEnemy.pageElement + " p").html(currentEnemy.healthPoints);
        myCharacter.healthPoints -= currentEnemy.counterAttackPower;
        $(myCharacter.pageElement + " p").html(myCharacter.healthPoints);
      }
      // Check if enemy defeats you
      if (myCharacter.healthPoints <= 0) {
        loseGame();
      }
      else {
        battleProgressDiv.html(`You attacked ${currentEnemy.name} for ${myCharacter.attackPower} damage!<br>${currentEnemy.name} attacked you back for ${currentEnemy.counterAttackPower} damage!`);
      }

      myCharacter.attackPower += myCharacter.attackIncrease;
    }
  });

  // Reload and reset the game
  $('#reset').on('click', '#reset-button', resetGame);

  function chooseHero () {
    if (!isHeroChosen) {
      var charName = $(this).attr("value");
      $(this).appendTo(yourCharacterDiv);
      characterArray.forEach(function (element) {
        if (element.name !== charName) {
          $(element.pageElement).toggleClass("enemy-character");
          $(element.pageElement).appendTo(enemiesAvailableDiv);
        }
        else {
          myCharacter = element;
        }
      });
      isHeroChosen = true;
    }
  }

  function chooseOpponent () {
    if (!isEnemyChosen) {
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
    }
  }

  function winGame() {
    battleProgressDiv.html(`You won! Game Over!`);
    gameOver();
  }

  function loseGame () {
    myCharacter.healthPoints = 0;
    $(myCharacter.pageElement + " p").html(myCharacter.healthPoints);
    battleProgressDiv.html('You have been defeated!');
    gameOver();
  }

  function gameOver (){
    // Hide attack button and show reset button
    $("#attack").css("display", "none");
    $("#reset").css("display", "block");
  }

  function resetGame () {
    location.reload();
  }

});