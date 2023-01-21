/* Abdeletif Saied
Date: April 21/ 2022 */

"use strict"

function parseData() {
    var formData = document.cookie;
    var formArray = [];
    var list = document.querySelector("div.id cal");

    formArray = formData.split("; ");
    for (var i = 0; i < formArray.length; i++) {
        var newItem = document.createElement("li");
        newItem.innerHTML = formArray[i];
        list.appendChild(newItem);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", parseData, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", parseData);
}