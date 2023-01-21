/* Abdeletif Saied
Date: April 25/2022 
*/

//$("ul.mainmenu li").children("ul").addClass("show");

function display() {
    // $(event.currentTarget).children("ul").addClass("show");
    //$(event.currentTarget).children("ul").show();
    $(event.currentTarget).children("ul").slideDown("fast");
}

function hide() {
    // $(event.currentTarget).children("ul").removeClass("show");
    $(event.currentTarget).children("ul").hide();
}

$("ul.mainmenu li").hover(display, hide);