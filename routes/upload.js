const express =require('express')
const path = require('path')
const multer = require("multer");
const router =express.Router()
var jwt = require("jsonwebtoken");
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



router.post('/', upload.single('file'), async (req,res)=>{
  try {
    const token = await generateToken(req.file.filename);
    const newUpload = new UploadModel({
      image: req.file.filename,
      token: token,
    });
    await newUpload.save();
    res.status(200).send(newUpload);
    console.log(newUpload)
 } catch (e) {
    console.log(e);
    res.status(500).send(e);
 }
})

async function generateToken(filename) {
  const token = jwt.sign(filename, process.env.signup_Secret_Token);
  return token;
 
}

module.exports=router;




