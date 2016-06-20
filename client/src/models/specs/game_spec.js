var assert = require('chai').assert;
var Game = require('../game.js');
var User = require('../user.js');

describe('Game', function() {
    beforeEach(function(){

      user1 = new User('Jimmy', 'Red');
      user2 = new User('Colin', 'Blue');
      user3 = new User('Fred', 'Green');
      user4 = new User('Mikael', 'Yellow');
      game = new Game([user1, user2, user3, user4]);

    });
    it('has users', function() {
      assert.equal(4, game.users.length);
        
    });
});