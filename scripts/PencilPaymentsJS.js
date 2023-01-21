/* Abdeletif Saied
 **April 19 2022
 */

"use strict"; // inerpret in javascript strict mode

var dateObject = new Date();
var countdown;

function displayCalendar(whichMonth) {
    var date;
    var dateToday = new Date();
    var dayOfWeek;
    var daysInMonth;
    var dateCells;
    var captionValue;
    var month;
    var year;
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "Spetember", "October", "November", "December"];

    if (whichMonth === -1) {
        dateObject.setMonth(dateObject.getMonth() - 1);
    } else if (whichMonth === 1) {
        dateObject.setMonth(dateObject.getMonth() + 1);
    }

    month = dateObject.getMonth();
    year = dateObject.getFullYear();
    dateObject.setDate(1);
    dayOfWeek = dateObject.getDay();
    captionValue = monthArray[month] + " " + year;
    document.querySelector("#cal table caption").innerHTML = captionValue

    if (month == 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        // Jan, Mar, May, Jul, Aug, Oct, Dec

        daysInMonth = 31;
    } else if (month === 1) {
        // feb
        if (year % 4 === 0) { // leap year test
            if (year % 100 === 0) {
                // year ending in 00 not a leap year unless divisible by 400
                if (year % 400 === 0) {
                    daysInMonth = 29;
                } else {
                    daysInMonth = 28;
                }
            } else {
                daysInMonth = 29;
            }
        } else {
            daysInMonth = 28;
        }
    } else { // april, jun, september, novemeber
        daysInMonth = 30;
    }

    dateCells = document.getElementsByTagName("td");
    for (var i = 0; i < dateCells.length; i++) {
        // clear existing table dates
        dateCells[i].innerHTML = "";
        dateCells[i].className = "";
    }
    for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) {
        // add dates to days cells
        dateCells[i].innerHTML = dateObject.getDate();
        dateCells[i].className = "date";
        if (dateToday < dateObject) {
            dateCells[i].className = "futuredate";
        }
        date = dateObject.getDate() + 1;
        dateObject.setDate(date);
    }
    dateObject.setMonth(dateObject.getMonth() - 1);
    // reset month to month shown
    document.getElementById("cal").style.display = "block";
    // display calendar if it's not already visible

}

function selectDate(event) {
    if (event === undefined) { // get caller element in microsoft Edge
        event = window.event;
    }
    var callerElement = event.target || event.srcElement;
    if (callerElement.innerHTML === "") {
        // cell contains no date, so don't close the calendar
        document.getElementById("cal").style.display = "block";
        return false;
    }
    dateObject.setDate(callerElement.innerHTML);
    var fullDateToday = new Date();
    var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
    var selectDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
    if (selectDate <= dateToday) {
        document.getElementById("cal").style.display = "block";
        return false;
    }
    document.getElementById("payDate").value = dateObject.toLocaleDateString();
    hideCalendar()
    updateTotalCost();

    countdown = setInterval(updateCountdown, 1000);
    document.getElementById("countdownSection").style.display = "block";
}

function hideCalendar() {
    document.getElementById("cal").style.display = "none";
}

function prevMo() {
    displayCalendar(-1);
}

function nextMo() {
    displayCalendar(1);
}

function updateTotalCost() {
    var totalCost = 250000;
    var monthlyCost = totalCost / 60;
    var shortMonthlyCost = monthlyCost.toFixed(0);

    document.getElementById("singleLabel").innerHTML = "Single payment of $" = totalCost.toLocaleString();
    document.getElementById("multipleLabel").innerHTML = "60 monthly payments of $" + shortMonthlyCost.toLocaleString();
}

function updateCountdown() {
    var dateToday = new Date();
    var dateForm = Date.UTC(dateToday.getFullYear(), dateToday.getMonth(),
        dateToday.getDate(), dateToday.getHours(), dateToday.getMinutes(),
        dateToday.getSeconds());
    var dateTo = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(),
        dateObject.getMonth(), dateObject.getDate(), 19, 0, 0); // all set for 8pm utc

    if ((dateTo - dateForm) < 1000) { // time will be less then 0 when interval runs next 
        clearInterval(countdown);
        document.getElementById("countdownSection").style.display = "none";
    }
    //days
    var daysUntill = Mathc.floor((dateTo - dateForm) / 86400000);
    document.getElementById("countdown").innerHTML = daysUntill;
    // hours
    var fractionalDay = (dateTo - dateForm) % 86400000;
    var hoursUntill = Math.floor(fractionalDay / 3600000);
    if (hoursUntill < 10) {
        hoursUntill = "0" + hoursUntill;
    }
    document.getElementById("countdown").innerHTML += ":" + hoursUntill;

    // minutes
    var fractionalHour = fractionalDay % 3600000;
    var minutesUntill = Math.floor(fractionalHour / 60000);
    if (minutesUntill < 10) {
        minutesUntill = "0" + minutesUntill;
    }
}
document.getElementById("countdown").innerHTML += ":" + minutesUntill;

// seconds
var fractionalMinute = fractionalHour % 60000;
var secondsUntil = Math.floor(fractionalMinute / 10000);
if (secondsUntil < 10) {
    secondsUntil = "0" + secondsUntil;
}
document.getElementById("countdown").innerHTML += ":" + secondsUntil;

function createEventListeners() {
    var dateField = document.getElementById("payDate");
    if (dateField.addEventListener) {
        dateField.addEventListener("click", displayCalendar, false);

    } else if (dateField.attachEvent) {
        dateField.attachEvent("onclick", displayCalendar);
    }

    var dateCells = document.getElementsByTagName("td");
    if (dateCells[0].addEventListener) {
        for (var i = 0; i < dateCells.length; i++) {
            dateCells[i].addEventListener("click", selectDate, false);
        }
    } else if (dateCells[0].attachEvent) {
        for (var i = 0; i < dateCells.length; i++) {
            dateCells[i].attachEvent("onclick", selectDate);
        }
    }
    var closeButton = document.getElementById("close");
    if (closeButton.addEventListener) {
        closeButton.addEventListener("click", hideCalendar, false);

    } else if (closeButton.attachEvent) {
        closeButton.attachEvent("onclick", hideCalendar);
    }
    var prevLink = document.getElementById("prev");
    var nextLink = document.getElementById("next");
    if (prevLink.addEventListener) {
        prevLink.addEventListener("click", prevMo, false);
        nextLink.addEventListener("click", nextMo, false);
    } else if (prevLink.attachEvent) {
        prevLink.attachEvent("onclick", prevMo);
        nextLink.attachEvent("onclick", nextMo);
    }

}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (windows.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}