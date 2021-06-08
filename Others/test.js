const m = require('moment');
const mt = require('moment-timezone');

// '': 60,
//     'America/Los_Angeles': -420,
//     "Asia/Dubai": 240,
//     "Australia/Sydney": 330,
//     "Asia/Kolkata": 600


//set 8AM and check equivalent time to users tzone
//add all times to array and return slots
//picked a date and time from user tzone convert that to local tzone date time and store it in the events

//set default timezone
let ourTzone = mt.tz.setDefault('America/Los_Angeles');
let user = mt.tz('Europe/London');
let ourTime = ourTzone();
console.log(ourTime);
console.log(user);

ourTime = ourTzone("08:00 AM", "hh:mm:ss A");
let userTime = mt(ourTime).tz('Europe/London');
let userClock = userTime.format("hh:mm:ss A");
console.log(userClock);
console.log(ourTime);
console.log(userTime);


//this will return timeslots in usertimezone
let userTimeArr = [];
const slotArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1];

for(let i = 0; i < 18; i++){
    if(slotArr[i] == 0){
        userTimeArr.push(userTime.format()); //or use userTimeArr.push(moment(userTime)) to get array of moments.
    }
    userTime.add(30, 'minutes');
}
console.log(userTimeArr);

//We get user date and time and timezone
let final_date = "06-06-2021 12:00 PM";

// let dd = mt();
// console.log(dd.format("DD-MM-YYYY hh:mm:ss A"));
let final_zone = mt.tz.setDefault('Europe/London');
let final_moment = final_zone("06-06-2021 04:00 PM", "DD-MM-YYYY hh:mm:ss A");
let saving_moment = mt(final_moment, "DD-MM-YYYY hh:mm:ss A").tz('America/Los_Angeles');
console.log(final_moment.format("DD-MM-YYYY hh:mm:ss A"));
console.log(saving_moment.format("DD-MM-YYYY hh:mm:ss A"));




let dummy = mt(userTimeArr[0]).tz('America/Los_Angeles');
console.log(dummy.format("DD-MM-YYYY hh:mm:ss A"));
//Getting slot number with given duration
let ddate = "2021-06-06T23:30:00+01:00";
let userSlot = mt(ddate).tz('America/Los_Angeles');
let userDate = userSlot.format("DD-MM-YYYY");
userDate = userDate + ' 08:00 AM';
console.log(userDate);
let userSlotD = mt(ddate).tz('America/Los_Angeles');
let duration = 3600;

userSlotD.add(duration, "minutes");
console.log(userSlot);
console.log(userSlotD);

let timeGap = m.duration(userSlot.diff(userSlotD));

if(timeGap < 0)timeGap = timeGap * -1;
console.log(timeGap + ' Timegap');
console.log(timeGap / 60000);

let newDate = ourTzone("05-06-2020 08:00 AM", "DD-MM-YYYY hh:mm:ss A");
console.log(newDate);

// console.log(userTime);
//Object creation using momentobject
// let temp = mt(userTzone);
// console.log(temp);

//Checking which timezone is before or after
// let isBefore = m(userTzone).isBefore(ourTzone);
// let isAfter = m(userTzone).isAfter(ourTzone);
// console.log(isBefore);
// console.log(isAfter);

// date and timezone 7th london

// 8am us london ? 4pm - 12am-> 8th london

// london 4pm 7th 

// convert london 12am 8th to us 
// date and time extract 