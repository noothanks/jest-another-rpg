const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

test('creates a player object', () => {
  //create new player instance
  const player = new Player('Dave');

  //player should have a name string
  expect(player.name).toBe('Dave');
  //player sjould have health val
  expect(player.health).toEqual(expect.any(Number));
  //player should have strength val
  expect(player.strength).toEqual(expect.any(Number));
  //player should have agility value
  expect(player.agility).toEqual(expect.any(Number));
  //player should have an inventory arr of objects
  expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

test("gets player's stats as an object", () => {
  //instantiate
  const player = new Player('Dave');

  //player.getStats should return the following properties
  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
  const player = new Player('Dave');
  //should return inventory arr
  expect(player.getInventory()).toEqual(expect.any(Array));

  //sim empty arr
  player.inventory = [];
  //when inventory is empty, should return false
  expect(player.getInventory()).toEqual(false);
});

test("gets player's health value", () => {
    const player= new Player('Doug');

    //player should have health val set to a string
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('checks if player is alive or not', () => {
    const player = new Player('Doug');

    //method should return true
    expect(player.isAlive()).toBeTruthy();

    //if health is 0 method should return false
    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
    //instantiate and get health val
    const player = new Player('Doug');
    const oldHealth = player.health;

    player.reduceHealth(5);
    //new health value should be old - 5
    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);
    //make sure val never goes negative
    expect(player.health).toBe(0);
});

test("gets player's attack value", () => {
    const player = new Player('Doug');
    player.strength = 10;

    //val should be between 5 and 15
    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test("adds potion to the inventory", () => {
    const player = new Player('Doug');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());
  //potion should be added to arr and change should be reflected by change in arr length
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
    const player= new Player('Doug');
    player.inventory = [new Potion(), new Potion(), new Potion()];

    const oldCount = player.inventory.length;
    player.usePotion(1);
    //potion should be removed from arr
    expect(player.inventory.length).toBeLessThan(oldCount);
})