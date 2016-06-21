var User = function(name, colour) {
    this.name = name;
    this.colour = colour;
    this.pieces = [];
    this.selectedPieceIndex = 0;
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
    removeSelectedPiece: function() {
        this.pieces.splice(this.selectedPieceIndex, 1);
        this.selectPiece = null;
    }
};

module.exports = User;
