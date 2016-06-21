var RenderEngine = function(element, height, width) {
    this.canvas = element;
    this.canvas.height = height;
    this.canvas.width = width;
    this.context = this.canvas.getContext('2d');
    this.scale = height / 20;
    this.preview_scale = height / 10;

    this.preview_scale_height = height / 10;
    this.preview_scale_width = width / 10;
};

RenderEngine.prototype = {
    fillBox: function(x, y, colour) {
        this.context.fillStyle = colour;
        this.context.fillRect(x*this.scale, y*this.scale, this.scale, this.scale);
    },

    fillPreviewBox: function(x, y, colour) {
        this.context.fillStyle = colour;
        this.context.fillRect(x*this.preview_scale_width, y*this.preview_scale_height, this.preview_scale_width, this.preview_scale_height);
    },

    fillBoard: function(board) {
        for (var y = 0; y < board.length; y++) {
            for (var x = 0; x < board[y].length; x++) {
                this.fillBox(x,y,this.getUserColour(board[y][x]));
            }
        }
    },

    fillPreviewBoard: function(preview) {
        for (var y = 0; y < preview.length; y++) {
            for (var x = 0; x < preview[y].length; x++) {
                this.fillPreviewBox(x,y,this.getUserColour(preview[y][x]));
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

    redrawPreview: function(preview, mouseEvent, userColour, piece) {
        var curPos = null;
        if (mouseEvent) {
            curPos = this.getMousePos(mouseEvent);
        }
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fillPreviewBoard(preview);
        if (curPos &&  userColour &&piece) {
            this.highlightBox(curPos, userColour, piece);
        }
        this.drawPreviewGrid();
    },

    highlightBox: function(pos, userColour, piece) {
        this.context.beginPath();
        this.context.strokeStyle = this.getUserColour(userColour);
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
    },

    drawPreviewGrid: function() {
        this.context.beginPath();
        var i = 0;
        while ( i <= this.canvas.width ) {
            this.context.strokeStyle = "black";
            this.context.moveTo(i,0);
            this.context.lineTo(i, this.canvas.height);
            this.context.moveTo(0,i);
            this.context.lineTo(this.canvas.width, i);
            i = i + this.preview_scale;
        }
        this.context.stroke();
    },

    getUserColour: function(colour) {
        switch (colour) {
            case 'R':
                return 'red';
            case 'G':
                return 'green';
            case 'B':
                return 'blue';
            case 'Y':
                return 'yellow';
            default:
                return 'white';
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
