var windowH;
var slideH;
var currentEl;

$("#card").flip({
    trigger: "none",
    axis: "x"
});
(function() {
    var c = document.querySelectorAll("#carousel > div");
    for (var i = 0; i < c.length; i++) {
        c[i].id = "slide" + i;
        c[i].className = "slide";
    }
    var iCol = document.querySelectorAll("#slideShow > div");
    for (var i = 0; i < iCol.length; i++) {
        iCol[i].className = "slide" + i;
    }
    Rotate();
    Scroll();
    Current();
    //Hover();
})();

function goToLink() {
    var link = currentEl.find("a").attr("href");
    if (link == null) return;
    var width = document.documentElement.clientWidth;
    var elWidth = $("#card").width();
    var delta = width / 2 - elWidth / 2;
    $("#carousel").animate({ opacity: 0 }, 800);
    $("#card").animate({ right: delta },
        1000,
        function () {
            $(location).attr("href", link);
        });
}

//function Hover() {
//    $(".slide > a").hover(function() {
//            if (currentEl.attr("id") != $(this).parent().attr("id")) {
//                FlipCurrent($(this).parent());
//            }
//        },
//        function() {
//            if (currentEl.attr("id") != $(this).parent().attr("id")) {
//                Current();
//            }
//        });
//}

function Scroll() {
    function addOnWheel(elem, handler) {
        if ("ontouchstart" in window) {
            elem.addEventListener("touchstart", touchStart, false);
            elem.addEventListener("touchmove", touchMove, false);
            elem.addEventListener("touchend", touchEnd, false);
        } else if (elem.addEventListener) {
            if ("onwheel" in document) {
                // IE9+, FF17+
                elem.addEventListener("wheel", handler);
            } else if ("onmousewheel" in document) {
                // устаревший вариант события
                elem.addEventListener("mousewheel", handler);
            } else {
                // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
                elem.addEventListener("MozMousePixelScroll", handler);
            }
        } else { // IE8-
            elem.attachEvent("onmousewheel", handler);
        }
    }

    var scale = 1;
    var el = document.getElementById("carousel-wrapper");
    addOnWheel(el,
        function(e) {
            var delta = e.deltaY || e.detail || e.wheelDelta;

            // отмасштабируем при помощи CSS
            if (delta > 0) scale += 40;
            else scale -= 40;
            if (scale < 0) {
                        $("#carousel").css("margin-top", 0);
                        $("#carousel").append($("#carousel > div:first"));
                        scale = slideH;
                        Current();
            }

            if (scale > slideH) {
                        $("#carousel").prepend($("#carousel > div:last"));
                        $("#carousel").css("margin-top", -slideH);
                        scale = 0;
                        Current();
            }

            $("#carousel").css("margin-top", -slideH + scale);
            // отменим прокрутку
            e.preventDefault();
        });

    var touchScale = 0;
    var startTouchY;
    var delta = 0;
    var moveTouchY;
    var indicator = 0;
    var scaleStep = 15;

    //Scroll for mobile phone
    function touchStart(e) {
        startTouchY = e.targetTouches[0].clientY;
        moveTouchY = e.targetTouches[0].clientY;
        e.preventDefault();
    }

    function touchMove(e) {
        moveTouchY = e.targetTouches[0].clientY;
        delta = startTouchY - moveTouchY;
        if (delta > indicator + scaleStep) {
            touchScale += 25;
            $("#carousel").css("margin-top", -slideH + touchScale);
            if (touchScale > slideH) {
                $("#carousel").prepend($("#carousel > div:last"));
                $("#carousel").css("margin-top", -slideH);
                touchScale = 0;
                Current();
            }
            indicator = delta;
        } else if (delta < indicator - scaleStep) {
            touchScale -= 25;
            $("#carousel").css("margin-top", -slideH + touchScale);
            if (touchScale < 0) {
                $("#carousel").css("margin-top", 0);
                $("#carousel").append($("#carousel > div:first"));
                touchScale = slideH;
                Current();
            }
            indicator = delta;
        }
    }

    function touchEnd(e) {
        $("#carousel").animate({ marginTop: -slideH }, 500);
        touchScale = 0;
        indicator = 0;
        if (Math.abs(startTouchY - moveTouchY) < 10) {
            goToLink();
        }
    }
}

function FlipCurrent($el) {
    var flip = $("#card").data("flip-model");
    var $front = $("#card > .front");
    var $back = $("#card > .back");
    if (flip.isFlipped) {
        emtyCol($front);
        $front.append($("#slideShow > ." + $el.attr("id")));
        $("#card").flip(false);
    } else {
        emtyCol($back);
        $back.append($("#slideShow > ." + $el.attr("id")));
        $("#card").flip(true);
    }
    function emtyCol(el) {
        if (el.length != 0) {
            for (var i = 0; i < el.length; i++) {
                var el = el.find("div:eq(" + i + ")");
                $("#slideShow").append(el);
            }
        }
    }
}

function Current() {
    if (currentEl != null) {
        currentEl.removeClass("current");
    }
    var $elCol = $("#carousel > div");
    var curIndex = parseInt($elCol.length / 2);
    currentEl = $("#carousel > div:eq(" + curIndex + ")");
    currentEl.addClass("current");
    FlipCurrent(currentEl);
};



function Rotate() {
    windowH = document.documentElement.clientHeight;
    slideH = windowH / ($("#carousel > div").length - 1);

    //стили для контейнера
    $("#carousel-wrapper").css("height", windowH);
    $("#carousel").css("margin-top", -slideH);

    //стили для каждого слайда
    $(".slide").css("height", slideH);
    $(".slide").css("line-height", slideH + "px");

    //стили img()
    $("#card").css("position", "absolute");
}