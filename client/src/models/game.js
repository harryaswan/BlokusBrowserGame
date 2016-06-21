var GameBoard = require('./gameboard.js');
var RenderEngine = require('./renderengine.js');
var PresetPieces = require('./pieceRels.js');
var Log = require('./log.js');
var GamePiece = require('./gamepiece.js');

var Game = function(users, canvasElement, canvasWidth) {
    this.users = users;
    this.currentUser = 0;
    this.board = new GameBoard();
    this.render = new RenderEngine(canvasElement, canvasWidth);
    this.log = new Log();
    this.assignPieces();
    this.playing = true;
    this.logPlaying = false;
    this.uID = parseInt(Math.random() * 10000);
    this.logStartGame();
};

Game.prototype = {

    logStartGame: function() {
        this.log.setGameID(this.uID);
        for (var i = 0; i < this.users.length; i++) {
            this.log.addData('username', this.users[i].name);
        }
    },
    assignPieces: function() {
        for (var user of this.users) {
            user.pieces = new PresetPieces().generatePieces();
        }
    },
    placePiece: function(e, pieceRel) {
        if (this.playing) {
            var cPos = this.render.getMousePos(e);
            var curUser = this.users[this.currentUser];
            var curPiece = null;
            if (pieceRel) {
                curPiece = new GamePiece(pieceRel);
            } else {
                curPiece = curUser.getSelectedPiece();
            }
            if (this.board.placePiece([cPos.y, cPos.x], curPiece, curUser.colourCode())) {
                new Audio('metal_off_switch.mp3').play();
                curUser.removeSelectedPiece();
                this.render.redraw(this.board.boardArray);
                this.nextPlayer();
                if (!this.logPlaying) {
                    this.log.addData('place', {pos:{clientX: e.clientX, clientY: e.clientY}, rel:curPiece.relative});
                }
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
            alert('Game over');
        }

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
            if (!this.logPlaying) {
                this.log.addData('skip', null);
            }
        }
    },
    saveLog: function() {
        this.log.saveData();
    },
    loadLog: function() {
        this.log.loadData(this.playFromLog);
    },
    playFromLog: function(logData) {
        console.log('logdata',logData);
    }
};

module.exports = Game;
