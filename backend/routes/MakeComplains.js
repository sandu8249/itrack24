const express = require("express");
const complains = express.Router();
const multer = require('multer');
const cors = require("cors");
const Complain = require("../models/Complain");
const Image = require('../models/Image');
complains.use(cors());


complainData = {
   user_id: 0,
   category: '',
   description: '',
   complainImg: '',
   address1: '',
   address2: '',
   district: '',
   date: '',
   time: '',
   longitude: '',
   latitude: '',
   isViwed:'',
   status: '',
   isAccepted: '',
}

const imageData = {
   comp_img: ''
}


var storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './uploads');
   },

   filename: (req, file, cb) => {
      var filetype = '';
      if (file.mimetype === 'image/jpg') {
         filetype = 'jpg';
      }
      if (file.mimetype === 'image/png') {
         filetype = 'png';
      }
      if (file.mimetype === 'image/png') {
         filetype = 'jpeg';
      }
      cb(null, file.originalname + '-' + Date.now() + '.' + filetype);
   }
});


var upload = multer({
   storage: storage,
   limits: { fileSize: '10M' }
});


//ADD_COMPLAIN
complains.post('/complain', upload.single('postImg'), (req, res) => {
   const complainData = {
      user_id: req.body.id,
      category: req.body.category,
      description: req.body.description,
      complainImg: req.file.filename,
      address1: req.body.address1,
      address2: req.body.address2,
      district: req.body.district,
      date: req.body.date,
      time: req.body.time,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      isViwed:false,
      status: false,
      isAccepted: false
   }

   console.log(complainData)

   Complain.create(complainData)
      .then(comp => {
         res.send(comp)
      })

})


//GET_MY_COMPLAINS
complains.post('/mycomplains', (req, res) => {
   console.log(req.body.user_id);
   Complain.findAll({
      where: {
         user_id: req.body.user_id,
      },
      order: [
         ['id','DESC'], //GET_AS_DESCENDING_ORDER
     ]
   })
      .then((respond) => {
         res.json(respond)
      })
})


module.exports = complains