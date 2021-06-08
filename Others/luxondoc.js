const { DateTime } = require("luxon");

let user = DateTime.fromISO("2021-06-06").setZone("America/Los_Angeles");
let our = DateTime.fromISO("2021-06-06").setZone("Europe/London");

console.log(user.toLocaleString(DateTime.DATETIME_FULL));
console.log(our.toLocaleString(DateTime.DATETIME_FULL));

let diff = user.diff(our,["years", "months", "days", "hours", "minutes"]);
console.log(diff.toObject());