const Firm =require('../models/Firm');
const Vendor =require('../models/Vendor');
const multer = require('multer');

//standard code for image upload 
const storage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null, 'uploads/'); //destination folder where the uploaded images will be stored,create a folder with uploads name 
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+ path.extname(file.originalname));
    }
});
const upload = multer({ storage : storage }); 
//upto here its related to images
const addFirm = async (req, res) =>{
    try {
        const {firmname, area, category, region, offer} = req.body

        // checks whether a file was uploaded(req.file),If req.file exists (truthy), it means a file was successfully uploaded.
        //then filename of that uploaded file will be assigned if the file didnt upload then it'll be undefined
        const image =req.file? req.file.filename: undefined;
    
        const vendor = await Vendor.findById(req.vendorId); //find the vendor_id

        if(!vendor){ //if vendor is not present 
            return res.status(404).json({error:"Vendor not found"})
        }
        //if vendor present then add new firm 
        const firm = new Firm({
            firmname, area, category, region, offer, image, vendor:vendor._id
        })
    
        const savedFirm = await firm.save(); //save the firm

        vendor.firm.push(savedFirm) //we need to display the firm details in the specific vendor's field ..so we're pushing firm details into vendor

        await vendor.save(); //save the vendor details in db 
        return res.status(200).json({message:"Firm added successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
};

const deleteFirmById =async (req,res)=>{
    try {
        const firmId =req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if(!deletedFirm){
            return res.status(404).json({error: "no Firm found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server Error"})
    }
}

//this is the way to export the function when we're having images
module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById}