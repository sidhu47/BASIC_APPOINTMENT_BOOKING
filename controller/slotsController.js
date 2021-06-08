const firebase = require('../firebase/dbConnect');
const firestore = firebase.firestore();
const mt = require('moment-timezone');
const m = require('moment');


const freshSlots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const OurTimezone = 'America/Los_Angeles';

const getAvailableSlots = async function(req, res){
    try {
        let data = req.body;
        let userDate = data.date;
        let userTimezone = data.timezone;
        // console.log(userDate);
        //console.log(userTimezone);
        //console.log(userTimezone);
        let defTzone = mt.tz.setDefault(OurTimezone);    //set default tzone as local
        let ourMoment = defTzone(userDate + "08:00 AM", "hh:mm A"); //local starting time

        let userStart = mt(ourMoment).tz(userTimezone);  //slot starting time in usertimezone
        let hrs_min = userStart.format("hh:mm:ss A");   //starting time in hrs in usertimezone
        // console.log(userStart);
        // console.log(typeof userStart);
        let parsedStamp = userDate + ' ' + hrs_min;     //Date + time  in usertzone
        let parsingFormat = "DD-MM-YYYY hh:mm:ss A";    //format 

        defTzone = mt.tz.setDefault(userTimezone);      //set default tzone as usertimezone
        let userDateTimezone = defTzone(parsedStamp, parsingFormat); //starting time for given date in usertzone
        let localDateTime = mt(userDateTimezone).tz(OurTimezone); //Slots time and date in our timezone
        let localDate = localDateTime.format("DD-MM-YYYY"); //search this date for available slots 
        //let localTime = localDateTime.format("hh:mm:ss A");//local time for 
        //console.log(localDate);

        let slotref = await firestore.collection('slots').doc(localDate);
        let allSlots = await slotref.get();

        //console.log(allSlots.data());
        let slotArr = [];

        if(!allSlots.exists){
            //console.log("no slots for given date");
            let newData = {
                slotbox: freshSlots
            }
            await slotref.set(newData);
            allSlots = await slotref.get();
            slotArr = allSlots.data();
            slotArr = slotArr.slotbox;
        }
        else{
            //console.log("Slots availabe");
            slotArr = allSlots.data();
            slotArr = slotArr.slotbox;
        }

        //console.log(slotArr);
        let userTimeArr = [];
        for(let i = 0; i < 18; i++){
            if(slotArr[i] == 0)userTimeArr.push(userDateTimezone.format());
            
            userDateTimezone.add(30, "minutes");
        }

        //console.log(userTimeArr);
        // let userArrObj = {
        //     freeSlots: userTimeArr
        // }
        console.log(userTimeArr);
        console.log("fine");
        res.render('freeSlots', {slots: userTimeArr})
        //return res.send(userArrObj);
        //console.log(allSlots);
        
    } catch (error) {
        return res.send(error.message);
    }
}

const updateSlot = async function(req, res){
    try{
        let data = req.body;
        let date = data.date;
        let num = data.num;

        let arr = await firestore.collection('slots').doc(date).get('slotbox');
        let val = arr.data();
        val = val.slotbox;
        val[num] = 1;
        await firestore.collection('slots').doc(date).update({
            "slotbox": val
        })
        //console.log(val);
        return res.send("array value updated");
    }
    catch{
        return res.send(err.message);
    }
}

module.exports = {
    getAvailableSlots,
    updateSlot
}
