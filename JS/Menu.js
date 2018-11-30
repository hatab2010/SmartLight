var isTouchDevice = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
var Height = document.documentElement.clientHeight;
var Width = document.documentElement.clientWidth;
var QantityHeight = 0;
var length = $("#menu > a").length;
var isLoaded = false;
var isOpen = false;

(function() {
    $("#menu").load("ajax/menu.html",
        function () {
            isLoaded = true;
            Position();
            $(".menu-toggle").click(menuOnClick);
        });
})();

function menuOnClick() {
    if (isOpen) {
        $("#menu").removeClass("open");
        isOpen = false;
    } else {
        $("#menu").addClass("open");
        isOpen = true;
    }
}

function Position() {
    if (Width <= 680) {
        $("#menu").removeAttr("style");
        $("#menu > ul").css("padding-top", Height / 2 - $("#menu > ul").height()/2);
    } else {
        $("#menu").css("width", Height);
        $("#menu > ul").removeAttr("style");
    }
}

//Functions
function Rotate() {
    $("#menu > a").css("margin-top", (Height - QantityHeight) / (length + 1)); 
};

//Events
$(window).resize(function () {
    Width = document.documentElement.clientWidth;
    Height = document.documentElement.clientHeight;
    Position();
});
