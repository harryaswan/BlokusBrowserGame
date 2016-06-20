var assert = require('chai').assert;
var GameBoard = require('../gameboard.js');
var GamePiece = require('../gamepiece.js');

describe('GameBoard', function() {
    beforeEach(function(){
        
        board = new GameBoard();

    });
    it('has a board array which is an array of twenty arrays of twenty empty arrays!', function() {

        assert.equal(20, board.boardArray.length);
        assert.equal(20, board.boardArray[0].length);
        assert.equal(0, board.boardArray[0][0].length);
    });
    it('can colour a square when provided with a colour and coordinates', function() {

        board.fill([9,7], 'R');
        console.log(board.boardArray[9][7][0]);
        assert.equal('R', board.boardArray[9][7][0]);
    });
    it('can determine if a given coordinate pair falls within the bounds of its board array', function() {

        assert.equal(true, board.inBounds([10,10]));
        assert.equal(false, board.inBounds([20,20]));
    });
    it('can take a list of coordinate pairs and remove those that fall outside its bounds', function() {

        var coordsList = [[2,1], [-2,3], [-2,-3], [2,-3], [10,20], [20, 10], [20,20]];
        var coordsInBounds = board.listInBounds(coordsList);
        assert.equal(1, coordsInBounds.length);
        assert.deepEqual([2,1], coordsInBounds[0]);
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
    it('adds one to the appropriate colour count when a square is filled with a colour', function() {

        board.fill([9,7], 'R');
        assert.equal(1, board.redCount);
    });
    it('knows when a placed piece will occupy a corner square', function() {

    });

});










