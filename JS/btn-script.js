(function () {
    document.onmousemove = mousemove;
    flashBtn();
})();
var X, Y = 0;
var R = 20;

function mousemove(e) {
    if (e.pageX == null && e.clientX != null) { // если нет pageX..
        var html = document.documentElement;
        var body = document.body;

        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
        e.pageX -= html.clientLeft || 0;

        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
        e.pageY -= html.clientTop || 0;
    }
    X = e.pageX;
    Y = e.pageY;
    gradientMoveBtn();
    //flashBtn();
}

function gradientMoveBtn() {
    var offsetY, offsetX, width, height = 0;
    offsetY = $("#lightCircle1").parent().position().top;
    offsetX = $("#lightCircle1").parent().position().left;
    width = $("#lightCircle1").parent().parent().width();
    height = $("#lightCircle1").parent().parent().height();

    var x = (X - offsetX) / width;
    var y = (Y - offsetY) / height;

    $("#lightCircle1").attr("cx", x);
    $("#lightCircle1").attr("cy", y);
}