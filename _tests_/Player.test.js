const { exportAllDeclaration } = require('@babel/types');
const { default: TestRunner } = require('jest-runner');
const { JestHook } = require('jest-watcher');
const Player = require('../lib/Player');

const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');

console.log(new Potion());
test('creates a player object', () => {
    const player = new Player('Doug');

    expect(player.name).toBe('Doug');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});