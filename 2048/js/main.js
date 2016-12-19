area.getAll();
console.log(area);
var num = 2;
var empty = null;
var index = null;
var action = {38 : "up", 40 : "down", 37 : "left", 39 : "right"};

for (var i = 0; i < 2; ++i) {
    area.newSquare();
}

area.draw();

document.onkeydown = function (ev) {
    var keyCode = ev.keyCode;
    var handle = action[keyCode]
    if (!!handle) {
        area.move(handle);
        area.newSquare();
        area.draw();
    }
}; 
