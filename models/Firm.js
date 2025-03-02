const mongoose =require("mongoose");

const FirmSchema = new mongoose.Schema({
    firmname:{
        type:String,
        reuired:true,
        unique:true
    },
    area:{
        type:String,
        reuired:true
    },
    category:{
        type:[ //array... as we need veg and non veg
            {
                type:String,
                enum :['veg', 'non-veg'] //enum -multiple values
            }
        ]
    },
    region: {
        type:[
            {
                type:String,
                enum:['south-indian', 'north-indian', 'chinese', 'bakery', 'desserts']
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },

    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId, //when we write this line this firm will be linked with vendor Schema
            ref:'Vendor '//it gets mapped to vendor table in db
        }
    ],

    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
});

//const modelname = mongoose.model('modelname', schemaname);
const Firm = mongoose.model('Firm', FirmSchema);

module.exports =Firm;