var GamePiece = function(tiles) {
    this.array = new Array(5);
    for (var i = 0; i < 5; i++) {
      this.array[i] = new Array(5);
      for (var j = 0; j < 5; j++) {
          this.array[i][j] = 0;
      }
    }
    this.setup(tiles);
    // this.dump();


};

GamePiece.prototype = {

    setup: function(input) {
        for (var array of input) {
            if (array.length > 0) {
                for (var element of array) {
                    this.changeTile(element, input.indexOf(array), 1);
                }
            }
        }
    },
    changeTile: function(x, y, value) {
        this.array[y][x] = value;
    },
    corners: function(centerY, centerX) {
        centerY = centerY - 2;
        centerX = centerX - 2;
        var corners = [];
        for (var y = 0; y < this.array.length; y++) {
            for (var x = 0; x < this.array[y].length; x++) {

                if (this.array[y][x]) {
                    if (this.array[y + 1]) {
                        if (!this.array[y][x + 1] && !this.array[y + 1][x]) {
                            corners.push([centerY + y + 1, centerX + x + 1]);
                        }
                        if (!this.array[y][x - 1] && !this.array[y + 1][x]) {
                            corners.push([centerY + y + 1, centerX + x - 1]);
                        }
                    }

                    if (this.array[y - 1]) {
                        if (!this.array[y][x + 1] && !this.array[y - 1][x]) {
                            corners.push([centerY + y - 1, centerX + x + 1]);
                        }
                        if (!this.array[y][x - 1] && !this.array[y - 1][x]) {
                            corners.push([centerY + y - 1, centerX + x - 1]);
                        }
                    } else if (this.array[y -1] === undefined) {
                        if (!this.array[y][x + 1]) {
                            corners.push([centerY + y - 1, centerX + x + 1]);
                        }
                        if (!this.array[y][x - 1]) {
                            corners.push([centerY + y - 1, centerX + x - 1]);
                        }
                    }
                }
            }
        }
        return corners;
    }

};



module.exports = GamePiece;
