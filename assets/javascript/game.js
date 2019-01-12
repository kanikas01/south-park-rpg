// Gameplay can begin when DOM is loaded
$(document).ready(function () {

  // ---------- Global variables ---------- //

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


  // ---------- Character objects ---------- //

  var lemmiwinks = {
    name: "Lemmiwinks",
    pageElement: "#lemmiwinks",
    healthPoints: 120,
    attackPower: 8,
    attackIncrease: 8,
    counterAttackPower: 16
  };

  var mrKitty = {
    name: "Mr. Kitty",
    pageElement: "#mr-kitty",
    healthPoints: 100,
    attackPower: 15,
    attackIncrease: 15,
    counterAttackPower: 5
  };

  var pete = {
    name: "Pete",
    pageElement: "#pete",
    healthPoints: 150,
    attackPower: 6,
    attackIncrease: 6,
    counterAttackPower: 13
  };

  var towelie = {
    name: "Towelie",
    pageElement: "#towelie",
    healthPoints: 180,
    attackPower: 2,
    attackIncrease: 2,
    counterAttackPower: 23
  };

  // Add character objects to characterArray
  characterArray.push(lemmiwinks, mrKitty, pete, towelie);


  // ---------- Event listeners ---------- //
  
  // Choose your character and reposition all players
  $(".character").click(chooseHero);

  // Choose opponent
  $('#enemies-available').on('click', '.enemy-character',chooseOpponent);
  
  // Attack opponent
  $('#attack-button').on('click', attackOpponent);

  // Reload and reset the game
  $('#reset').on('click', '#reset-button', resetGame);


  // ---------- Event handlers ---------- //

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

  function attackOpponent () {
    if (isHeroChosen && isEnemyChosen) {
      // You attack the enemy
      currentEnemy.healthPoints -= myCharacter.attackPower;
      // You beat the enemy
      if (currentEnemy.healthPoints <= 0) {
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
      // If you survive, update page with round info
      else {
        battleProgressDiv.html(`You attacked ${currentEnemy.name} for ${myCharacter.attackPower} damage!
          <br>${currentEnemy.name} attacked you back for ${currentEnemy.counterAttackPower} damage!`);
      }
      // Increase your attack power
      myCharacter.attackPower += myCharacter.attackIncrease;
    }

    if (!isEnemyChosen) {
      battleProgressDiv.html("There is no enemy to attack.")
    }
  }

  function resetGame() {
    location.reload();
  }


// ---------- Helper functions ---------- //

  function winGame() {
    battleProgressDiv.html(`<h2>You won! Game Over!</h2>`);
    gameOver();
  }

  function loseGame () {
    myCharacter.healthPoints = 0;
    $(myCharacter.pageElement + " p").html(myCharacter.healthPoints);
    battleProgressDiv.html('<h2>You have been defeated!</h2>');
    gameOver();
  }

  function gameOver (){
    // Hide attack button and show reset button
    $("#attack").css("display", "none");
    $("#reset").css("display", "block");
  }

});