area.getAll();
var num = 2;
var empty = null;
var index = null;
var action = { 38: "top", 40: "bottom", 37: "left", 39: "right" };

for (var i = 0; i < 2; ++i) {
    area.newSquare();
}

document.onkeydown = function (ev) {
    var keyCode = ev.keyCode;
    var handle = action[keyCode]
    if (!!handle) {
        area.move(handle);
        console.log(area);
        area.show();
    }
}; 
