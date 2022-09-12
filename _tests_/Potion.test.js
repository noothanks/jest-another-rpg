const Potion = require('../lib/Potion.js');

test('creates a health potion object', () => {
  //create new health potion
  const potion = new Potion('health');


  expect(potion.name).toBe('health');
  //expect value to be any number
  expect(potion.value).toEqual(expect.any(Number));
});

test('creates a random potion object', () => { 
  //create any potion
  const potion = new Potion();

  //expect potion to have a string as its name
  expect(potion.name).toEqual(expect.any(String));
  //make sure the string isn't empty
  expect(potion.name.length).toBeGreaterThan(0);
  //expect potion value to be any number
  expect(potion.value).toEqual(expect.any(Number));
});
