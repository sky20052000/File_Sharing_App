require("dotenv").config();
const connection = require("./dbConn/dbCon");
 connection();
 const express = require("express");
 const cors = require("cors");
  const path  = require("path");
 const app = express();
 const fileRouter = require("./routes/fileShare");

 //set express middleware 
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cors());
 
 // set static
 app.use(express.static('public'));

 // set Template engine
 app.set('views', path.join(__dirname , '/views' ));
 app.set('view engine', 'ejs');

 // set routes 
 app.use("/api/file", fileRouter);

 app.listen(process.env.Port, ()=>{
    console.log(`Server is running on the: ${process.env.Host}:${process.env.Port}`);
 });