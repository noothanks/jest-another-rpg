const inquirer = require('inquirer');
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');

function Game() {
  //instantiates new game obj
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

//creates initializeGame method and functionality
Game.prototype.initializeGame = function() {
  //adds enemies to arr
  this.enemies.push(new Enemy('goblin', 'sword'));
  this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe'));

  //sets starting enemy to first in arr
  this.currentEnemy = this.enemies[0];

  //gets name from user input
  inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    })
    .then(({ name }) => {
      //instantiates player with user name input
      this.player = new Player(name);

      this.startNewBattle();
    });
};

Game.prototype.startNewBattle = function() {
  //player goes first
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else { //player goes second
    this.isPlayerTurn = false;
  }
  //shows player stats
  console.log('Your stats are as follows:');
  console.table(this.player.getStats());

  //shows enemy description
  console.log(this.currentEnemy.getDescription());

  //starts battle
  this.battle();
};

Game.prototype.battle = function() {
  //player turn
  if (this.isPlayerTurn) {
    inquirer
    //decide what to do
      .prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['Attack', 'Use potion']
      })
      //pass decision
      .then(({ action }) => {
        if (action === 'Use potion') {
          if (!this.player.getInventory()) {
            console.log("You don't have any potions!");
            return this.checkEndOfBattle();
          }
          //choose potion
          inquirer
            .prompt({
              type: 'list',
              message: 'Which potion would you like to use?',
              name: 'action',
              choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
            })
            //pass decision
            .then(({ action }) => {
              //gets used potion
              const potionDetails = action.split(': ');

              //potion effect
              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} potion.`);
              this.checkEndOfBattle();
            });
        } else { //if player attacks
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          //attack description
          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());

          this.checkEndOfBattle();
        }
      });
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());

    this.checkEndOfBattle();
  }
};

Game.prototype.checkEndOfBattle = function() {
  //if both characters are alive, switch turn
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    //start round
    this.battle();

    //if player is alive and enemy is not
  } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`You've defeated the ${this.currentEnemy.name}`);

    //add potion
    this.player.addPotion(this.currentEnemy.potion);
    console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

    //increase round
    this.roundNumber++;

    //check roud number against enemies arr
    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      //start next battle
      this.startNewBattle();
    } else { // otherwise you win
      console.log('You win!');
    }
  } else { //if player not alive, loss message
    console.log("You've been defeated!");
  }
};

module.exports = Game;
