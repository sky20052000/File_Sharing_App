
require("dotenv").config();
const mongoose = require("mongoose");

const connection = async()=>{
           const Connection = await mongoose.connect(process.env.Mongo_Url);
              if(!Connection){
                console.log("Mongoose connection failed!");
              }else{
                console.log("Mongoose connected successfully!");
              }
}

module.exports = connection;