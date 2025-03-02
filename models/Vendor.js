const mongoose=require("mongoose")

const vendorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
});

//exporting model along with schema
//Creates a model named Vendor (MongoDB collection vendors)
const Vendor=mongoose.model('Vendor',vendorSchema);

//Allows other files to import and use the Vendor model
module.exports=Vendor;