var assert = require('chai').assert;
var GameBoard = require('../gameboard.js');

describe('GameBoard', function() {
    beforeEach(function(){
        
        board = new GameBoard();

    });
    it('Its board array is an array of twenty arrays of twenty empty arrays!', function() {

        assert.equal(20, board.boardArray.length);
        assert.equal(20, board.boardArray[0].length);
        assert.equal(0, board.boardArray[0][0].length);
    });
    it('can colour a square when provided with a colour and coordinates', function() {

        board.fill([9,7], 'R');
        console.log(board.boardArray[9][7][0]);
        assert.equal('R', board.boardArray[9][7][0]);
    });
    it('can determine if a given set of coordinates falls within the bounds of its board array', function() {

        assert.equal(true, board.inBounds([10,10]));
        assert.equal(false, board.inBounds([20,20]));
    });
    it('can decide which corners of a placed piece are in bounds', function() {

    });
    it('knows if a piece has been placed where one or more of its tiles fall out of bounds', function() {

    });
    it('can decide which adjacent squares of a placed piece are in bounds', function() {

    });
    it('can tell when an overlap exists at a given square', function() {

    });
    it('can tell when a placed piece is overlapping one or more occupied squares', function() {

    });
    it('can decide if a piece placement meets the corner requirement', function() {

    });
    it('can decide if a piece placement meets the edge requirement', function() {

    });
    it('can decide if a placement is legal', function() {

    });
    it('can update its array if a placement is legal', function() {

    });
    it('knows how many squares are occupied by a given colour', function() {

        board.fill([9,7], 'R');
        assert.equal(1, board.redCount);
    });
    it('knows when a placed piece will occupy a corner square', function() {

    });

});










