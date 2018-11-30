var scrollTop = 0;
var quantityDuration = 0;
var textEmergencyTime = 300;
var Height = document.documentElement.clientHeight;
(function () {
    scrollTop = 0;
    quantityDuration = 0;
    textEmergencyTime = 300;
    //Hide dynamic elements and apply style
    //splitIntoLines("text-emergency");
    $(".preview-img img").addClass("hidden");
    $(".preview-content > h3").addClass("hidden");
    $(".preview-content > h3").addClass("transition");
    //
    splitIntoLines($(".preview-text"));

    //show elements and start animations
    document.getElementsByClassName("main-container")[0].className = "main-container";
    ContentEmergency();
})();

//Events
$(window).scroll(function () {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    ContentEmergency();
});

function ContentEmergency() {
    var $contents = $(".preview-content");
    for (var c = 0; c < $contents.length; c++) {
        var $text = $contents.eq(c).find(".preview-text");
        var $h = $contents.eq(c).find("h3");
        
        if (($text.offset().top <= scrollTop + Height + $text.height() )
            && ($text.attr("class").indexOf("endEmergency") === -1)) {
            $text.addClass("endEmergency");
            animateText($text);
            $h.removeClass("hidden");
            $contents.eq(c).addClass("endEmergency");
            imageEmergency($contents.eq(c));
        }


        //if (($h.offset().top < scrollTop + Height - $h.height() - $text.height() )
        //    && ($h.attr("class").indexOf("endEmergency") === -1)) {
        //    $h.addClass("endEmergency");
        //    var margin = $h.css("margin-left");
        //    var t = parseInt(margin) + 20;
        //    $h.css("margin-left", t);
        //}

    }
}


function imageEmergency($el) {
    $el.find("img").imagesLoaded(function() {
        var $before = $("<div></div>");
        $before.css("position", "absolute");
        $before.css("width", "100%");
        $before.css("height", "100%");
        $before.css("top", "100%");
        $before.css("left", "0");
        $before.addClass("loadBackground");
        $el.find(".preview-img").append($before);
        $el.find(".loadBackground").animate({ top: "0%" }, function () {
            $el.find("img").removeClass("hidden");
            $el.find("img").addClass("transition");
            $el.find(".preview-img").addClass("transition");
            $el.find(".loadBackground").animate({ top: "100%" }, function() {
                $el.find(".loadBackground").remove();
            });
        });
    });
}

function splitIntoLines($el) {
    var innerText;
    var spl;

    for (var i = 0; i < $el.length; i++) {
        innerText = $el.eq(i).html().trim().replace(/(?:\r\n|\r|\n)/g, "");
        spl = innerText.split(" ");
        innerText = "";

        //Separated the current element into words
        for (var w = 0; w < spl.length; w++) {
            innerText += "<div class=\"split-wrapper hidden\" style=\"display: inline-block\">"
                + spl[w] + "</div>";
            if (w < spl.length - 1) {
                innerText += " ";
            }
        }
        $el.eq(i).html(innerText);

        var $splitEls = $el.find(".split-wrapper");
        var offsetY = $splitEls.eq(0).offset().top;
        var lineStr = [""];
        var index = 0;
        for (var s = 0; s < $splitEls.length; s++) {

            if (offsetY === $splitEls.eq(s).offset().top) {
                lineStr[index] += $splitEls.eq(s).html();

                if (s < $splitEls.length - 1) {
                    lineStr[index] += " ";
                }

            } else {
                index++;
                lineStr.push($splitEls.eq(s).html());

                if (s !== $splitEls.length - 1) {
                    lineStr[index] += " ";
                }

                offsetY = $splitEls.eq(s).offset().top;
            }
        }
        if (quantityDuration < $splitEls.length) quantityDuration = $splitEls.length;
        var lineHeight = $splitEls.eq(0).height();
        var lineDiv = "";
        for (var d = 0; d < lineStr.length; d++) {
            lineDiv += "<div class = \"line-wrapper hidden\" style=\"overflow:hidden; height:"
                + lineHeight + "px\">" + lineStr[d] + "</div>";
        }
        $el.eq(i).html(lineDiv);
    }
}
//TODO вписать в function animateText

function removeSplit($el) {
        var lines = $el.find(".line-wrapper");
        var innerText = "";

        for (var line = 0; line < lines.length; line++) {
            innerText += lines.eq(line).html();
            if (line < lines.length - 1) {
                innerText += " ";
            }
        }
        $el.html(innerText.trim());
        $el.attr("style","");
}

function animateText($el) {
    var fHeight = $el.height();
    var fWidth = $el.width();

        //set static style for main elements
        $el.css("height", fHeight);
        $el.css("width", fWidth);
        $el.css("position", "relative");
        var curLines = $el.find(".line-wrapper");
        var timer = 300;
        var lHeight = curLines.eq(0).height();

        for (var l = 0; l < curLines.length; l++) {
            //set static style for line
            curLines.eq(l).css("height", lHeight);
            curLines.eq(l).css("position", "absolute");
            curLines.eq(l).css("margin-top", lHeight * l);
            setTimeout(animateCss, timer * l, curLines.eq(l), curLines.length, l);
        }

        //emergency text animation
        function animateCss(el, length,l,callback) {
            var start = Date.now();
            el.css("height", 0);
            el.css("padding-top", lHeight);
            el.removeClass("hidden");
            var duration = setInterval(function () {

                var durationPassed = Date.now() - start;

                if (durationPassed > textEmergencyTime) {
                    clearInterval(duration);
                    el.css("height", lHeight);
                    el.css("padding-top", 0);
                    if (length - 1 === l) {
                        removeSplit($el);
                    }
                    return;
                }

                el.css("height", lHeight * (durationPassed / textEmergencyTime));
                el.css("padding-top", lHeight * ((textEmergencyTime - durationPassed) / textEmergencyTime));
            }, 20);
        }
    
}



