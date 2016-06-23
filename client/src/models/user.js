var GamePiece = require('./gamepiece.js');
var User = function(name, colour) {
    this.name = name;
    this.colour = colour;
    this.pieces = [];
    this.selectedPieceIndex = null;
    this.playing = true;
};

User.prototype = {

    colourCode: function() {
        return this.colour[0].toUpperCase();
    },
    selectPiece: function(pieceIndex) {
        if (this.pieces[pieceIndex]) {
            this.selectedPieceIndex = pieceIndex;
        }
    },
    getSelectedPiece: function() {
        return this.pieces[this.selectedPieceIndex];
    },
    rotatePiece: function() {
        this.pieces[this.selectedPieceIndex].rotate();
    },
    flipPiece: function() {
        this.pieces[this.selectedPieceIndex].flip();
    },
    removeSelectedPiece: function(piece) {
        var index = null;
        for (var i = 0; i < this.pieces.length; i++) {
            var origRel = this.pieces[i].relative;
            for (var z = 0; z < 4; z++) {
                if (JSON.stringify(this.pieces[i].relative) === JSON.stringify(piece.relative)) {
                    index = i;
                }
                this.pieces[i].rotate();
            }
            for (var z = 0; z < 4; z++) {
                this.pieces[i].rotate();
                this.pieces[i].flip();
                if (JSON.stringify(this.pieces[i].relative) === JSON.stringify(piece.relative)) {
                    index = i;
                }
                this.pieces[i].flip();
            }
            this.pieces[i] = new GamePiece(origRel);
        }
        if (index !== null) {
            this.pieces.splice(index, 1);
        }
        this.selectedPieceIndex = null;
        if (this.pieces.length === 0) {
            this.playing = false;
        }
    },
    endPlay: function() {
        this.playing = false;
    }
};

module.exports = User;
