// Copy & Paste this
Date.prototype.getUnixTime = function () { 
	return this.getTime() / 1000 | 0 
};

Date.now = function () { 
	return new Date(); 
}
Date.time = function () { 
	return Date.now().getUnixTime(); 
}


var print = console.log;

// Get the current time as Unix time
var currentUnixTime = Date.time();
currentUnixTime = Date.now().getUnixTime(); // same as above

// Parse a date and get it as Unix time
var parsedUnixTime = new Date('Mon, 25 Dec 1995 13:30:00 GMT').getUnixTime();
// parsedUnixTime==819898200

print(819898200)


let unix_timestamp = 1549312452
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(formattedTime);