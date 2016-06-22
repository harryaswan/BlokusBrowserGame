var GameBoard = require('./gameboard.js');
var RenderEngine = require('./renderengine.js');
var SelectRenderEngine = require('./selectrenderengine.js');
var PresetPieces = require('./pieceRels.js');
var GamePiece = require('./gamepiece.js');
var User = require('./user.js');
var Log = require('./log.js');

var Game = function(users, canvasElement, canvasWidth, selectCanvasElement) {
    this.users = [];
    this.currentUser = 0;
    this.board = new GameBoard();
    this.render = new RenderEngine(canvasElement, canvasWidth);
    this.selectRenderEngine = new SelectRenderEngine(selectCanvasElement, 600, 140);
    this.log = new Log();

    this.playing = true;
    this.logPlaying = false;
    this.uID = parseInt(Math.random() * 10000);

    this.createUsers(users);
    this.assignPieces();
    this.logStartGame();
};

Game.prototype = {

    logStartGame: function() {
        this.log.setGameID(this.uID);
        for (var i = 0; i < this.users.length; i++) {
            this.log.addData('username', this.users[i].name);
        }
        console.log("Your game id is:", this.uID);
    },
    createUsers: function(users) {
        for (var i = 0; i < users.length; i++) {
            this.createUser(users[i]);
        }
    },
    createUser: function(user) {
        var colour = null;
        switch (this.users.length) {
            case 0:
                colour = "Blue";
                break;
            case 1:
                colour = "Yellow";
                break;
            case 2:
                colour = "Red";
                break;
            case 3:
                colour = "Green";
                break;
        }
        this.users.push(new User(user, colour));
        this.assignPieces();
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
            var currUser = this.currUser();
            this.selectRenderEngine.redraw(currUser.pieces, currUser.colourCode());
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
            });
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

        var currUser = this.currUser();

        console.log('redraw');

        this.selectRenderEngine.redraw(currUser.pieces, currUser.colourCode());
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
    loadLog: function(uid) {
        this.uID = uid;
        this.log.setGameID(uid);
        this.log.loadData(this.playFromLog, this);
    },
    playFromLog: function(logData, context) {
        context.log.setData(logData.data);
        context.users = [];
        context.logPlaying = true;
        context.playThrough(context);
    },
    playThrough: function(context) {
        var data = context.log.grabData();
        if (data) {
            context.makeLogMove(data.action, data.options, context);
            setTimeout(function() {
                context.playThrough(context);
            }, 500);
        } else {
            context.logPlaying = false;
        }
    },
    makeLogMove: function(action, options, game) {
        console.log('action', action);
        switch (action) {
            case 'place':
                game.placePiece(options.pos, options.rel);
                break;
            case 'skip':
                game.skipTurn();
                break;
            case 'username':
                game.createUser(options);
                break;
        }
    }
};

module.exports = Game;
