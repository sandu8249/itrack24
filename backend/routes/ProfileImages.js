const path = require('path');
const express = require('express');
const multer = require('multer');
const proimage=express.Router()
const cors= require("cors")
const ProImg = require("../models/ProfileImage")
const bodyParser = require('body-parser');
proimage.use(cors());

const proimg_data ={
    u_id:0,
    pic_name:''
}


var storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, './propics');
    },

    filename: (req, file,cb) => {
        var filetype = '';
        if(file.mimetype === 'image/jpg'){
            filetype = 'jpg';
       }
       if(file.mimetype === 'image/png'){
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg'){
        filetype = 'jpeg';
      }
        cb(null, file.originalname + '-' + Date.now() + "." + filetype);
    }
});

var upload = multer({ storage: storage,
    limits:{ fileSize:'4M'}
});

proimage.post('/getUserID',(req,res)=>{
    proimg_data.u_id = req.body.user_ID;
    
})

proimage.post('/profilepic',upload.single('prophoto'), async function(req,res){
    if(!req.file){
        console.log('image not received');
    }
    else{
       proimg_data.pic_name = req.file.filename;
       console.log(proimg_data.pic_name);

       ProImg.findOne({
             where :{
                 u_id: proimg_data.u_id
             }
       })
       .then(user=>{
           if(!user){
               ProImg.create(proimg_data)
               .then(result=>{
                res.json(result)
                })
               console.log(proimg_data);
           }
           else{
               console.log("hello");
               ProImg.update({
                   pic_name:proimg_data.pic_name
               },
                 {
                     where:{
                         u_id:proimg_data.u_id
                     }
                 }
               ).then(result=>{
                   res.json(result);
               })
           }
       });

       console.log("image received");
    }
});

//VIEW_PRO_IMAGE
proimage.post('/viewproimage',(req,res)=>{
    ProImg.findOne({
        where :{
            u_id: req.body.user_ID
        }
  }).then((result)=>{
      res.json(result);
      console.log("HERE_YOUR_PROFILE_IMAGE");
  })
})


module.exports=proimage
