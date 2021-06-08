const firebase = require('../firebase/dbConnect');
const moment = require('moment');
const momentzone = require('moment-timezone');
const firestore = firebase.firestore();

const OurTimezone = 'America/Los_Angeles';

const addEvent = async function(req, res){
    try {
        let data = req.body;
        let userName = data.name;
        let userDateTime = data.date;
        let appointment_duration = data.duration;

        //console.log(userDateTime);

        let defTzone = momentzone.tz.setDefault(OurTimezone);
        
        let noOfSlots = Math.floor(appointment_duration / 30);
        if(appointment_duration % 30 > 0)noOfSlots++;
        //console.log(noOfSlots);

        //Converting user datetime to default timezone
        let convertedUserTime = defTzone(userDateTime);
        let converted_date = convertedUserTime.format("DD-MM-YYYY");
        let converted_date_ISO = convertedUserTime.format("YYYY-MM-DD");
        let simpleConverted_time = convertedUserTime.format("hh:mm A");
        let converting_format = "DD-MM-YYYY hh:mm:ss A";
        let defStartTime = defTzone(converted_date + ' 08:00 AM', converting_format);

        // console.log(defStartTime.format(converting_format) +  ' is defStarttime');
        // console.log(convertedUserTime.format(converting_format) + ' is convertedusertime in local');
        // console.log(converted_date + ' is converted date');
        // console.log(converted_time + ' is converted time');

        //find diff between start and ip time
        let diff = convertedUserTime.diff(defStartTime);
        //console.log(diff);
        if(diff < 0){
            return res.send("too early");
        }
        diff = Math.floor(diff / 60000);
        //console.log(diff + ' is diff');
        
        
        //checking slots for the converted date
        let slotref = await firestore.collection('slots').doc(converted_date);
        let allSlots = await slotref.get();
        
        if(!allSlots.exists){
            return res.send("No slots in db ev.js");
        }
        else{
            let slotStartingIndex;
            if(diff < 30)slotStartingIndex = 0;
            else{
                slotStartingIndex = Math.floor(diff / 30);
            }
            
            let outboundFlag = 0;
            //console.log(slotStartingIndex);
            if(slotStartingIndex == 17){
                if(appointment_duration > 30)outboundFlag = 1;
            }

            if(outboundFlag == 1){
                return res.status(400).send("NOt possible");
            }

            let slotIndex = [];
            let slotArr = allSlots.data();
            slotArr = slotArr.slotbox;

            let flag = 0;
            for(let i = slotStartingIndex; i < slotStartingIndex + noOfSlots; i++){
                if(slotArr[i] == 1){
                    return res.status(422).render('noSlots');
                }
                else slotIndex.push(i);
            }
            
                // console.log("Slot index");
                // console.log(slotIndex);
            // console.log(slotArr);
            slotIndex.forEach(index => {
                slotArr[index] = 1;
            });
            // console.log(slotArr);
            // console.log(converted_date);
            await firestore.collection('slots').doc(converted_date).update({
                slotbox: slotArr
            });
            
            let newData = {
                name: userName,
                date: converted_date_ISO,
                time: simpleConverted_time,
                duration: appointment_duration
            }
            await firestore.collection('events').doc().set(newData);
            //console.log("Done");
            res.status(200).render('appointmentSuccessful', { data: newData});
            //return res.send(newData);  
        }
    } catch (error) {
        return res.status(422).send(error.message);
    }
}

const getAllEvents = async function(req, res){
    try {
        let data = req.body;
        let startDate = data.startDate;
        let endDate = data.endDate;

        let allEvents = await firestore.collection('events').where('date', '>=', startDate).where('date', '<=', endDate).get();
    
        let eventArr = [];
        if(allEvents.empty){
            return res.status(400).send("No events to display");
        }
        else{
            allEvents.forEach(doc => {
                eventArr.push(doc.data());
            });
        }
        res.render('allEvents', {eventArr: eventArr});
        //return res.send(eventArr);
    } catch (error) {
        return res.status(422).send("Error occured in getAllEvents");
    }
    
}

module.exports = {
    addEvent,
    getAllEvents
}