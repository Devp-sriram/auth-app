const mongoose = require('mongoose')

const UploadSchema = new mongoose.Schema(
{
  image:{ type: String, required:true},
  likes :{type: Number , default:0},
  Comments:{type:String,default:""}
},
{
  collection: "uploads",
});

const UploadModel = mongoose.model( "uploads" , UploadSchema)
module.exports= UploadModel

