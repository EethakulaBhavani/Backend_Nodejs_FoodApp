const Vendor = require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv= require("dotenv"); //to access the secretkey form .env file so we imported this

dotEnv.config() //to access variables from .env file we use this line 
const secretKey = process.env.SECRET_KEY //assigned secretkey to the variable

const vendorRegister = async(req, res)=>{
    const {username, email, password} = req.body;

    try {
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("email already taken");
        }

        const hashedPassword = await bcrypt.hash(password,10);

        //the new hashedpassword is replaced by the password and then new vendor is created
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });

        //save the newVendor to database
        await newVendor.save();

        res.status(201).json({message:"Vendor registration succesful"});
        console.log('vendor registered')
    } catch (error) {
        console.error(error);
        req.status(500).json({error:"Internal Server Error"})
    }
}

//Vendor Login function 
const vendorLogin = async(req,res)=>{
    const {email , password } =req.body;

    try {
        const vendor = await Vendor.findOne({email}); //as we're fetching data from db it takes time so we use await

        if(!vendor || !(await bcrypt.compare(password , vendor.password))){
            return res.status(401).json({error: "Invalid username or password"})
        }
        const token= jwt.sign({vendorId: vendor._id}, secretKey, {expiresIn: "1h"}) //we're adding tokens for security ...it generate another token after 1hr

        res.status(200).json({success:"Login Successful", token})
        console.log(email, token);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
}


const getAllVendors = async (req,res)=>{
    try {
        const vendors =await Vendor.find().populate('firm') //it'll give you all vendors records with populating the firms which are included in vendors
        //if vendor contains name,email and firm contains address,pincode ..this above line shows you name,email,address,pincode
        res.json({vendors})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
}


const getVendorById = async (req,res)=>{
    const vendorId =req.params.id; // as we need to get id from url so we used req.param.id

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');

        if(!vendor){
            return res.status(404).json({error:"Vendor not found!"})
        }

        res.status(200).json({vendor})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
}
module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById }