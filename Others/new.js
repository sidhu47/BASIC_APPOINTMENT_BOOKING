const m = require('moment-timezone');
let d = '2021-06-15T01:00:00+10:00';
let t = m('2021-06-15T01:00:00+10:00');
let n = m(t).tz('Australia/Sydney');
console.log(t);
console.log(d);
console.log(n);