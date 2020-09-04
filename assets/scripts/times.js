//Create blueprint for times. Give a military time for identification and use of every hour, and time for outputting in 12-hour format. 
class time {
    constructor(timeInput) {
        this.militaryTime = timeInput; 
        this.time = (timeInput % 12) ? timeInput % 12 : timeInput % 12 + 12;  
        this.timeString = (this.militaryTime < 12) ? `${this.time}AM` : `${this.time}PM`; 
    }
}

//Empty array to hold preferred times. 
var times = []; 

//Fill the times array with the desired times (using military time as a base). 
function fillTimes() {
    //Clear the times array in case it is being refilled. 
    times = []; 
    //Access the starting time and ending time from the HTML form. 
    var startTime = Number($("#start-time option:selected").attr("option-value")); 
    var endTime = Number($("#end-time option:selected").attr("option-value")); 

    //Fill the array within the correct time slots. 
    for(let thisTime = startTime; thisTime < endTime; thisTime++) {
        times.push(new time(thisTime)); 
    }
}
