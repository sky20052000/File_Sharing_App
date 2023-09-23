
   const File = require("../models/filemodels");
   const { v4: uuidv4 } = require('uuid');
   const multer = require("multer");
 const path = require("path");
 const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads'),
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.
            originalname)}`;
            cb(null,uniqueName);
        
    }
})

var upload = multer({
    storage,
    limit:{fileSize:100000 * 100}
}).single('filename');

const fileupload = async(req,res)=>{
     try{
            upload(req,res, async(err)=>{
                //console.log("fileData",req.file)
                if(!req.file){
                    return res.status(400).json({success:false, message:"No file uploaded"});
             }  
                       if(err){
                        return res.status(400).json({success:false,message:"there is error no file uploading"});
                       }
                       // save data into database
                       const fileData = new File({
                        fileName:req.file.filename,
                        uuid:uuidv4(),
                        path:req.file.path,
                        size:req.file.size

                       });
                       
                     
                         const result =  await fileData.save();
                        //  console.log(result,"nn")
                            return res.json({file:`${process.env.Host}/api/file/${result.uuid}`});        
            })

      
     }catch(error){
        //   console.log(error,"bb")
         return res.status(500).json({success:false, message:"Internal server error!",error});
     }
}

///  get dounload link for file

const showFile = async(req,res)=>{
          try{
               //console.log(req.params.uuid,"uuid")
             const file = await File.findOne({uuid:req.params.uuid});
               if(!file){
                    return res.status(400).json({success:false, message:"Unqiue id does exists"});
               }
              return res.render('download', {
                    uuid:file.uuid,
                    fileName:file.fileName,
                    size:file.size,
                    downloadLink: `${process.env.Host}/api/file/download/${file.uuid}`
               });

          }catch(error){
                console.log(error,"errro")
              return res.render('download', {error:"Something went wrong"});
          }
}

///  get dounload link for file

const dounloadFile = async(req,res)=>{
    try{
         //console.log(req.params.uuid,"uuid")
       const file = await File.findOne({uuid:req.params.uuid});
         if(!file){
            return  res.render('download', {error:"Link has been expired!"});
         }
         
         await file.save();
         const filePath  = `${__dirname}/../${file.path}`
             if(!filePath){
                return  res.render('download', {error:"Link has been expired!"});
             }
           res.download(filePath)
       

    }catch(error){
        //   console.log(error,"errro")
        return  res.render('download', {error:"Something went wrong"});
    }
}

module.exports = {
    fileupload,
    showFile,
 dounloadFile

}
