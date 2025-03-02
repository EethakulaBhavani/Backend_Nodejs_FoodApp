const mongoose =require("mongoose")

const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required: true
    },
    category:{
        type:[
            {
                tpye:String,
                enum:['veg', 'non-veg']
            }
        ]  
    },
    image: {
        tpye:String
    },
    bestSeller: {
        typr:String
    },
    description: {
        tpye:String
    },

    firm :[ //added relation between firm and product
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
});

const Product = mongoose.model('Product',ProductSchema );

module.exports =Product