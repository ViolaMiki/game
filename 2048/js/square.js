var square = function (index, value) {
    this.index = index;
    this.value = value;
};

square.prototype.bottom = function() {
    var index = this.index - 4;
    return index < 0 ? null : index;
}

square.prototype.top = function() {
    var index = this.index + 4;
    return index > 15 ? null : index;
}

square.prototype.right = function() {
    var index = this.index - 1;
    return index < 0 ? null : index;
}

square.prototype.left = function() {
    var index = this.index + 1;
    return index > 15 ? null : index;
}
