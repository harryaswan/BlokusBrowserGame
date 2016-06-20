var GamePiece = require('./models/gamepiece.js');
var RenderEngine = require('./models/renderengine.js');

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
