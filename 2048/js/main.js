area.getAll();
var num = 2;
var empty = null;
var index = null;

for (var i = 0; i < 2; ++i) {
    empty = area.getEmpty();
    console.log(empty);
    index = Math.ceil(Math.random() * empty.length);
    console.log(index);
    area.setSquare(empty[index] + 1, 2);
}

area.draw();

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    console.log(e.keyCode);
}; 
