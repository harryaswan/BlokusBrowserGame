var GamePiece = require('./models/gamepiece.js');

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
