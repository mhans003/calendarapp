//Save current date globally so that it is accessed when the page loads. 
//This can allow the user to ensure that the date working on the page will be consistent if midnight passes.
var currentDate; 
var currentHour; 

//Get the current date.
getCurrentDate(); 

//Create the time slots when the page loads. 
printTimes(times); 

//Load the current events from local storage. 
fillSavedEvents(); 

//Fill in colors for past, present, and future.
getCurrentColors(); 




function getCurrentDate() {
    //Get the current date using Moment.js and display in the heading.
    currentDate = moment().format("dddd, MMMM Do YYYY"); 
    $("#current-date").text(currentDate); 
}

function printTimes(times) {
    //Print out divs for each time block. 
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
        var contentDiv = $("<div>"); 
        contentDiv.attr("class", "col-sm-8 content-div");
        contentDiv.attr("id", `content-div-${time.militaryTime}`); 
        contentDiv.attr("contenteditable", "true"); 
        contentDiv.text("Type something to do and click the save icon!"); 

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
    console.log($(event.target).attr("data-target")); 

    //Create the object holding the event data using the current date, passing through the data of the appropriate time slot. 
    var calendarEvent = {
        date: currentDate,
        time: $(`#${$(event.target).attr("data-target")}`).attr("id"),
        content: $(`#${$(event.target).attr("data-target")}`).text()
    }; 

    //Create a key for storing this particular calendar event in local storage. Parse to JSON. 
    var eventKey = `${calendarEvent.date}_${calendarEvent.time}`
    localStorage.setItem(eventKey, JSON.stringify(calendarEvent)); 
    
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
    console.log(currentHour); 

    //Loop through each time slot and color with the correct time color
    for(var timeIndex = 0; timeIndex < times.length; timeIndex++) {
        console.log($(`#content-div-${times[timeIndex].militaryTime}`).text()); 

    }
}