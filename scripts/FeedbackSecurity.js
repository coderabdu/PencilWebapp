/* Abdeletif Saied
Date: April 21 2022 
*/

"use strict"

function clearCookies() {
    var cookieStreing = document.cookie;
    var cookieArray = cookieStreing.split("; ");
    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() - 7);
    for (var i = 0; i < cookieArray.length; i++) {
        document.cookie = cookieArray[i] + "; epxires=" + expiresDate.toUTCString();
    }
}

function clearCookies() {
    if (window.addEventListener) {
        window.addEventListener("load", clearCookies, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", clearCookies);
    }
}