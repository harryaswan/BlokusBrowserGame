var RenderEngine = function(element, heightWidth) {
    this.canvas = element;
    this.canvas.height = heightWidth;
    this.canvas.width = heightWidth;
    this.context = this.canvas.getContext('2d');
    this.scale = heightWidth / 20;
};

RenderEngine.prototype = {
    fillBox: function(x, y, colour) {
        this.context.fillStyle = colour;
        this.context.fillRect(x*this.scale, y*this.scale, this.scale, this.scale);
    },
    fillBoard: function(board) {
        for (var y = 0; y < board.length; y++) {
            for (var x = 0; x < board[y].length; x++) {
                this.fillBox(x,y,board[y][x]);
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
        var curPos = render.getMousePos(mouseEvent);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fillBoard(board);
        if (curPos && piece) {
            this.highlightBox(curPos, userColour, piece);
        }
        this.drawGrid();
    },
    highlightBox: function(pos, userColour, piece) {
        this.context.beginPath();
        this.context.strokeStyle = userColour;
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
            this.context.strokeStyle = "black";
            this.context.moveTo(i,0);
            this.context.lineTo(i, this.canvas.height);
            this.context.moveTo(0,i);
            this.context.lineTo(this.canvas.width, i);
            i = i + this.scale;
        }
        this.context.stroke();
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
