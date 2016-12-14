var area = {
    container : [],
    squares : {},
};

area.getAll = function() {
    this.squares = document.getElementsByClassName('square');
    var squareInfo = [];
    for(var i = 0; i < this.squares.length; ++i){
        this.container[i+1] = 
            this.squares[i].innerText ? parseInt(this.squares[i].innerText) : 0;
    }
    return this.container;
}

area.getEmpty = function() {
    var emptySquare = [];
    this.container.forEach(function(square, index) {
        if (!square) {
            emptySquare.push(index);
        }
    }) 
    return emptySquare;
}

area.setSquare = function(index, value) {
    this.container[index] = value;
}

area.draw = function() {
    this.container.forEach(function(square, index) {
        if (square) {
            this.squares[index].innerText = square;
            this.squares[index].setAttribute("class", "num_2 square");
        }
    }, this)
}