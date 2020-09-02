//Save current date globally so that it is accessed when the page loads. 
//This can allow the user to ensure that the date working on the page will be consistent if midnight passes.
var currentDate; 

//Get the current date.
getCurrentDate(); 

//Create the time slots when the page loads. 
createTimeSlots(); 






function getCurrentDate() {
    //Get the current date using Moment.js and display in the heading.

    currentDate = moment().format("dddd, MMMM Do YYYY"); 
    $("#current-date").text(currentDate); 
    
}

function createTimeSlots() {
    //Create the times and the time output that will be printed to the screen.
    var times = [
        {
            time: 8,
            timeString: function() {
                return `${this.time}AM`
            } 
        },
        {
            time: 9,
            timeString: function() {
                return `${this.time}AM`
            } 
        },
        {
            time: 10,
            timeString: function() {
                return `${this.time}AM`
            } 
        },
        {
            time: 11,
            timeString: function() {
                return `${this.time}AM`
            } 
        },
        {
            time: 12,
            timeString: function() {
                return `${this.time}PM`
            } 
        },
        {
            time: 1,
            timeString: function() {
                return `${this.time}PM`
            } 
        },
        {
            time: 2,
            timeString: function() {
                return `${this.time}PM`
            } 
        },
        {
            time: 3,
            timeString: function() {
                return `${this.time}PM`
            } 
        },
        {
            time: 4,
            timeString: function() {
                return `${this.time}PM`
            } 
        },
        {
            time: 5,
            timeString: function() {
                return `${this.time}PM`
            } 
        },
    ];

    times.forEach((time) => {
        console.log(time.timeString()); 
    }); 

    printTimes(times); 
}

function printTimes(times) {

    //Print out divs for each time block. 
    times.forEach((time) => {
        //Make this time row. 
        var timeRow = $("<div>");
        timeRow.attr("class", "row time-row"); 
        timeRow.attr("id", `time-row-${time.time}`); 

        //Create div for time.
        var timeDiv = $("<div>"); 
        timeDiv.attr("class", "col-sm-2 time-div"); 
        timeDiv.attr("id", `time-div-${time.time}`);
        timeDiv.text(time.timeString());

        //Create div for content.
        var contentDiv = $("<div>"); 
        contentDiv.attr("class", "col-sm-8 content-div");
        contentDiv.attr("id", `content-div-${time.time}`); 
        contentDiv.attr("contenteditable", "true"); 
        contentDiv.text("Test"); 

        //Create save button icon. 
        var saveDiv = $("<div>"); 
        saveDiv.attr("class", "col-sm-2 save-div"); 
        saveDiv.attr("id", `save-button-${time.time}`);
        saveDiv.attr("data-target", `content-div-${time.time}`); 
        saveDiv.html("<i class='far fa-save'></i>"); 
        
        

        //Append time div, content div, and save div to the row.
        timeRow.append(timeDiv); 
        timeRow.append(contentDiv); 
        timeRow.append(saveDiv); 

        //Append the row to the timeslots container. 
        $("#timeslots").append(timeRow); 

        //Add event listeners to buttons.
        saveDiv.on("click", saveTimeRows); 
    }); 
}

function saveTimeRows(event) {
    //Save the current content div for a given block so that it persists in the browser.
    console.log($(event.target).attr("data-target")); 

    //Create the object holding the event data. 
    var calendarEvent = {
        date: currentDate,
        time: $(`#${$(event.target).attr("data-target")}`).attr("id"),
        content: $(`#${$(event.target).attr("data-target")}`).text()
    }; 

    //console.log(calendarEvent); 

    var eventKey = `${calendarEvent.date}_${calendarEvent.time}`
    //console.log(eventKey); 
    localStorage.setItem(eventKey, JSON.stringify(calendarEvent)); 
    
}