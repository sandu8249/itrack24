// const path = require('path');
// const express = require('express');
// const image=express.Router();
// const cors= require("cors");

// const bodyParser = require('body-parser');
// image.use(cors());

// const imageData={
//     user_ID:0,
//     uniq_id:'',
//     img_name:''
// }

// var storage = multer.diskStorage({
//     destination: (req,file, cb) => {
//         cb(null, './uploads');
//     },

//     filename: (req, file,cb) => {
//         var filetype = '';
//         if(file.mimetype === 'image/jpg'){
//             filetype = 'jpg';
//        }
//        if(file.mimetype === 'image/png'){
//         filetype = 'png';
//       }
//         cb(null, file.originalname + '-' + Date.now() + '.' + filetype);
//     }
// });


// var upload = multer({ storage: storage,
//                       limits:{ fileSize:'4M'}
// });



// image.post('/getUniqID',(req,res)=>{
//     imageData.uniq_id = req.body.uniq_id;
//     console.log("img"+" "+imageData.uniq_id);
// });


// image.post('/getID',(req, res)=>{
//     imageData.user_ID = req.body.user_ID
//     console.log("userid is"+" " + imageData.user_ID);
// });

// //
// image.post('/upload-image',upload.single('photo'), async function (req, res){
//    if(!req.file){
//        console.log("no image received");
//        return res.send({
//            success: false
//        });
//     }
//     else {

//         imageData.img_name = req.file.filename;


//         Image.findOne({
//             where:{
//                 uniq_id:imageData.uniq_id
//             }
//         })
//         .then(result=>{
//             if(!result){
//                 Image.create(imageData)
//                 .then(result=>{
//                 res.json(result)
//                 })
//             }else{
//                 Image.update({
//                     img_name: imageData.img_name
//                 },{
//                     where:{
//                         user_ID: imageData.uniq_id
//                     }
//                 })
//                 .then(result=>{
//                     res.json(result)
//                 })

//             }
//         })
        
//         console.log("image received!");
//     }
// })


// image.post('/view_photo',(req,res)=>{

//     Image.findOne({
//         where:{
//             user_ID : req.body.user_ID
//         }
//     })
//     .then(result=>{
//         res.json(result)
//     })
// })

// //getcomplainsImg

// image.post('/compimages',(req,res)=>{
//     Image.findAll({
//         where:{
//             user_ID:req.body.user_ID
//         }
//     })
//     .then((respond)=>{
//         res.json(respond)
//     })
// })

// module.exports=image