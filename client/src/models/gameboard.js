var GameBoard = function() {
    this.board = new Array(20);
    for (var i = 0; i < 20; i++) {
      this.board[i] = new Array(20);
    }
};

GameBoard.prototype = {
    placePiece: function(piece, pivotPoint) {
        console.log(piece.array);
        var x = pivotPoint[0];
        var y = pivotPoint[1];
    }
};

module.exports = GameBoard;
