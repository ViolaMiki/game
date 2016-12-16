var area = {
    container : [],
    squares : {},
};

area.getAll = function() {
    this.squares = document.getElementsByClassName('square');
    var squareInfo = [];
    for(var i = 0; i < this.squares.length; ++i){
        var value = this.squares[i].innerText ? parseInt(this.squares[i].innerText) : 0;
        this.container[i] = new square(i, value);
    }
    return this.container;
}

area.getEmpty = function() {
    var emptySquare = [];
    this.container.forEach(function(square, index) {
        if (!square.value) {
            emptySquare.push(square.index);
        }
    }) 
    return emptySquare;
}

area.setSquare = function(index, value) {
    this.container[index].value = value;
}

area.draw = function() {
    this.container.forEach(function(square, index) {
        if (square.value) {
            this.squares[index].innerText = square.value;
            this.squares[index].setAttribute("class", "num_" + square.value + " square");
        }
    }, this)
}

area.move = function (direction) {
    
}