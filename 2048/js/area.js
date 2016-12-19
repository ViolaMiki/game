var area = {
    container: [],
    squares: {},
    startIndex: {
        down: [12, 13, 14, 15],
        up: [0, 1, 2, 3],
        right: [3, 7, 11, 15],
        left: [0, 4, 8, 12],
    },
    back: { up: 'down', down: 'up', left: 'right', right: 'left' },
};

area.getAll = function () {
    this.squares = document.getElementsByClassName('square');
    var squareInfo = [];
    for (var i = 0; i < this.squares.length; ++i) {
        var value = this.squares[i].innerText ? parseInt(this.squares[i].innerText) : 0;
        this.container[i] = new square(i, value);
    }
    return this.container;
}

area.getEmpty = function () {
    var emptySquare = [];
    this.container.forEach(function (square, index) {
        if (!square.value) {
            emptySquare.push(square.index);
        }
    })
    return emptySquare;
}

area.setSquare = function (index, value) {
    this.container[index].value = value;
}

area.draw = function () {
    this.container.forEach(function (square, index) {
        if (square.value) {
            this.squares[index].innerText = square.value;
            this.squares[index].setAttribute("class", "num_" + square.value + " square");
        } else {
            this.squares[index].innerText = '';
            this.squares[index].setAttribute("class", "square");
        }
    }, this)
}

area.newSquare = function () {
    empty = this.getEmpty();
    index = Math.floor(Math.random() * empty.length);
    this.setSquare(empty[index], 2);
}

area.move = function (direction) {
    this.startIndex[direction].forEach(function (index) {
        var change = true;
        while (change) {
            change = this.updateValue(index, direction);
        }
        this.updateValue(index, direction)
    }, this);
}

area.updateValue = function (index, direction) {
    var change = false;
    do {
        var nextIndex = this.container[index][direction]();
        var nextValue = this.container[nextIndex].value;
        var value = this.container[index].value;
        switch (value) {
            case 0:
                if (nextValue) {
                    this.container[index].value = nextValue;
                    this.container[nextIndex].value = 0;
                    change = true;
                }
                break;
            case nextValue:
                this.container[index].value += nextValue;
                this.container[nextIndex].value = 0;
                change = true;
                break;
        }
        index = nextIndex;
    } while (this.startIndex[this.back[direction]].indexOf(index) === -1)

    return change;
}