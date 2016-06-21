var Game = require('./models/game.js');
var User = require('./models/user.js');
var Preview = require('./models/preview_pane.js');

window.onload = function(e) {

    var canvas = document.getElementById('gameboard');
    var preview1 = document.getElementById('preview1');
    var preview2 = document.getElementById('preview2');
    var preview3 = document.getElementById('preview3');
    var preview_main = document.getElementById('preview_main');
    var users = [new User("Jimmy", "Red"), new User("John", "Blue")];//, new User("Frank", "Green"), new User("Colin", "Yellow")];

    var game = new Game(users, canvas, preview1, preview2, preview3, preview_main, 600);
    game.redraw();
    game.draw_preview1();
    game.draw_preview2();
    game.draw_preview3();
    game.draw_preview_main();

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
        }
    });
};







