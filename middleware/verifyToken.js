const Vendor =require('../models/Vendor');
const jwt =require('jsonwebtoken');
const dotEnv=require('dotenv');

dotEnv.config()
const secretKey=process.env.SECRET_KEY

const verifyToken = async(req, res, next)=>{
    //Extracts the token from the request headers
    const token = req.headers.token; //in potman api... we've headers section beside body section at that place we need to add key and value
    //at value place we need to add token

    if(!token){
        return res.status(401).json({error:"Token is required"});
    }

    try {//verifying vendor id that is present in db ...1st jwt token is decoded then finding it in our model..if not found then return not found
        const decodedtoken = jwt.verify(token, secretKey) //to decode and validate the JWT token.
       // If the token is invalid or expired, an error will be thrown.
        const vendor = await Vendor.findById(decodedtoken.vendorId); 

        if(!vendor){
            return res.status(404).json({error:"Vendor not found"})
        }

        req.vendorId = vendor._id
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Invalid token"});
    }
};

module.exports =verifyToken