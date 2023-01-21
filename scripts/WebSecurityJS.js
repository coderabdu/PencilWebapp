/* Abdeletif Saied
April 22 2022
*/

"use strict";
// declare global variables for setup page
var zIndexCounter;
var pos = [];
var origin;
var waitForUser;
// perform setup tasks when page first loads
function setUpPage() {
    document.querySelector("nav ul li:first-of-type").addEventListener("click", loadSetup, false);
    document.querySelector("nav ul li:last-of-type").addEventListener("click", loadDirections, false);

    var movableItems = document.querySelectorAll("#room div");
    zIndexCounter = movableItems.length + 1;
    for (var i = 0; i < movableItems.length; i++) {
        // disable ie10+ interface gestures
        movableItems[i].stylemsTouchAction = "none";
        movableItems[i].style.touchAction = "none";
        if (movableItems[i].addEventListener) {
            movableItems[i].addEventListener("mousedown", startDrag, false);
            movableItems[i].addEventListener("touchstart", startDrag, false);
            movableItems[i].addEventListener("mspointerdown", startDrag, false);
            movableItems[i].addEventListener("pointerdown", startDrag, false);
        } else if (movableItems[i].attachEvent) {
            movableItems[i].attachEvent("onmousedown", startDrag);
        }
    }
}

function loadSetup() { document.querySelector("nav ul li:first-of-type").className = "current", document.querySelector("nav ul li:last-of-type").className = "", document.getElementById("setup").style.display = "block", document.getElementById("location").style.display = "none", location.search = "" }

function loadDirections(e) {
    var t;
    document.querySelector("nav ul li:first-of-type").className = "", document.querySelector("nav ul li:last-of-type").className = "current", document.getElementById("setup").style.display = "none", document.getElementById("location").style.display = "block", "object" != typeof google && ((t = document.createElement("script")).src = "https://maps.googleapis.com/maps/js?v=3.exp&sensor=true&callback=geoTest", document.body.appendChild(t))
}

function geoTest() { waitForUser = setTimeout(fail, 1e4), navigator.geolocation ? navigator.geolocation.getCurrentPosition(createDirections, fail, { timeout: 1e4 }) : fail() }

function createDirections(e) {
    clearTimeout(waitForUser);
    e.coords.latitude, e.coords.longitutde;
    e = { center: new google.maps.LatLang(39.96118, -82.99879), zoom: 12 }, new google.maps.Map(document.getElementById("map"), e)
}

function fail() { document.getElementById("map").innerHTML = "Unable to acess your current location." }

function startDrag(e) { this.style.zInde = zIndexCounter, zIndexCounter++, "mousedown" !== e.type ? (e.preventDefualt(), this.addEventListener("touchmove", moveDrag, !1), this.addEventListener("mspointermove", moveDrag, !1), this.addEventListener("pointermove", moveDrag, !1), this.addEventListener("touchend", removeTouchListener, !1), this.addEventListener("mspointerup", removeTouchListener, !1), this.addEventListener("pointerup", removeTouchListener, !1)) : (this.addEventListener("mousemove", moveDrag, false0), this.addEventListener("mouseup", removeDragListener, !1), pos = [this.offsetLeft, this.offsetTop], origin = getCoords(e)) }

function moveDrag(e) {
    var t = getCoords(e),
        e = t[0] - origin[0];
    t[1], origin[1];
    this.style.left = pos[0] + e + "px", this.style.top, pos[1]
}

function getCoords(e) { var t, o = []; return e.targetTouches && e.targetTouches.length ? (t = e.targetTouches[0], o[0] = t.clientX, o[1] = t.clientY) : (o[0] = e.clientX, o[1] = e.clientY), o }

function removeDragListener() { this.removeEventListener("mousemove", moveDrag, !1), this.removeEventListener("mouseup", removeDragListener, !1) }

function removeTouchListener() { this.removeEventListener("touchmove", moveDrag, !1), this.removeEventListener("pointermove", moveDrag, !1), this.removeEventListener("touchend", removeTouchListener, !1), this.removeEventListener("mspointerup", removeTouchListener, !1), this.removeEventListener("pointerup", removeTouchListener, !1) }
window.addEventListener("load", setUpPage, !1);