var GameBoard = require('./gameboard.js');
var RenderEngine = require('./renderengine.js');
var PresetPieces = require('./pieceRels.js');
var Preview = require('./preview_pane.js');

var Game = function(users, canvasElement, previewElement1, previewElement2, previewElement3, previewElement_main, canvasWidth) {
    this.users = users;
    this.currentUser = 0;
    this.board = new GameBoard();
    this.preview = new Preview();
    this.render = new RenderEngine(canvasElement, canvasWidth, canvasWidth);
    this.render_preview1 = new RenderEngine(previewElement1, 120, 240);
    this.render_preview2 = new RenderEngine(previewElement2, 120, 240);
    this.render_preview3 = new RenderEngine(previewElement3, 120, 240);
    this.render_preview_main = new RenderEngine(previewElement_main, 540, 140);


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
            curUser.removeSelectedPiece();
            this.render.redraw(this.board.boardArray);
            this.nextPlayer();
        } else {
            console.log('invalid move');
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
    },
    draw_preview1: function() {
        this.render_preview1.redrawPreview(this.preview.previewArray);
    },
    draw_preview2: function() {
        this.render_preview2.redrawPreview(this.preview.previewArray);
    },
    draw_preview3: function() {
        this.render_preview3.redrawPreview(this.preview.previewArray);
    },
    draw_preview_main: function() {
        this.render_preview_main.redrawPreview(this.preview.previewArray);
    }
};

module.exports = Game;
