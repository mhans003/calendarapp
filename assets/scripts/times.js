class time {
    constructor(timeInput) {
        this.militaryTime = timeInput; 
        this.time = (timeInput % 12) ? timeInput % 12 : timeInput % 12 + 12;  
        this.timeString = (this.militaryTime < 12) ? `${this.time}AM` : `${this.time}PM`; 
    }
}

/*
var times = [
    {
        time: 8,
        timeString: function() {
            return `${this.time}AM`; 
        } 
    },
    {
        time: 9,
        timeString: function() {
            return `${this.time}AM`; 
        } 
    },
    {
        time: 10,
        timeString: function() {
            return `${this.time}AM`; 
        } 
    },
    {
        time: 11,
        timeString: function() {
            return `${this.time}AM`; 
        } 
    },
    {
        time: 12,
        timeString: function() {
            return `${this.time}PM`; 
        } 
    },
    {
        time: 1,
        timeString: function() {
            return `${this.time}PM`; 
        } 
    },
    {
        time: 2,
        timeString: function() {
            return `${this.time}PM`; 
        } 
    },
    {
        time: 3,
        timeString: function() {
            return `${this.time}PM`; 
        } 
    },
    {
        time: 4,
        timeString: function() {
            return `${this.time}PM`; 
        } 
    },
    {
        time: 5,
        timeString: function() {
            return `${this.time}PM`; 
        } 
    },
];
*/

var times = []; 

for(let i = 8; i < 18; i++) {
    times.push(new time(i)); 
}

for(let i = 0; i < times.length; i++) {
    console.log(times[i]); 
}