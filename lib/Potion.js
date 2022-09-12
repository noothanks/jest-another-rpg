//creates potion class(es6)
class Potion {
  constructor(name) {
    this.types = ['strength', 'agility', 'health'];
    //sets potion to param or randomly generates one based on the arr above and random val below
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
  
    if (this.name === 'health') {
      this.value = Math.floor(Math.random() * 10 + 30);
    } else {
      this.value = Math.floor(Math.random() * 5 + 7);
    }
  }
}
  
  module.exports = Potion;
  