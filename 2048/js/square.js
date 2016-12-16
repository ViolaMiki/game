var square = function (index, value) {
    this.index = index;
    this.value = value;
};

square.getUp = function() {
    var index = this.index - 3;
    return index < 0 ? null : index;
}

square.getDown = function() {
    var index = this.index + 3;
    return index > 15 ? null : index;
}

square.getLeft = function() {
    var index = this.index - 1;
    return index < 0 ? null : index;
}

square.getRight = function() {
    var index = this.index + 1;
    return index > 15 ? null : index;
}
