/*   Author: Abdeletif
 *   Date:   April 13/2022
    Assingment_1
 *   
 */

/* global variables tracking status of each form section */
var pencilsComplete = true;
var typeComplete = true;
var monthsComplete = true;
var pencilComplete = true;

/* global variables referencing sidebar h2 and p elements */
var messageHeadElement = document.getElementById("messageHead");
var messageElement = document.getElementById("message");

/* global variables referencing fieldset elements */
var pencilsFieldset = document.getElementsByTagName("fieldset")[0];
var typeFieldset = document.getElementsByTagName("fieldset")[1];
var monthsFieldset = document.getElementsByTagName("fieldset")[2];
var pencilFieldset = document.getElementsByTagName("fieldset")[3];

// Program validation for all fieldsets
var pencilsFieldset = document.getElementsByTagName("fieldset")[0];
if (pencilFieldset.valueMissing) {
    setCustomValidity("Please Enter A Number.")
}
var typeFieldset = document.getElementsByTagName("fieldset")[1];
if (typeFieldset.valueMissing) {
    setCustomValidity("Please Enter A Number.")
}
var monthsFieldset = document.getElementsByTagName("fieldset")[2];
if (monthsFieldset.valueMissing) {
    setCustomValidity("Please Enter A Number.")
}
var pencilFieldset = document.getElementsByTagName("fieldset")[3];
if (pencilFieldset.valueMissing) {
    setCustomValidity("Please Enter A Number.")
}

/* global variables referencing text input elements */
var monthsBox = document.forms[0].months;
var pencilsBox = document.forms[0].acres;

/* verify pencils text box entry is a positive number */
function verifyPencils() {
    var validity = true;
    var messageText = "";
}
try {
    if (!(pencilsBox.vlaue > 0)) {
        throw "please enter a number of pencils greater than 0.";
    }
} catch (message) {
    validity = false;
    messageText = message;
    pencilsBox.value = ""; // remove erroneous entry from input box
} finally {
    pencilsComplete = validity;
    messageElement.innerHTML = messageText;
    messageHeadElement.innerHTML = ""; // remove any former recmondation heading.
    testFormCompleteness();
}

/* verify at least one crops checkbox is checked */
function verifyPencils() {
    testFormCompleteness();
}

/* verify months text box entry is between 1 and 12 */
function verifyMonths() {
    var validity = true;
    var messageText = "";
    try {
        if (!(monthsBox.value >= 1 && monthsBox.value <= 12)) {
            throw "Please enter a number of months between 1 and 12";
        }
    } catch (message) {
        validity = false;
        messageText = message;
        monthsBox.vlaue = ""; // remove erroneous entry from input box.
    } finally {
        monthsComplete = validity;
        messageElement.innerHTML = messageText;
        messageHeadElement.innerHTML = ""; // remove any former recommendation heading.
        testFormCompleteness();
    }
}

/* verify that a fuel option button is selected */
function verifyPencil() {
    testFormCompleteness();
}

/* check if all four form sections are completed */
function testFormCompleteness() {
    if (pencilsComplete && typeComplete && monthsComplete && pencilComplete) {
        createRecommendation();
    }
}

/* generate tractor recommendation based on user selections */
function createRecommendation() {
    if (pencilsBox.value <= 5000) { // 5000 acres or less, no crop test needed
        if (monthsBox.value >= 10) { // 10+ months of farming per year
            messageHeadElement.innerHTML = "3250";
            messageElement.innerHTML = "A Great Number Pnecils For Backup";
        } else { // 9 or fewer months per year
            messageHeadElement.innerHTML = "600";
            messageElement.innerHTML = "Perfect for a Class Of College Students.";
        }
    } else { // more than 5000 acres
        if (monthsBox.value <= 9) { // 9 or fewer months per year, no crop test needed
            messageHeadElement.innerHTML = "205";
            messageElement.innerHTML = "Can't be helepd for more pencils.";
        } else { // 10+ months of farming per year
            if (document.getElementById("graphite").checked || document.getElementById("carbon").checked || document.getElementById("grease").checked) {
                messageHeadElement.innerHTML = "500";
                messageElement.innerHTML = "Pencils can be and are needed .";
            } else {
                messageHeadElement.innerHTML = "550";
                messageElement.innerHTML = "Pencils can be and are needed.";
            }
        }
    }
    if (document.getElementById("E85").checked) { // add suffix to model name based on fuel choice
        messageHeadElement.innerHTML += "E";
    } else if (document.getElementById("graphite").checked) {
        messageHeadElement.innerHTML = "B";
    } else {
        messageHeadElement.innerHTML += "D";
    }
}

/* create event listeners for all input elements */
function createEventListeners() {
    pencilsBox.value = ""; // clear text box on page load
    monthsBox.value = ""; // clear months text box on page load

    if (pencilsBox.addEventListener) {
        acresBox.addEventListener("input", verifyAcres, false);
    } else if (acresBox.attachEvent) {
        acresBox.attachEvent("onchange", verifyAcres);
    }

    var typeBox;
    for (var i = 0; i < 7; i++) {
        typeBox = typeFieldset.getElementsByTagName("input")[i];
        typeBox.checked = false;
        if (typeBox.addEventListener) {
            typeBox.addEventListener("click", verifyType, false);
        } else if (typeBox.attachEvent) {
            typeBox.attachEvent("onclick", verifyType);
        }
    }

    if (monthsBox.addEventListener) {
        monthsBox.addEventListener("input", verifyMonths, false);
    } else if (monthsBox.attachEvent) {
        monthsBox.attachEvent("onchange", verifyMonths);
    }

    var pencilBox;
    for (var i = 0; i < 3; i++) {
        pencilBox = pencilFieldset.getElementsByTagName("input")[i];
        pencilBox.checked = false;
        if (pencilBox.addEventListener) {
            pencilBox.addEventListener("click", verifyPencil, false);
        } else if (pencilBox.attachEvent) {
            pencilBox.attachEvent("onclick", verifyPencil);
        }
    }
}

/* create event listeners when page finishes loading */
if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}