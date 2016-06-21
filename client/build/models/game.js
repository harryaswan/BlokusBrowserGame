var GameBoard = require('./gameboard.js');
var RenderEngine = require('./renderengine.js');
var PresetPieces = require('./pieceRels.js');

var Game = function(users, canvasElement, canvasWidth) {
    this.users = users;
    this.currentUser = 0;
    this.board = new GameBoard();
    this.render = new RenderEngine(canvasElement, canvasWidth);
    this.assignPieces();
};

Game.prototype = {

    assignPieces: function() {
        for (var user of this.users) {
            user.pieces = new PresetPieces().generatePieces();
        }
    },
    placePiece: function(e) {
        var cPos = this.render.getMousePos(e);
        var curUser = this.users[this.currentUser];
        if (this.board.placePiece([cPos.y, cPos.x], curUser.getSelectedPiece(), curUser.colourCode())) {
            new Audio('metal_off_switch.mp3').play();
            curUser.removeSelectedPiece();
            this.render.redraw(this.board.boardArray);
            this.nextPlayer();
        } else {
            console.log('invalid move');
            new Audio('metal_off_switch.mp3').play();
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
    onHover: function(e) {
        var curUser = this.currUser();
        this.render.redraw(this.board.boardArray, e, curUser.colourCode(), curUser.getSelectedPiece().relative);
    },
    rotatePiece: function() {
        this.currUser().rotatePiece();
    },
    flipPiece: function() {
        this.currUser().flipPiece();
    },
    redraw: function() {
        this.render.redraw(this.board.boardArray);
    }
};

module.exports = Game;
