const Potion = require('../lib/Potion');
const Character = require('../lib/Character');

//inherit methods and props from character
class Player extends Character {
    constructor(name = '') {
      // call parent constructor here:
      super(name);
      
      //sets inventory to include a health potion and another random potion
      //Try not to call constructor within constructor
      this.inventory = [new Potion('health'), new Potion()];
    }
  
    getStats() {
      return {
        //potions arr
        potions: this.inventory.length,
        //attribute vals
        health: this.health,
        strength: this.strength,
        agility: this.agility
      };
    }
  
    getInventory() {
      if (this.inventory.length) {
        //potions arr
        return this.inventory;
      }
      //if [] return false;
      return false;
    }
  
    addPotion(potion) {
      //adds potion to arr
      this.inventory.push(potion);
    }
  
    usePotion(index) {
      //removes a single potion at the specified index
      //saves removed potion to new arr
      //accesses removed potion via [0]
      //saves to potion var
      const potion = this.inventory.splice(index, 1)[0];
  
      switch (potion.name) {
        case 'agility':
          this.agility += potion.value;
          break;
        case 'health':
          this.health += potion.value;
          break;
        case 'strength':
          this.strength += potion.value;
          break;
      }
    }
  }
module.exports = Player;
