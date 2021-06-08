const express = require('express');
const eventsController = require('../controller/eventsController');

const router = express.Router();

router.post('/', eventsController.addEvent);
router.post('/allevents', eventsController.getAllEvents);
router.get('/', (req, res) =>{
    res.render('getEvents');
});


module.exports = {
    routes: router
}