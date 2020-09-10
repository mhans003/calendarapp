//Save current date globally so that it is accessed when the page loads. 
//This can allow the user to ensure that the date working on the page will be consistent if midnight passes.
var currentDate; 
var currentHour; 

//Every second, update the time. 
setInterval(tick, 1000); 

//Temp test code to see if changeCalendar works.
//setInterval(changeCalendar, 5000);

//Keep track of whether the user is on the current day (0 === today). 
var dayOffset = 0; 

//Fill the times to start the application with the default time slots. 
fillTimes(); 

//Start off the application with the current day (offset === 0). 
//Get the current date.
getCurrentDate(); 
//Create the time slots when the page loads. 
printTimes(times); 
//Load the current events from local storage. 
fillSavedEvents(); 
//Fill in colors for past, present, and future.
getCurrentColors(); 

function getCurrentDate() {
    $("#current-date").html(""); 
    //Get the current/selected date using Moment.js and display in the heading.
    currentDate = moment().add(dayOffset,"days").format("dddd, MMMM Do YYYY"); 
    $("#current-date").append("<i class='fas fa-arrow-left' id='back-button'></i>");  
    $("#current-date").append(` ${currentDate} `); 
    $("#current-date").append("<i class='fas fa-arrow-right' id='forward-button'></i>"); 

    $("#back-button").on("click", changeCalendar); 
    $("#forward-button").on("click", changeCalendar); 
}

function printTimes(times) {
    //Print out divs for each time block. 

    //Empty the current times. 
    $("#timeslots").html(""); 

    times.forEach((time) => {
        //Make this time row and set its id dynamically to the current time's military time. 
        var timeRow = $("<div>");
        timeRow.attr("class", "row time-row"); 
        timeRow.attr("id", `time-row-${time.militaryTime}`); 

        //Create div for time and set its id dynamically to the current time's military time; Output time using the timeString property.
        var timeDiv = $("<div>"); 
        timeDiv.attr("class", "col-sm-2 time-div"); 
        timeDiv.attr("id", `time-div-${time.militaryTime}`);
        timeDiv.text(time.timeString); 

        //Create div for content. Create its id dynamically from the current time's military time. 
        //var contentDiv = $("<div>"); 
        var contentDiv = $("<div>"); 
        contentDiv.attr("class", "col-sm-8 content-div");
        contentDiv.attr("id", `content-div-${time.militaryTime}`); 
        contentDiv.attr("contenteditable", "true"); 
        contentDiv.text(""); 

        //Create save button icon, also setting its id. 
        var saveDiv = $("<div>"); 
        saveDiv.attr("class", "col-sm-2 save-div"); 
        saveDiv.attr("id", `save-button-${time.militaryTime}`);
        saveDiv.attr("data-target", `content-div-${time.militaryTime}`); 
        saveDiv.html("<i class='far fa-save'></i>"); 

        //Append time div, content div, and save div to the row.
        timeRow.append(timeDiv); 
        timeRow.append(contentDiv); 
        timeRow.append(saveDiv); 

        //Append the row to the timeslots container. 
        $("#timeslots").append(timeRow); 

        //Add event listeners to buttons to save whatever the user types in.
        saveDiv.on("click", saveTimeRows); 
    }); 
}

function saveTimeRows(event) {
    //When the user chooses, save the current content div for a given block so that it persists in the browser's local storage. 

    //Create the object holding the event data using the current date, passing through the data of the appropriate time slot. 
    var calendarEvent = {
        date: currentDate,
        time: $(`#${$(event.target).attr("data-target")}`).attr("id"),
        content: $(`#${$(event.target).attr("data-target")}`).text()
    }; 

    //Create a key for storing this particular calendar event in local storage. Parse to JSON. 
    var eventKey = `${calendarEvent.date}_${calendarEvent.time}`
    localStorage.setItem(eventKey, JSON.stringify(calendarEvent)); 

    //Show the green checkmark after save. Set a timer to return the icon back to the save button.
    $(`#${$(event.target).attr("id")}`).html("<i class='fas fa-check'></i>"); 
    $(`#${$(event.target).attr("id")}`).css("color", "green"); 
    setTimeout(function() {
        $(`#${$(event.target).attr("id")}`).html("<i class='far fa-save'></i>"); 
        $(`#${$(event.target).attr("id")}`).css("color", "black");
    }, 1000); 
    
}

function fillSavedEvents() {
    //Get saved events from local storage. Create empty array to store. 
    var events = []; 

    //Access the parsed objects that hold the saved events for the given day.
    for(var timeSlot = 0; timeSlot < times.length; timeSlot++) {
        //Identify the current time in the loop. 
        var thisTime = times[timeSlot].militaryTime; 
        //Convert stored JSON event object back to a JS object. 
        var thisEvent = JSON.parse(localStorage.getItem(`${currentDate}_content-div-${thisTime}`)); 
   
        //If this time has a saved event (not null), place it in the events array.
        if(thisEvent) {
            events.push(thisEvent); 
        }
    }

    //Go through each event (calendar event object), and save its text into the correct calendar time row.
    events.forEach((event) => {
        $(`#${event.time}`).text(event.content); 
    });
    
}

function getCurrentColors() {
    //Fill in the events with the appropriate color depending on past, present, future. 

    currentHour = Number(moment().format("HH")); 

    //Loop through each time slot and color with the correct time color
    for(var timeIndex = 0; timeIndex < times.length; timeIndex++) {

        var thisTimeRow = $("#content-div-" + times[timeIndex].militaryTime); 
        var thisTimeOutput = $("#time-div-" + times[timeIndex].militaryTime); 

        //Check if the current day is today (offset = 0), and color items accordingly.
        if(dayOffset === 0) {
            if(times[timeIndex].militaryTime < currentHour) {
                thisTimeRow.addClass("past");
                thisTimeOutput.addClass("past-time"); 
            } else if(times[timeIndex].militaryTime === currentHour) {
                thisTimeRow.addClass("present");
                thisTimeOutput.addClass("present-time"); 
            } else {
                thisTimeRow.addClass("future"); 
            }
        } else if(dayOffset < 0) {
            //If the day is before today, make all time slots completed/past.
            thisTimeRow.addClass("past");
            thisTimeOutput.addClass("past-time"); 
        } else {
            //Otherwise, make all time slots in the future. 
            thisTimeRow.addClass("future"); 
        }   
    }
}

function changeCalendar(event) {
    //Change the calendar and update its output depending on a button press or hour change.
    
    //If this was triggered by a button, see which one was pressed. 
    if(event) {
        var button = $(event.target).attr("id"); 
    }

    //Temp. Show that the calendar was changed successfully. 
    console.log("calendar changed"); 
    
    //If the back button was pressed, take away one from the offset. 
    if(button === "back-button") {
        dayOffset--; 
    //Otherwise, add to the day offset. 
    } else if(button === "forward-button") {
        dayOffset++; 
    }

    //Refill times if the function trigger was a change to the starting or ending time. 
    if(button === "start-time" || button === "end-time") {
        fillTimes();
    }
     
    //Get the current date.
    getCurrentDate(); 
    //Create the time slots when the page loads. 
    printTimes(times); 
    //Load the current events from local storage. 
    fillSavedEvents(); 
    //Fill in colors for past, present, and future.
    getCurrentColors(); 
}

function tick() {
    //Set the clock time to the current time. 
    $("#current-time").text(moment().format("hh : mm A")); 
    //If the current hour is greater than the stored currentHour, it means the time has progressed and the calendar needs to be changed live.
    if(moment().format("HH") > currentHour || moment().format("HH : mm : ss A") === "00 : 00 : 00 AM") {
        changeCalendar(); 
    }
}

//Event listeners for changing the starting and ending times will trigger the calendar to reset with the new times. 
$("#start-time").on("change", changeCalendar); 
$("#end-time").on("change", changeCalendar); 