/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var GamePiece = __webpack_require__(1);
	var RenderEngine = __webpack_require__(2);
	
	window.onload = function(e) {
	    var rel = [
	        [2],
	        [2],
	        [2],
	        [2,3],
	        []
	    ];
	    var piece = new GamePiece(rel);
	
	    var board = generateArray();
	    var canvas = document.getElementById('gameboard');
	    var render = new RenderEngine(canvas, 600);
	
	    render.redraw(board);
	
	    console.log(render);
	
	    console.log(canvas);
	
	    canvas.addEventListener('click', function(e) {
	        var cPos = render.getMousePos(e);
	        board[cPos.y][cPos.x] = "blue"; // grab colour from current user
	        render.redraw(board, e);
	    });
	
	    canvas.addEventListener('mousemove', function(e) {
	        var userColour = "green"; // grab colour from current user
	        render.redraw(board, e, userColour, rel);
	    });
	
	
	};
	var generateArray = function(){
	    var array = new Array(20);
	    for (var i = 0; i < 20; i++) {
	      array[i] = new Array(20);
	      for (var j = 0; j < 20; j++) {
	          array[i][j] = 'white';
	      }
	    }
	    return array;
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	var GamePiece = function(tiles) {
	    this.relative = tiles;
	    this.array = this.generateArray();
	    this.setup(tiles);
	
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
	                    } else if (this.array[y + 1] === undefined) {
	                        if (!this.array[y][x + 1]) {
	                            corners.push([centerY + y + 1, centerX + x + 1]);
	                        }
	                        if (!this.array[y][x - 1]) {
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
	        return this.unique(corners);
	    },
	
	    flats: function(centerY, centerX) {
	        centerY = centerY - 2;
	        centerX = centerX - 2;
	        var flatsArray = [];
	        for (var y = 0; y < this.array.length; y++) {
	            for (var x = 0; x < this.array[y].length; x++) {
	
	                if (this.array[y][x]) {
	
	                      if (!this.array[y][x + 1]) {
	                          flatsArray.push([centerY + y, centerX + x + 1]);
	                      }
	
	                      if (!this.array[y][x - 1]) {
	                          flatsArray.push([centerY + y, centerX + x - 1]);
	                      }
	
	                      if (this.array[y + 1]){
	                        if (!this.array[y + 1][x] || this.array[y + 1][x] === undefined) {
	                          flatsArray.push([centerY + y + 1, centerX + x]);
	                        }
	                      }else{
	                        flatsArray.push([centerY + y + 1, centerX + x]);
	                      }
	
	                      if (this.array[y - 1]){
	                        if (!this.array[y - 1][x] || this.array[y - 1][x] === undefined) {
	
	                          flatsArray.push([centerY + y - 1, centerX + x]);
	                        }
	                      }else{
	                        flatsArray.push([centerY + y - 1, centerX + x]);
	                      }
	                }
	            }
	        }
	        return this.unique(flatsArray);
	    },
	
	    unique: function(array){
	       var uniqueArray = [];
	       for (item of array){
	          if (!this.isItemInArray(uniqueArray, item)){
	            uniqueArray.push(item);
	          }
	       }
	       return uniqueArray;
	    },
	
	  isItemInArray: function(array, item) {
	        for (var i = 0; i < array.length; i++) {
	            // This if statement depends on the format of your array
	            if (array[i][0] == item[0] && array[i][1] == item[1]) {
	                return true;   // Found it
	            }
	        }
	        return false;   // Not found
	    },
	
	
	
	
	    rotate: function() {
	        var rotatedArray = this.generateArray();
	        for (var x = 4; x > -1; x--) {
	            for (var y = 0; y < 5; y++) {
	                var newY = y - 4;
	                if (newY < 0) {
	                    newY = newY * -1;
	                }
	                rotatedArray[x][y] = this.array[newY][x];
	            }
	        }
	        this.array = rotatedArray;
	    },
	    flip: function() { // NOTE: do we want just vertical flip - do we want horizontal flip also
	        this.array = this.array.reverse();
	    }, // NOTE: horizontal flip could be done by rotate twice and then flip ( no new functions required)
	    getRel: function() {
	        var rel = [[],[],[],[],[]];
	        for (var y = 0; y < this.array.length; y++) {
	            for (var x = 0; x < this.array[y].length; x++) {
	                if (this.array[y][x]) {
	                    rel[y].push(x);
	                }
	            }
	        }
	        this.relative = rel;
	        return this.relative;
	    },
	    generateArray: function(){
	        var array = new Array(5);
	        for (var i = 0; i < 5; i++) {
	          array[i] = new Array(5);
	          for (var j = 0; j < 5; j++) {
	              array[i][j] = 0;
	
	          }
	
	        }
	        return array;
	    }
	
	};
	
	
	
	module.exports = GamePiece;
	//
	// for each row in the array
	// take the first element
	// push it into the first row of the new array
	//
	// for each row in the array
	// take the second element
	// push it into the second row of the new array
	//
	// var i = 0;
	// while (i < 5) {
	//     rotatedArray[i].push(this.Array[i][i]);
	//     i++;
	// }


/***/ },
/* 2 */
/***/ function(module, exports) {

	var RenderEngine = function(element, heightWidth) {
	    this.canvas = element;
	    this.canvas.height = heightWidth;
	    this.canvas.width = heightWidth;
	    this.context = this.canvas.getContext('2d');
	    this.scale = heightWidth / 20;
	};
	
	RenderEngine.prototype = {
	    fillBox: function(x, y, colour) {
	        this.context.fillStyle = colour;
	        this.context.fillRect(x*this.scale, y*this.scale, this.scale, this.scale);
	    },
	    fillBoard: function(board) {
	        for (var y = 0; y < board.length; y++) {
	            for (var x = 0; x < board[y].length; x++) {
	                this.fillBox(x,y,board[y][x]);
	            }
	        }
	    },
	    getMousePos: function(e) {
	        var rect = this.canvas.getBoundingClientRect();
	        x = e.clientX - rect.left;
	        y = e.clientY - rect.top;
	        return {x: parseInt(x / this.scale), y: parseInt(y / this.scale)};
	    },
	    redraw: function(board, mouseEvent, userColour, piece) {
	        if (mouseEvent) {
	            var curPos = this.getMousePos(mouseEvent);
	        }
	        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	        this.fillBoard(board);
	        if (curPos && piece) {
	            this.highlightBox(curPos, userColour, piece);
	        }
	        this.drawGrid();
	    },
	    highlightBox: function(pos, userColour, piece) {
	        this.context.beginPath();
	        this.context.strokeStyle = userColour;
	        this.context.lineWidth = this.scale / 5;
	        var x = pos.x - 2;
	        var y = pos.y - 2;
	        for (var i = 0; i < piece.length; i++) {
	            if (piece[i]) {
	                for (var j = 0; j < piece[i].length; j++) {
	                    this.drawBoxPart(x + piece[i][j], y+i, 'top');
	                    this.drawBoxPart(x + piece[i][j], y+i, 'bottom');
	                    this.drawBoxPart(x + piece[i][j], y+i, 'left');
	                    this.drawBoxPart(x + piece[i][j], y+i, 'right');
	                }
	            }
	        }
	        this.context.stroke();
	        this.context.lineWidth = 1;
	    },
	    drawBoxPart: function(x, y, box) {
	        x *= this.scale;
	        y *= this.scale;
	        switch (box) {
	            case 'top':
	                this.context.moveTo(x + 1, y + 1);
	                this.context.lineTo(x + (this.scale-1), y + 1);
	                break;
	            case 'left':
	                this.context.moveTo(x + 1, y + 1);
	                this.context.lineTo(x + 1, y + (this.scale-1));
	                break;
	            case 'right':
	                this.context.moveTo(x + (this.scale-1), y + 1);
	                this.context.lineTo(x + (this.scale-1), y + (this.scale-1));
	                break;
	            case 'bottom':
	                this.context.moveTo(x + 1, y + (this.scale-1));
	                this.context.lineTo(x + (this.scale-1), y + (this.scale-1));
	                break;
	        }
	    },
	    drawGrid: function() {
	        this.context.beginPath();
	        var i = 0;
	        while ( i <= this.canvas.width ) {
	            this.context.strokeStyle = "black";
	            this.context.moveTo(i,0);
	            this.context.lineTo(i, this.canvas.height);
	            this.context.moveTo(0,i);
	            this.context.lineTo(this.canvas.width, i);
	            i = i + this.scale;
	        }
	        this.context.stroke();
	    }
	};
	
	module.exports = RenderEngine;
	
	// canvas.addEventListener('mousemove', function(e) {
	//     var pieceRel = [
	//         [2],
	//         [2],
	//         [2],
	//         [2,3],
	//         []
	//     ];
	//     var userColour = "green"; // grab colour from current user
	//
	//     render.redraw(board, e, userColour, pieceRel);
	// });
	//
	// canvas.addEventListener('click', function(e) {
	//     var cPos = render.getMousePos(e);
	//     board[cPos.y][cPos.x] = "blue"; // grab colour from current user
	//     console.log(board);
	//     render.redraw(board, e);
	// });


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map