
const vendorController = require('../controllers/VendorController');
const express = require('express');

const router = express.Router() //express has an in-built func Router

//as we're creating the new user then the method is post method and it's coming from the controller 
router.post('/register', vendorController.vendorRegister); //post method 
router.post('/login', vendorController.vendorLogin); //post method
router.get('/all-vendors', vendorController.getAllVendors); //getting all the vendors information
router.get('/single-vendor/:id',vendorController.getVendorById);
module.exports = router;