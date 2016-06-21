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

    game.redraw();

    canvas.addEventListener('click', function(e) {
        game.placePiece(e);
        // var cPos = game.render.getMousePos(e);
        // var curUser = game.users[game.currentUser];
        // console.log('test',curUser.getSelectedPiece());
        // if (game.placePiece([cPos.y, cPos.x], curUser.getSelectedPiece(), curUser.colourCode(), game)) {
        //     console.log('placed');
        //     curUser.removeSelectedPiece();
        //     game.render.redraw(game.board.boardArray);
        //     game.nextPlayer();
        // } else {
        //     console.log('not placed');
        // }
    });

    canvas.addEventListener('mousemove', function(e) {
        game.onHover(e);
    });

    window.addEventListener('keyup', function(e) {
        if (e.keyCode === 82) {
            game.rotatePiece();
        } else if (ee.keyCode === 70) {
            game.flipPiece();
        }
    });

};
