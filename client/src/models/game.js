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
            if (!this.checkPlayerPlaying(this.currentUser)) {
                this.nextPlayer();
            }
        } else {
            this.playing = false;
            this.render.redraw(this.board.boardArray);
            var winners = this.findWinner();
            winnerString = '';
            for (var winner of winners) {
                winnerString += winner.name + ' ';
            } 
        alert(winnerString + ", you are the winner!");
        }
    },
    findWinner: function() {
        var userObjects = [];
        for (var i = 0; i < this.users.length; i++) {
            userObjects.push({
                name: this.users[i].name,
                score: this.board[this.users[i].colourCode()]
            })
        }
        userObjects.sort(function(a,b) {
            if (a.score > b.score) {
                return 1;
            }
            if (a.score < b.score) {
                return -1;
            }
            return 0;
        });
        var firstWinner = userObjects[3];
        var winners = [];
        userObjects.splice(3,1);
        for (var user of userObjects) {
            if (user.score === firstWinner.score) {
                winners.push(user);
            }
        }
        winners.push(firstWinner);
        return winners;
    },






    checkPlayerPlaying: function(index) {
        return this.users[index].playing;
    },
    checkPlayersPlaying: function() {
        var count = 0;
        for (var i = 0; i < this.users.length; i++) {
            if (!this.checkPlayerPlaying(i)) {
                count++;
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
