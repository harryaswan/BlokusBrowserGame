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
    document.getElementById('load_button').addEventListener('click', function(e) {
        var logNumber = document.getElementById('gameid_input').value; 
        loadPage('gameboard.html', document.getElementById('load_in_content'), function() {
            createGameBoard(null, parseInt(logNumber)); 
        });
        console.log('load');
        
    });
};

var displayScoreBoard = function(game) {

    var users = game.users;
    var currUser = game.currentUser;
    var blue = document.getElementById("blue_player");
    var yellow = document.getElementById("yellow_player");
    var red = document.getElementById("red_player");
    var green = document.getElementById("green_player");
    var blue_score = document.getElementById('blue_score'); 
    var yellow_score = document.getElementById('yellow_score'); 
    var red_score = document.getElementById('red_score'); 
    var green_score = document.getElementById('green_score'); 
    

    blue.innerText = users[0].name;
    yellow.innerText = users[1].name;
    red.innerText = users[2].name;
    green.innerText = users[3].name;

    blue_score.innerText = game.board[game.users[0].colourCode()];
    yellow_score.innerText = game.board[game.users[1].colourCode()];
    red_score.innerText = game.board[game.users[2].colourCode()];
    green_score.innerText = game.board[game.users[3].colourCode()];
}

var displayGameNumber = function(game) {
    var gameNumber = document.getElementById('game_number');
    gameNumber.style.color = 'white';
    gameNumber.innerText = "Game ID: " + game.uID;
}

var createGameBoard = function(users, logNumber) {
    var canvas = document.getElementById('gameboard');
    var selectCanvas = document.getElementById('selectpanel');
    // var users = ["Frank", "Jimmy", "Colin", "Dave"];
    var game = null;
    if (logNumber){
        game = new Game([], canvas, 600, selectCanvas);
        game.loadLog(parseInt(logNumber));   
    } else {
        game = new Game(users, canvas, 600, selectCanvas);
    }

    displayScoreBoard(game);
    displayGameNumber(game);
    game.redraw();

    selectCanvas.addEventListener('click', function(e) {
        game.userSelectPiece(e);
    });

    canvas.addEventListener('click', function(e) {
        game.placePiece(e);
        displayScoreBoard(game);
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
