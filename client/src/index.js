var Game = require('./models/game.js');
var User = require('./models/user.js');

window.onload = function(e) {

    var canvas = document.getElementById('gameboard');
    var users = [];
    users.push(new User("Jimmy", "Red"));
    users.push(new User("John", "Blue"));
    users.push(new User("Frank", "Green"));
    users.push(new User("Colin", "Yellow"));
    var game = new Game(users, canvas, 600);

    canvas.addEventListener('click', function(e) {
        game.placePiece(e, game);
    });

    canvas.addEventListener('mousemove', function(e) {
        game.onHover(e, game);
    });


};
