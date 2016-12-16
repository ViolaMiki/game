area.getAll();
console.log(area);
var num = 2;
var empty = null;
var index = null;
var action = {38 : "up", 40 : "down", 37 : "left", 39 : "right"};

for (var i = 0; i < 2; ++i) {
    empty = area.getEmpty();
    index = Math.floor(Math.random() * empty.length);
    console.log(empty[index]);
    area.setSquare(empty[index], 2);
}

area.draw();

document.onkeydown = function (ev) {
    var keyCode = ev.keyCode;
    var handle = action[keyCode]
    if (!!handle) {
        area[handle]();
    }
}; 
