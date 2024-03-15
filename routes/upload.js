const express =require('express')
const path = require('path')
const multer = require("multer");
const router =express.Router()
const UploadModel = require('../models/uploads')

const storage = multer.diskStorage({
        destination:(req,res,cb)=>{
          cb(null,'../task -1/public/files')
        },
        filename: (req, file,cb) => {
          cb(null,file.fieldname + '_' + Date.now()+ path.extname(file.originalname))
        }
      });
      
const upload = multer({storage:storage});



router.post('/', upload.single('file'),(req,res)=>{
    UploadModel.create({image:req.file.filename})
    .then(res => console.log(res))
    .catch(e=>console.log(e))
})


module.exports=router;
exports.upload= upload;
exports.storage=storage;



