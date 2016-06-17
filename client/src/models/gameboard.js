var GameBoard = function() {
    // this.board = new Array(20);
    // for (var i = 0; i < 20; i++) {
    //   this.board[i] = new Array(20);
    // }
    this.boardArray = this.generateBoardArray();
    this.redCount = 0;
    this.greenCount = 0;
    this.blueCount = 0;
    this.yellowCount = 0;
};

GameBoard.prototype = {
    placePiece: function(piece, pivotPoint) {
        console.log(piece.array);
        var x = pivotPoint[0];
        var y = pivotPoint[1];
    },
    generateBoardArray: function(){
      var array = new Array(20);
      for (var i = 0; i < 20; i++) {
        array[i] = new Array(20);
        for (var j = 0; j < 20; j++) {
            array[i][j] = [];
        }
      }
      return array;
    },
    fill: function(coordinates, colourString) {
      this.boardArray[coordinates[0]][coordinates[1]].push(colourString);
    },
    inBounds: function(coordinates) {
      if (this.boardArray[coordinates[0]] && this.boardArray[coordinates[0]][coordinates[1]]) {
        return true;
      }
        else {
          return false;
        }
    }
};

module.exports = GameBoard;
