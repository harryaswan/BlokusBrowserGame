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
	
	window.onload = function(e) {
	    var rel = [
	        [2],
	        [2],
	        [2],
	        [2,3],
	        []
	    ];
	    var piece = new GamePiece(rel);
	    console.log('arr', piece.array);
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
	        console.log(corners);
	        return corners;
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
	
	                      if (!this.array[y + 1][x]) {
	                          flatsArray.push([centerY + y + 1, centerX + x]);
	                      }
	
	                      if (!this.array[y][x]) {
	                          flatsArray.push([centerY + y - 1, centerX + x]);
	                      }
	                }
	            }
	        }
	        console.log(flatsArray);
	        return flatsArray;
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
	    flip: function() {
	        this.array = this.array.reverse();
	    },
	    getRel: function() {
	        var rel = [[],[],[],[],[]];
	        for (var y = 0; y < this.array.length; y++) {
	            for (var x = 0; x < this.array[y].length; x++) {
	                if (this.array[y][x]) {
	                    rel[y].push(x);
	                }
	            }
	        }
	        return rel;
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map