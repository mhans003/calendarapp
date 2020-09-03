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
for(let thisTime = 8; thisTime < 18; thisTime++) {
    times.push(new time(thisTime)); 
}

//Test console log
for(let i = 0; i < times.length; i++) {
    console.log(times[i]); 
}