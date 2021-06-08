const express = require('express');
const slotsController = require('../controller/slotsController');

const router = express.Router();

router.post('/', slotsController.getAvailableSlots);
router.put('/', slotsController.updateSlot);

module.exports = {
    routes: router
}