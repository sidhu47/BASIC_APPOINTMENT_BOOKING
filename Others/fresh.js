const mt = require('moment-timezone');
const m = require('moment');
//  "DD-MM-YYYY hh:mm:ss A"
let date = "07-06-2021";
let timezone = 'Europe/London';
let defTzone = 'America/Los_Angeles';

let user = m(date, "DD-MM-YYYY").tz(timezone);
let our = m(date, "DD-MM-YYYY").tz(defTzone);
console.log(user);
console.log(our);

let userUtcOs = user.utcOffset();
let ourUtcOs = our.utcOffset();
console.log(userUtcOs);
console.log(ourUtcOs);



//let gap = m.duration(m(user).tz(timezone).diff(m(our).tz(defTzone)));
//console.log(gap.as('minutes'));
// m('2021-06-07T21:00:00+01:00').tz('America/Los_Angeles');
// m.duration(userAppointment.diff(ourMoment));

// let ourTzone = mt.tz.setDefault('America/Los_Angeles');
// //let userTzone = mt.tz.setDefault(timezone);

// let ourMoment = ourTzone("08:00 AM", "hh:mm:ss A");
// console.log(ourMoment.format("DD-MM-YYYY hh:mm:ss A") + ' is our moment US');

// let userMoment = mt(ourMoment).tz(timezone);
// console.log(userMoment.format("DD-MM-YYYY hh:mm:ss A") + ' is user moment London');

// let userClock = userMoment.format("hh:mm:ss A");
// console.log(userClock + ' is user clock');

// let userDateTime = m(userMoment).tz(timezone);
// console.log(userDateTime.format("DD-MM-YYYY hh:mm:ss A") + ' is userDatetime');

// let ans = [];
// for(let i = 0; i < 18; i++){
//     ans.push(userDateTime.format());
//     userDateTime.add(30, "minutes");
// }

// console.log(userDateTime.format("DD-MM-YYYY hh:mm:ss A") + ' is userDatetime after for loop');
// console.log(ans);

// let userAppointment = m('2021-06-07T21:00:00+01:00').tz('America/Los_Angeles');
// console.log(userAppointment.format("DD-MM-YYYY hh:mm:ss A") + ' is user appointment time');

// let duration = m.duration(userAppointment.diff(ourMoment));
// console.log(duration + ' is duration');
// let quo = Math.floor(duration / 60000);
// let rem = duration % 60000;
// console.log(rem);
// console.log(quo + ' is duration in minutes');

// let slotStartIndex;
// if(duration < 30){
//     slotStartIndex = 0;
// }
// else{
//     slotStartIndex = Math.floor(quo / 30);
// }

// console.log(slotStartIndex + ' is slot start index');

// let len = 40;

// let noOfSlots = Math.floor(len / 30);
// if(len % 30 > 0)noOfSlots++;

// console.log(noOfSlots);