var Game = require('./models/game.js');
var User = require('./models/user.js');

window.onload = function(e) {

    var content = document.getElementById('load_in_content');
    loadPage('login.html', content, createLoginScreen);

};

var loadPage = function(url, element, callback) {
    var request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status === 200) {
            element.innerHTML = request.responseText;
            callback();
        }
    };
    request.open("GET", url);
    request.send(null);
};

var createLoginScreen = function() {
    var button = document.getElementById('play_button');
    button.addEventListener('click', function(e) {
        var blue = document.getElementById('blue_user').value;
        var yellow = document.getElementById('yellow_user').value;
        var red = document.getElementById('red_user').value;
        var green = document.getElementById('green_user').value;
        var users = [];
        users = [blue, yellow, red, green];
        console.log(users);
        for (var i = 0; i < users.length; i++) {
            if (users[i] === '') {
                users[i] = 'Player ' + (i + 1);
            }
        }
        loadPage('gameboard.html', document.getElementById('load_in_content'), function() {
            createGameBoard(users);
        });
    });
};

var createGameBoard = function(users) {
    var canvas = document.getElementById('gameboard');
    var selectCanvas = document.getElementById('selectpanel');
    // var users = ["Frank", "Jimmy", "Colin", "Dave"];

    var game = new Game(users, canvas, 600, selectCanvas);
    game.redraw();

    selectCanvas.addEventListener('click', function(e) {
        game.userSelectPiece(e);
    });

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

    document.getElementById('load_button').addEventListener('click', function(e) {
        console.log('load');
        game.loadLog(parseInt(document.getElementById('gameid_input').value));
    });
};
