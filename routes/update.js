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
      
const update = multer({storage:storage});


  router.put('/:id', update.single('file'),(req,res)=>{
    if (!req.file) {
    return res.status(400).send('No file uploaded.');
    }
  UploadModel.findByIdAndUpdate(req.params.id, { image: req.file.filename }, { new: true })
  .then(updatedUpload => {
      if (!updatedUpload) {
          return res.status(404).send('No upload found with the given ID.');
      }
      res.send(updatedUpload);
  })
  .catch(e => {
      res.status(500).send(e);
  });
})


module.exports=router;

