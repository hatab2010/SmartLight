var mEl = document.getElementsByClassName("service");
$(".service:first").imagesLoaded(resizeEl);

for (var i = 0; i < mEl.length; i++) {
    parallax(mEl[i]);
}

var Height = $(window).height();
var Width = $(window).width();

$(window).resize(function() {
    Height = $(window).height();
    Width = $(window).width();
    resizeEl();
});

function resizeEl() {
    if (Width <= 1200) {
        $(".service").removeAttr("style");
        $(".main-container").removeClass("hidden");
    } else {
        $(".service").css("margin-top", Height / 2 - $(".service").height() / 2);
        $(".main-container").removeClass("hidden");
    }
}

function parallax(el) {
    el.onmousemove = p;
    var filter = document.getElementById(el.getElementsByTagName("image")[0]
        .getAttribute("filter").replace("\"", '').replace("\"", '').replace("url(#", "").replace(")", ""));
    var feImg = filter.getElementsByTagName("feImage")[0];

    function p(event) {
        var X = event.clientX;
        var Y = event.clientY;
        var maxX = el.getBoundingClientRect().left + el.clientWidth;
        var maxY = el.getBoundingClientRect().top + el.clientHeight;
        var minX = el.getBoundingClientRect().left;
        var minY = el.getBoundingClientRect().top;
        var pX = 100 / (maxX - minX) * (X - minX) * 0.5;
        var pY = 100 / (maxY - minY) * (Y - minY) * 0.5;

        var oldPosition = {
            "x": parseFloat(feImg.getAttribute("x")),
            "y": parseFloat(feImg.getAttribute("y"))
        };

        var duration = 5000;
        var timing = function(timeFraction) {
            return Math.sqrt(timeFraction);
        };
        var draw = function (progress) {
            feImg.setAttribute("x", oldPosition.x - pX * progress - oldPosition.x * progress + "%");
            feImg.setAttribute("y", oldPosition.y - pY * progress - oldPosition.y * progress + "%");
        }

        animate(timing, draw, duration);

        function animate( timing, draw, duration ) {

            const start = performance.now();

            requestAnimationFrame(function animate(time) {
                // timeFraction goes from 0 to 1
                let timeFraction = (performance.now() - start) / duration;
                if (timeFraction > 1) timeFraction = 1;

                // calculate the current animation state
                const progress = timing(timeFraction);

                draw(progress); // draw it

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                } 
            });
        }
    }
};