var GameBoard = require('./gameboard.js');
var RenderEngine = require('./renderengine.js');
var PresetPieces = require('./pieceRels.js');

var Game = function(users, canvasElement, canvasWidth) {
    this.users = users;
    this.currentUser = 0;
    this.board = new GameBoard();
    this.render = new RenderEngine(canvasElement, canvasWidth);
    this.assignPieces();
    this.playing = true;
};

Game.prototype = {

    assignPieces: function() {
        for (var user of this.users) {
            user.pieces = new PresetPieces().generatePieces();
        }
    },
    placePiece: function(e) {
        if (this.playing) {
            var cPos = this.render.getMousePos(e);
            var curUser = this.users[this.currentUser];
            if (this.board.placePiece([cPos.y, cPos.x], curUser.getSelectedPiece(), curUser.colourCode())) {
                new Audio('metal_off_switch.mp3').play();
                curUser.removeSelectedPiece();
                this.render.redraw(this.board.boardArray);
                this.nextPlayer();
            } else {
                console.log('invalid move');
                new Audio('single_oil_can.mp3').play();
            }
        }
    },
    nextPlayer: function() {
        if (this.checkPlayersPlaying()) {
            this.currentUser++;
            if (this.currentUser >= this.users.length) {
                this.currentUser = 0;
            }
            console.log('curP',this.currentUser);
            if (!this.checkPlayerPlaying(this.currentUser)) {
                this.nextPlayer();
            }
        } else {
            console.log("EveryOne Done");
            this.playing = false;
            this.render.redraw(this.board.boardArray);
            alert('Game over');
        }

    },
    checkPlayerPlaying: function(index) {
        return this.users[index].playing;
    },
    checkPlayersPlaying: function() {
        var count = 0;
        for (var i = 0; i < this.users.length; i++) {
            console.log('i:',i,'cpp:',this.checkPlayerPlaying(i));
            if (!this.checkPlayerPlaying(i)) {
                count++;
                console.log('count', count);
            }
        }
        if (count < this.users.length) {
            return true;
        }
        return false;
    },
    currUser: function() {
        return this.users[this.currentUser];
    },
    onHover: function(e) {
        if (this.playing) {
            var curUser = this.currUser();
            this.render.redraw(this.board.boardArray, e, curUser.colourCode(), curUser.getSelectedPiece().relative);
        }
    },
    rotatePiece: function() {
        if (this.playing) {
            this.currUser().rotatePiece();
        }
    },
    flipPiece: function() {
        if (this.playing) {
            this.currUser().flipPiece();
        }
    },
    redraw: function() {
        this.render.redraw(this.board.boardArray);
    },
    skipTurn: function() {
        if (this.playing) {
            this.currUser().endPlay();
            this.nextPlayer();
        }
    }
};

module.exports = Game;
