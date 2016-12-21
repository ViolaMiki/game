var area = {
    container: [],
    squares: {},
    startIndex: {
        bottom: [12, 13, 14, 15],
        top: [0, 1, 2, 3],
        right: [3, 7, 11, 15],
        left: [0, 4, 8, 12],
    },
    back: { bottom: 'top', top: 'bottom', left: 'right', right: 'left' },
    font_size: [55, 45],
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
            if (emptySquare.push(square.index)) {
                console.log(1);
            }
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
            this.squares[index].innerHTML = '<div class="num_' + square.value + '">' + square.value + '</div>';
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
    var newNode = this.squares[empty[index]].firstElementChild;
    newNode.style.animation = "new 0.5s";
    area.addStyle(newNode, 2);
}

area.move = function (direction) {
    this.startIndex[direction].forEach(function (index) {
        this.updateValue(index, direction);
        this.updateValue(index, direction)
    }, this);
}

area.updateValue = function (index, direction) {
    var change = false;
    var default_index = index;
    var timer = setInterval(function () {
        if (area.startIndex[area.back[direction]].indexOf(index) === -1) {
            var nextIndex = area.container[index][direction]();
            var nextValue = area.container[nextIndex].value;
            var value = area.container[index].value;
            switch (value) {
                case 0:
                    if (nextValue) {
                        area.container[index].value = nextValue;
                        area.container[nextIndex].value = 0;
                        area.moveStyle(area.squares[nextIndex].firstElementChild, direction);
                        area.changeStyle(area.squares[nextIndex].firstElementChild, area.container[nextIndex].value,
                            area.squares[index].firstElementChild, area.container[index].value);
                        change = true;
                    }
                    break;
                case nextValue:
                    area.container[index].value += nextValue;
                    area.container[nextIndex].value = 0;
                    area.moveStyle(area.squares[nextIndex].firstElementChild, direction);
                    area.changeStyle(area.squares[nextIndex].firstElementChild, area.container[nextIndex].value,
                        area.squares[index].firstElementChild, area.container[index].value);
                    change = true;
                    break;
            }
            index = nextIndex;
        } else if (change) {
            index = default_index;
        } else {
            clearInterval(timer);
            return true;
        }
    }, 500);
}

area.addStyle = function (node, num) {
    node.setAttribute("class", "default num_" + num);
    node.innerText = num;
    node.addEventListener("animationend", function () {
        node.style.width = '105px';
        node.style.height = '105px';
        node.style['line-height'] = '105px';
        node.style['font-size'] = area.fontSize(num).toString() + 'px';
    });
}

// area.moveStyle = function (node, direction) {
//     switch (direction) {
//         case 'top' : node.style.top = '-50%'; break;
//         case 'bottom' : node.style.top = '100%'; break;
//         case 'left' : node.style.left = '-100%'; break;
//         case 'right' : node.style.left = '100%'; break;
//     }
// }

area.moveStyle = function (node, direction) {
    node.style.animation = direction + " 0.5s";
}

area.changeStyle = function (node, num, nextNode, nextNum) {
    console.log(node, num, nextNode, nextNum);
    if (num === 0) {
        node.addEventListener("animationend", function () {
            node.innerText = '';
            node.setAttribute("class", "default");
            node.style = '';
            area.squareStyle(nextNode, nextNum);
        });
    } else {
        node.setAttribute("class", "default num_" + num);
        node.addEventListener("animationend", function () {
            node.innerText = num;
            node.style.width = '105px';
            node.style.height = '105px';
            node.style['line-height'] = '105px';
            node.style['font-size'] = area.fontSize(num).toString() + 'px';
            area.squareStyle(nextNode, nextNum);
        });
    }
}

area.squareStyle = function (node, num) {
    if (num === 0) {
        node.innerText = '';
        node.setAttribute("class", "default");
        node.style = '';
    } else {
        node.setAttribute("class", "default num_" + num);
        node.innerText = num;
        node.style.width = '105px';
        node.style.height = '105px';
        node.style['line-height'] = '105px';
        node.style['font-size'] = area.fontSize(num).toString() + 'px';
    }
}

area.fontSize = function (num) {
    if (num < 1000) {
        return this.font_size[0];
    }
    if (num >= 1000) {
        return this.font_size[1];
    }
}