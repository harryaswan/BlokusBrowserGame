var Game = require('./models/game.js');
var User = require('./models/user.js');

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
        }
    });

    document.getElementById('skip_button').addEventListener('click', function(e) {
        console.log('skip/end play');
        game.skipTurn();
    });
};
