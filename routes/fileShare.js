const express = require("express");
const router = express.Router();
const fileShareController = require("../controller/fileShareController");

 router.post("/uploadFile", fileShareController.fileupload);

 // getfile link
 router.get("/:uuid", fileShareController.showFile);
 
 // dounload file
 router.get("/download/:uuid", fileShareController.dounloadFile);


module.exports = router;