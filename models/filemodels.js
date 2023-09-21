const mongoose = require("mongoose");

const  fileShema = mongoose.Schema({
      fileName:{type:String,required:true},
      path:{type:String, required:true},
      size:{type:String, rquired:true},
      uuid:{type:String, required:true},
      sender:{type:String,requred:false},
      receiver:{type:String, required:false}

},{timestamps:true});

module.exports = mongoose.model("File",fileShema);
