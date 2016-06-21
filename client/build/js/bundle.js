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

	var Game = __webpack_require__(3);
	var User = __webpack_require__(6);
	
	window.onload = function(e) {
	
	    var canvas = document.getElementById('gameboard');
	    var users = [new User("Jimmy", "Red"), new User("John", "Blue"), new User("Frank", "Green"), new User("Colin", "Yellow")];
	
	    var game = new Game(users, canvas, 600);
	    game.redraw();
	
	    canvas.addEventListener('click', function(e) {
	        game.placePiece(e);
	    });
	    canvas.addEventListener('mousemove', function(e) {
	        game.onHover(e);
	    });
	    window.addEventListener('keyup', function(e) {
	        if (e.keyCode === 82) {
	            game.rotatePiece();
	            console.log('rotate');
	        } else if (e.keyCode === 70) {
	            game.flipPiece();
	            console.log('flip');
	        } else if (e.keyCode === 83) {
	            game.saveLog();
	        } else if (e.keyCode ===76) {
	            game.loadLog();
	        }
	    });
	
	    document.getElementById('skip_button').addEventListener('click', function(e) {
	        console.log('skip/end play');
	        game.skipTurn();
	    });
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
	    corners: function(coordinates) {
	        var startY = coordinates[0] - 2;
	        var startX = coordinates[1] - 2;
	        var corners = [];
	        for (var y = 0; y < this.array.length; y++) {
	            for (var x = 0; x < this.array[y].length; x++) {
	
	                if (this.array[y][x]) {
	                    if (this.array[y + 1]) {
	                        if (!this.array[y][x + 1] && !this.array[y + 1][x]) {
	                            corners.push([startY + y + 1, startX + x + 1]);
	                        }
	                        if (!this.array[y][x - 1] && !this.array[y + 1][x]) {
	                            corners.push([startY + y + 1, startX + x - 1]);
	                        }
	                    } else if (this.array[y + 1] === undefined) {
	                        if (!this.array[y][x + 1]) {
	                            corners.push([startY + y + 1, startX + x + 1]);
	                        }
	                        if (!this.array[y][x - 1]) {
	                            corners.push([startY + y + 1, startX + x - 1]);
	                        }
	                    }
	
	                    if (this.array[y - 1]) {
	                        if (!this.array[y][x + 1] && !this.array[y - 1][x]) {
	                            corners.push([startY + y - 1, startX + x + 1]);
	                        }
	                        if (!this.array[y][x - 1] && !this.array[y - 1][x]) {
	                            corners.push([startY + y - 1, startX + x - 1]);
	                        }
	                    } else if (this.array[y -1] === undefined) {
	                        if (!this.array[y][x + 1]) {
	                            corners.push([startY + y - 1, startX + x + 1]);
	                        }
	                        if (!this.array[y][x - 1]) {
	                            corners.push([startY + y - 1, startX + x - 1]);
	                        }
	                    }
	                }
	            }
	        }
	        return this.unique(corners);
	    },
	
	    flats: function(coordinates) {
	        var startY = coordinates[0] - 2;
	        var startX = coordinates[1] - 2;
	        var flatsArray = [];
	        for (var y = 0; y < this.array.length; y++) {
	            for (var x = 0; x < this.array[y].length; x++) {
	
	                if (this.array[y][x]) {
	
	                      if (!this.array[y][x + 1]) {
	                          flatsArray.push([startY + y, startX + x + 1]);
	                      }
	
	                      if (!this.array[y][x - 1]) {
	                          flatsArray.push([startY + y, startX + x - 1]);
	                      }
	
	                      if (this.array[y + 1]){
	                        if (!this.array[y + 1][x] || this.array[y + 1][x] === undefined) {
	                          flatsArray.push([startY + y + 1, startX + x]);
	                        }
	                      }else{
	                        flatsArray.push([startY + y + 1, startX + x]);
	                      }
	
	                      if (this.array[y - 1]){
	                        if (!this.array[y - 1][x] || this.array[y - 1][x] === undefined) {
	
	                          flatsArray.push([startY + y - 1, startX + x]);
	                        }
	                      }else{
	                        flatsArray.push([startY + y - 1, startX + x]);
	                      }
	                }
	            }
	        }
	        return this.unique(flatsArray);
	    },
	
	    covered: function(coordinates) {
	        var startY = coordinates[0] - 2;
	        var startX = coordinates[1] - 2;
	        coveredSquares = [];
	        for (var y = 0; y < this.array.length; y++) {
	            for (var x = 0; x < this.array[y].length; x++) {
	                if (this.array[y][x]) {
	                    coveredSquares.push([startY + y, startX + x]);
	                }
	            }
	        }
	        return coveredSquares;
	    },
	
	    unique: function(array){
	       var uniqueArray = [];
	       for (var item of array){
	          if (!this.isItemInArray(uniqueArray, item)){
	            uniqueArray.push(item);
	          }
	       }
	       return uniqueArray;
	    },
	
	  isItemInArray: function(array, item) {
	        for (var i = 0; i < array.length; i++) {
	            if (array[i][0] == item[0] && array[i][1] == item[1]) {
	                return true;
	            }
	        }
	        return false;
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
	        this.getRel();
	    },
	    flip: function() { // NOTE: do we want just vertical flip - do we want horizontal flip also
	        this.array = this.array.reverse();
	        this.getRel();
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
	        this.context.fillStyle = colour.light;
	        this.context.fillRect(x*this.scale, y*this.scale, this.scale, this.scale);
	
	        this.context.fillStyle = colour.dark;
	        // switch(colour) {
	        //     case 'red':
	        //         this.context.fillStyle = 'darkred';
	        //         break;
	        //     case 'green':
	        //         this.context.fillStyle = 'darkgreen';
	        //         break;
	        //     case 'yellow':
	        //         this.context.fillStyle = 'black';
	        //         break;
	        //     case 'blue':
	        //         this.context.fillStyle = 'black';
	        //         break;
	        // }
	
	
	
	
	        this.context.fillRect((x*this.scale)+3, (y*this.scale)+3, this.scale-6, this.scale-6);
	        this.context.fillStyle = colour.light;
	        this.context.fillRect((x*this.scale)+5, (y*this.scale)+5, this.scale-10, this.scale-10);
	        // this.context.moveTo(x*this.scale + 2, y*this.scale + 2);
	        // this.context.lineTo(x*this.scale + (this.scale-2), y*this.scale + (this.scale - 2));
	        this.context.lineWidth = 1;
	    },
	    fillBoard: function(board) {
	        for (var y = 0; y < board.length; y++) {
	            for (var x = 0; x < board[y].length; x++) {
	                this.fillBox(x,y,this.getUserColour(board[y][x]));
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
	        var curPos = null;
	        if (mouseEvent) {
	            curPos = this.getMousePos(mouseEvent);
	        }
	        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	        this.fillBoard(board);
	        if (curPos &&  userColour &&piece) {
	            this.highlightBox(curPos, userColour, piece);
	        }
	        this.drawGrid();
	    },
	    highlightBox: function(pos, userColour, piece) {
	        this.context.beginPath();
	        this.context.strokeStyle = this.getUserColour(userColour).light;
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
	            this.context.strokeStyle = "#837E7C";
	            this.context.moveTo(i,0);
	            this.context.lineTo(i, this.canvas.height);
	            this.context.moveTo(0,i);
	            this.context.lineTo(this.canvas.width, i);
	            i = i + this.scale;
	        }
	        this.context.stroke();
	    },
	    getUserColour: function(colour) {
	        switch (colour) {
	            case 'R':
	                return {light: '#F62217', dark: '#800517'};//red;light coral, ruby
	            case 'G':
	                return {light: '#4CC417', dark: '#437C17'};//green
	            case 'B':
	                return {light: '#488AC7', dark: '#1F45FC'};//blue; blue eyes, orchid
	            case 'Y':
	                return {light: '#FFFF00', dark: '#C68E17'};//yellow; rubberduck, caramel
	            default:
	                return {light: '#FFFFFF', dark: '#E5E4E2'};
	        }
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var GameBoard = __webpack_require__(4);
	var RenderEngine = __webpack_require__(2);
	var PresetPieces = __webpack_require__(5);
	var Log = __webpack_require__(7);
	var GamePiece = __webpack_require__(1);
	
	var Game = function(users, canvasElement, canvasWidth) {
	    this.users = users;
	    this.currentUser = 0;
	    this.board = new GameBoard();
	    this.render = new RenderEngine(canvasElement, canvasWidth);
	    this.log = new Log();
	    this.assignPieces();
	    this.playing = true;
	    this.logPlaying = false;
	    this.uID = parseInt(Math.random() * 10000);
	    this.logStartGame();
	};
	
	Game.prototype = {
	
	    logStartGame: function() {
	        this.log.setGameID(this.uID);
	        for (var i = 0; i < this.users.length; i++) {
	            this.log.addData('username', this.users[i].name);
	        }
	    },
	    assignPieces: function() {
	        for (var user of this.users) {
	            user.pieces = new PresetPieces().generatePieces();
	        }
	    },
	    placePiece: function(e, pieceRel) {
	        if (this.playing) {
	            var cPos = this.render.getMousePos(e);
	            var curUser = this.users[this.currentUser];
	            var curPiece = null;
	            if (pieceRel) {
	                curPiece = new GamePiece(pieceRel);
	            } else {
	                curPiece = curUser.getSelectedPiece();
	            }
	            if (this.board.placePiece([cPos.y, cPos.x], curPiece, curUser.colourCode())) {
	                new Audio('metal_off_switch.mp3').play();
	                curUser.removeSelectedPiece();
	                this.render.redraw(this.board.boardArray);
	                this.nextPlayer();
	                if (!this.logPlaying) {
	                    this.log.addData('place', {pos:{clientX: e.clientX, clientY: e.clientY}, rel:curPiece.relative});
	                }
	            } else {
	                new Audio('single_oil_can.mp3').play();
	            }
	        }
	    },
	    nextPlayer: function() {
	        if (this.checkPlayersPlaying()) {
	            this.currentUser++;
	            if (this.currentUser >= this.users.length) {
	                this.currentUser = 0;
	            }
	            if (!this.checkPlayerPlaying(this.currentUser)) {
	                this.nextPlayer();
	            }
	        } else {
	            this.playing = false;
	            this.render.redraw(this.board.boardArray);
	            alert('Game over');
	        }
	
	    },
	    checkPlayerPlaying: function(index) {
	        return this.users[index].playing;
	    },
	    checkPlayersPlaying: function() {
	        var count = 0;
	        for (var i = 0; i < this.users.length; i++) {
	            if (!this.checkPlayerPlaying(i)) {
	                count++;
	            }
	        }
	        if (count < this.users.length) {
	            return true;
	        }
	        return false;
	    },
	    currUser: function() {
	        return this.users[this.currentUser];
	    },
	    onHover: function(e) {
	        if (this.playing) {
	            var curUser = this.currUser();
	            this.render.redraw(this.board.boardArray, e, curUser.colourCode(), curUser.getSelectedPiece().relative);
	        }
	    },
	    rotatePiece: function() {
	        if (this.playing) {
	            this.currUser().rotatePiece();
	        }
	    },
	    flipPiece: function() {
	        if (this.playing) {
	            this.currUser().flipPiece();
	        }
	    },
	    redraw: function() {
	        this.render.redraw(this.board.boardArray);
	    },
	    skipTurn: function() {
	        if (this.playing) {
	            this.currUser().endPlay();
	            this.nextPlayer();
	            if (!this.logPlaying) {
	                this.log.addData('skip', null);
	            }
	        }
	    },
	    saveLog: function() {
	        this.log.saveData();
	    },
	    loadLog: function() {
	        this.log.loadData(this.playFromLog);
	    },
	    playFromLog: function(logData) {
	        console.log('logdata',logData);
	    }
	};
	
	module.exports = Game;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var GameBoard = function() {
	    // this.board = new Array(20);
	    // for (var i = 0; i < 20; i++) {
	    //   this.board[i] = new Array(20);
	    // }
	    this.boardArray = this.generateBoardArray();
	    this.R = 0;
	    this.G = 0;
	    this.B = 0;
	    this.Y = 0;
	};
	
	GameBoard.prototype = {
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
	            if (this.boardArray[coordinates[0]][coordinates[1]] !== undefined) {
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
	        for (var coordPair of coordinatesList) {
	            if (this.inBounds(coordPair)) {
	                inBoundsCoords.push(coordPair);
	            }
	        }
	        return inBoundsCoords;
	    },
	
	    isInBounds: function(coordinatesList){
	        if(this.listInBounds(coordinatesList).length === coordinatesList.length){
	            return true;
	        } else {
	            return false;
	        }
	
	    },
	
	    updateColourCount: function(colourString) {
	        this[colourString] += 1;
	    },
	    checkSquare: function(coordinatePair, userColour) {
	        var square = this.boardArray[coordinatePair[0]][coordinatePair[1]];
	        if (userColour) {
	            if (square === userColour) {
	                return true;
	            }
	        } else {
	            if (!square) {
	                return true;
	            }
	        }
	        return false;
	    },
	    checkSquaresAvailable: function(coordinatesList) {
	        for (var coordPair of coordinatesList) {
	            if (!this.checkSquare(coordPair)) {
	                return false;
	            }
	        }
	        return true;
	    },
	    checkCorners: function (coordinatesList, userColour) {
	        var foundValidCorner = false;
	        for (var coordPair of coordinatesList) {
	            if (this.checkSquare(coordPair, userColour)) {
	                foundValidCorner = true;
	            }
	        }
	        return foundValidCorner;
	    },
	
	    checkEdges: function( coordinatesList, userColour) {
	        return !this.checkCorners(coordinatesList, userColour);
	    },
	
	    isLegal: function( coordinates, piece, userColour ){
	        if (this[userColour] === 0) {
	
	            if(!this.cornerSquare(piece.covered(coordinates))) {
	                return false;
	            }
	        }
	        if(this.isInBounds(piece.covered(coordinates))){
	            if(this.checkSquaresAvailable(piece.covered(coordinates))){
	                if(this.checkEdges(this.listInBounds(piece.flats(coordinates)), userColour)){
	                    if(this[userColour] === 0 || this.checkCorners(this.listInBounds(piece.corners(coordinates)), userColour)){
	                        return true;
	                    }
	                }
	            }
	        }
	        return false;
	    },
	
	    cornerSquare: function( coordinatesList ){
	        for( var item of coordinatesList ){
	            if( (item[0] === 0 && item[1] === 0) || ( item[0] === 0 && item[1] === 19) || (item[0] === 19 && item[1] === 0) || (item[0] === 19 && item[1] === 19)){
	                return true;
	            }
	        }
	        return false;
	    },
	
	    placePiece: function(coordinates, piece, userColour){
	        if (this.isLegal(coordinates, piece, userColour)) {
	            for (var pair of piece.covered(coordinates)) {
	                this.fill(pair, userColour);
	            }
	            return true;
	        }
	        return false;
	    }
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	module.exports = GameBoard;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var GamePiece = __webpack_require__(1);
	
	var PresetPieces = function() {
	    this.rels = [
	        [[ ], [ ], [2], [ ], [ ]],
	        [[ ], [ ], [2,3], [ ], [ ]],
	        [[ ], [ ], [1,2], [2], [ ]],
	        [[ ], [ ], [1,2,3], [ ], [ ]],
	        [[ ], [ 2,3], [2,3], [ ], [ ]],
	        [[ ], [2], [1,2,3], [ ], [ ]],
	        [[ ], [ ], [1,2,3,4], [ ], [ ]],
	        [[ ], [3], [1,2,3], [ ], [ ]],
	        [[ ], [2,3], [1,2], [ ], [ ]],
	        [[ ], [1], [1,2,3,4], [ ], [ ]],
	        [[ ], [2], [2], [1,2,3 ], [ ]],
	        [[2], [2], [2,3,4], [ ], [ ]],
	        [[ ], [ ], [2,3,4], [1,2 ], [ ]],
	        [[ ], [3], [1,2,3], [1], [ ]],
	        [[2], [2], [2], [2], [2]],
	        [[ ], [2], [2,3], [2,3], [ ]],
	        [[ ], [2,3], [1,2], [1], [ ]],
	        [[ ], [2,3], [2], [2,3], [ ]],
	        [[ ], [ 2,3], [1,2], [ 1], [ ]],
	        [[ ], [2], [1,2,3], [2], [ ]],
	        [[ ], [2], [1,2,3,4], [ ], [ ]]
	    ];
	};
	
	PresetPieces.prototype = {
	    generatePieces: function() {
	        var pieces = [];
	        for (var i = 0; i < this.rels.length; i++) {
	            pieces.push(new GamePiece(this.rels[i]));
	        }
	        return pieces;
	    }
	};
	
	module.exports = PresetPieces;
	
	// ONE           = [[ ],
	//                  [ ],
	//                  [2],
	//                  [ ],
	//                  [ ]];
	//
	// TWO           = [[ ],
	//                 [ ],
	//                 [2,3],
	//                 [ ],
	//                 [ ]];
	//
	// THREE         = [[ ],
	//                  [ ],
	//                  [1,2],
	//                  [ 2],
	//                  [ ]];
	//
	// FOUR            = [[ ],
	//                   [ ],
	//                   [1,2,3],
	//                   [ ],
	//                   [ ]];
	//
	// FIVE          = [[ ],
	//                  [ 2,3],
	//                  [2,3],
	//                  [ ],
	//                  [ ]];
	//
	// SIX          = [[ ],
	//                 [ 2],
	//                 [1,2,3],
	//                 [ ],
	//                 [ ]]
	//
	// SEVEN        = [[ ],
	//                 [ ],
	//                 [1,2,3,4],
	//                 [ ],
	//                 [ ]];
	//
	// EIGHT        = [[ ],
	//                 [ 3],
	//                 [1,2,3],
	//                 [ ],
	//                 [ ]]
	//
	// NINE         = [[ ],
	//                 [ 2,3],
	//                 [1,2],
	//                 [ ],
	//                 [ ]]
	//
	// TEN          = [[ ],
	//                 [ 1],
	//                 [1,2,3,4],
	//                 [ ],
	//                 [ ]]
	//
	// ELEVEN        = [[ ],
	//                 [ 2],
	//                 [2],
	//                 [1,2,3 ],
	//                 [ ]]
	//
	// TWELVE       = [[2 ],
	//                 [ 2],
	//                 [2,3,4],
	//                 [ ],
	//                 [ ]]
	//
	// THIRTEEN     = [[ ],
	//                 [ ],
	//                 [2,3,4],
	//                 [1,2 ],
	//                 [ ]]
	//
	// FOURTEEN     = [[ ],
	//                 [ 3],
	//                 [1,2,3],
	//                 [ 1],
	//                 [ ]]
	//
	// FIFTEEN      = [[ 2],
	//                 [ 2],
	//                 [2],
	//                 [ 2],
	//                 [ 2]]
	//
	// SIXTEEN      = [[ ],
	//                 [ 2],
	//                 [2,3],
	//                 [ 2,3],
	//                 [ ]]
	//
	// SEVENTEEN    = [[ ],
	//                 [ 2,3],
	//                 [1,2],
	//                 [ 1],
	//                 [ ]]
	//
	// EIGHTEEN     = [[ ],
	//                 [ 2,3],
	//                 [2],
	//                 [ 2,3],
	//                 [ ]]
	//
	// NINETEEN     = [[ ],
	//                 [ 2,3],
	//                 [1,2],
	//                 [ 1],
	//                 [ ]]
	//
	// TWENTY       = [[ ],
	//                 [ 2],
	//                 [1,2,3],
	//                 [ 2],
	//                 [ ]]
	//
	// TWENTY-ONE   = [[ ],
	//                 [ 2],
	//                 [1,2,3,4],
	//                 [ ],
	//                 [ ]]


/***/ },
/* 6 */
/***/ function(module, exports) {

	var User = function(name, colour) {
	    this.name = name;
	    this.colour = colour;
	    this.pieces = [];
	    this.selectedPieceIndex = 0;
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
	    removeSelectedPiece: function() {
	        this.pieces.splice(this.selectedPieceIndex, 1);
	        this.selectPiece = null;
	        if (this.pieces.length === 0) {
	            this.playing = false;
	        }
	    },
	    endPlay: function() {
	        this.playing = false;
	    }
	};
	
	module.exports = User;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Log = function() {
	      this.data = [];
	      this.currentIndex = 0;
	      this.gameID = null;
	};
	
	Log.prototype = {
	
	    setGameID: function(id) {
	        this.gameID = id;
	    },
	    addData: function(action, options) {
	        this.data.push({action: action, options: options});//action = skip or place; options = rel + position
	        console.log(this.data);
	    },
	    grabData: function() {
	        var data = this.data[this.currentIndex];
	        this.nextIndex();
	        return data;
	    },
	    nextIndex: function() {
	        this.currentIndex++;
	        if (this.currentIndex === this.data.length) {
	          this.currentIndex = null;
	        }
	    },
	    saveData: function() {
	        var request = new XMLHttpRequest();
	        request.onload = function() {
	            if (request.status === 200) {
	                console.log('saved the data');
	            }
	        }
	        request.open('POST', 'log');
	        request.setRequestHeader('Content-Type', 'application/json');
	        var data = {game: this.gameID, data: this.data};
	        console.log(JSON.stringify(data));
	        request.send(JSON.stringify(data));
	    },
	    loadData: function(callback, context) {
	        var request = new XMLHttpRequest();
	        request.onload = function() {
	            if (request.status === 200) {
	                console.log('got the data');
	                console.log(request.responseText);
	                callback(JSON.parse(request.responseText));    
	                
	            }
	        }
	        request.open('GET', 'log');
	        request.send(JSON.stringify({game: this.gameID}));
	    },
	    setData: function(data) {
	        this.data = data;
	    }
	
	};
	
	
	
	
	module.exports = Log;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map