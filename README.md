# BASIC_APPOINTMENT_BOOKING
A basic application that allows you to book events from different timezones

# This application lets you do the following operations
  1) Get free slots for a given date and timezone in user timezone
  2) Book an event 
  3) See all the events booked in between startDate and end Date
  
# For this project I've used the following languages and frameworks
  1) NodeJS & expressJS
  2) MomentJS & Moment-timezone (for handling timezones)
  3) EJS for template engine
  4) Firestore for database
  
# Setup

    npm init
    
    npm i express moment moment-timezone firebase ejs
    
    Dev dependencies
    
    npm i --save-dev nodemon
    
# Defaults
    
    Default timezone : America/Los_Angeles
    
    Default slot duration: 30 min
    
    Default starting time for bookings: 08:00 AM
    
    Default ending time for bookings: 05:00 PM
    
    
# API's
 
  1) getAvailableSlots(date, timezone) --> POST localhost:5000/slots/
      
     This function takes date and timezone and returns all the available free slots to book an appointment.
     
  2) addEvent(name, date, duration) --> POST localhost:5000/events/
     
     This functions books an appointment with given duration. The 'date' should be in ISOformat string. If the duration clashes with other slots it will return    error status(422)
     
  3) getEvents(startDate, endDate). --> POST localhost:5000/events/allevents
  
     This function returns all the events between startDate and endDate. The arguments should be in YYYY-MM-DD format
     
 
 # Database
    
    The firestore maintains two collections 'events' and 'slots'
    
    1)Events (holds all the events information)
    
        
        Events{

          name: username,

          date: date, ---> YYYY-MM-DD format

          time: time,

          duration: duration 

        }
      
     2)Slots (holds the freeslots information)
     
     
        Slots{

          slotbox: [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ]

        }
        
        slotbox array represents slots information for a day '0' represents free slot '1' represents booked slot
          
          Ex:   slotbox[0] ==> 08:00 AM
          
                slotbox[1] ==> 08:30 AM
                
                slotbox[17] ===> 04:30 PM
                
        This array will make checking for freeslots easier
        

# Live heroku demo

    https://appointment-booker-app.herokuapp.com/
      
     
# I have used ejs to render html pages in the backend so I couldn't send json Data to frontend.

  These are the results when I don't render in the backend and send json data with res.send(jsonData)
  
  This is to get freeSlots
![0E048844-9545-4B25-8E90-67D019EA600F_1_105_c](https://user-images.githubusercontent.com/13482463/121229043-1b6ca580-c8ab-11eb-8fbb-7f8f52e6dca0.jpeg)

  This is to add event
![9389EDB6-6CEC-445D-856C-260C0B3FCEE6_1_105_c](https://user-images.githubusercontent.com/13482463/121229082-29bac180-c8ab-11eb-9eb4-637ccb506daf.jpeg)

  This is to get events between startDate and endDate
![238A4733-450A-4E6F-9528-2CD68FC449E5_1_105_c](https://user-images.githubusercontent.com/13482463/121229117-350ded00-c8ab-11eb-9699-202659edea2d.jpeg)


  
