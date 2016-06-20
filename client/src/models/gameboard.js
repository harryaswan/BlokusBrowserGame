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
                array[i][j] = null;
            }
        }
        return array;
    },
    fill: function(coordinates, colourString) {
        this.boardArray[coordinates[0]][coordinates[1]] = colourString;
        this.updateColourCount(colourString);
    },
    inBounds: function(coordinates) {
        if (this.boardArray[coordinates[0]]) {
            if (!(this.boardArray[coordinates[0]][coordinates[1]] === undefined)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    listInBounds: function(coordinatesList) {
        var inBoundsCoords = [];
        for (coordPair of coordinatesList) {
            if (this.inBounds(coordPair)) {
                inBoundsCoords.push(coordPair);
            }
        }
        return inBoundsCoords;
    },
    updateColourCount: function(colourString) {
        switch(colourString) {
            case "R":
                this.redCount += 1;
                break;
            case "G":
                this.greenCount += 1;
                break;
            case "B":
                this.blueCount += 1;
                break;
            case "Y":
                this.yellowCount += 1;
                break;
        }
    },
    checkSquare: function(coordinatePair, userColour) {
        var square = this.boardArray[coordinatePair[0]][coordinatePair[1]];
        
        if (userColour) {
            if (square === userColour) {
                return true;
            }
        } else {
            if (square === undefined) {
                return true;
            }
        }
        return false;
    },
    checkSquaresAvailable: function(coordinatesList) {
        for (coordPair of coordinatesList) {
            if (!this.checkSquare(coordPair)) {
                return false;
            }
        }
        return true;
    },
    checkCorners: function (coordinatesList, userColour) {
        var foundValidCorner = false;
        for (coordPair of coordinatesList) {
            if (this.checkSquare(coordPair, userColour)) {
                foundValidCorner = true;
            }
        }
        return foundValidCorner;  
    }
};

















module.exports = GameBoard;




















