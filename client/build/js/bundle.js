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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map