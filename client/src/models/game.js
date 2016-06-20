var GameBoard = require('./gameboard.js');
var RenderEngine = require('./renderengine.js');
var PresetPieces = require('./pieceRels.js');

var Game = function(users, canvasElement, canvasWidth) {
    this.users = users;
    this.currentUser = 0;
    this.board = new GameBoard();
    this.render = new RenderEngine(canvasElement, canvasWidth);
};

Game.prototype = {

    assignPieces: function() {
        for (var user of this.users) {
            user.pieces = new PresetPieces().generatePieces();
        }
    },
    placePiece: function(e, game) {
        var cPos = game.render.getMousePos(e);
        var curUser = game.users[game.currentUser];
        if (game.board.placePiece([cPos.y, cPos.x], curUser.getSelectedPiece(), curUser.getColourCode())) {
            curUser.removeSelectedPiece();
            game.render.redraw(game.board.boardArray);
            game.nextPlayer();
        }
    },
    nextPlayer: function() {
        this.currentUser++;
        if (this.currentUser >= this.users.length) {
            this.currentUser = 0;
        }
    },
    currUser: function() {
        return this.users[this.currentUser];
    },
    onHover: function(e, game) {
        var curUser = game.currUser();
        this.render.redraw(game.board.boardArray, e, curUser.getColourCode(), curUser.getSelectedPiece().relative);
    }

};

module.exports = Game;
