var User = function(name, colour) {
    this.name = name;
    this.colour = colour;
    this.pieces = [];
};

User.prototype = {

    colourCode: function() {
        return this.colour[0].toUpperCase();
    }
}

    module.exports = User;