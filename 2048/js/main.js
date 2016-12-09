console.log(area.getAll());

var newArea = Math.ceil(Math.random() * 16);

console.log(newArea);

var areaName = 'index-' + newArea;

var div = document.getElementById(areaName);

div.innerText = 2;

div.setAttribute("class", "num_2 square");

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    console.log(e.keyCode);
}; 

console.log(new square(1,2));