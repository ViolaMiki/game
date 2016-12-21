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
    moveList_0: [],
    moveList_1: [],
    moveList_2: [],
    moveList_3: [],
    direction: '',
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
            this.squares[index].innerHTML = '<div class="num_' + square.value + '">' + square.value + '</div>';
        } else {
            this.squares[index].innerText = '';
            this.squares[index].setAttribute("class", "square");
        }
    }, this)
}

area.show = function () {
    var index = 0;
    var timer = setInterval(function () {
        if (area.moveList_0.hasOwnProperty(index)) {
            area.moveStyle(area.moveList_0[index][0], area.direction);
            area.changeStyle(area.moveList_0[index][0], area.moveList_0[index][1],
                area.moveList_0[index][2], area.moveList_0[index][3]);
        }

        if (area.moveList_1.hasOwnProperty(index)) {
            area.moveStyle(area.moveList_1[index][0], area.direction);
            area.changeStyle(area.moveList_1[index][0], area.moveList_1[index][1],
                area.moveList_1[index][2], area.moveList_1[index][3]);
        }

        if (area.moveList_2.hasOwnProperty(index)) {
            area.moveStyle(area.moveList_2[index][0], area.direction);
            area.changeStyle(area.moveList_2[index][0], area.moveList_2[index][1],
                area.moveList_2[index][2], area.moveList_2[index][3]);
        }

        if (area.moveList_3.hasOwnProperty(index)) {
            area.moveStyle(area.moveList_3[index][0], area.direction);
            area.changeStyle(area.moveList_3[index][0], area.moveList_3[index][1],
                area.moveList_3[index][2], area.moveList_3[index][3]);
        }
        ++index;

        if (index >= 4) {
            clearInterval(timer);
            area.moveList_0 = [];
            area.moveList_1 = [];
            area.moveList_2 = [];
            area.moveList_3 = [];
            area.newSquare();
        }
    }, 500)
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
    this.direction = direction;
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
    var list_num = this.startIndex[direction].indexOf(index);
    do {
        var nextIndex = this.container[index][direction]();
        var nextValue = this.container[nextIndex].value;
        var value = this.container[index].value;
        switch (value) {
            case 0:
                if (nextValue) {
                    this.container[index].value = nextValue;
                    this.container[nextIndex].value = 0;
                    this['moveList_' + list_num].push([this.squares[nextIndex].firstElementChild, value,
                    this.squares[index].firstElementChild, nextValue]);
                    change = true;
                }
                break;
            case nextValue:
                this.container[index].value += nextValue;
                this.container[nextIndex].value = 0;
                this['moveList_' + list_num].push([this.squares[nextIndex].firstElementChild, 0,
                this.squares[index].firstElementChild, this.container[index].value]);
                change = true;
                break;
        }
        index = nextIndex;
    } while (this.startIndex[this.back[direction]].indexOf(index) === -1)

    return change;
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