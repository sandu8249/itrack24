const path = require('path');
const express = require('express');
const multer = require('multer');
const posts = express.Router();
const cors = require("cors");
const Post = require("../models/Post");
const bodyParser = require('body-parser');
posts.use(cors());

//ADDING POST IMAGE DATA
const Img_Data = {
    postID: 0,
    userID: 0,
    post_img: ''
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './postImages');
    },

    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'image/jpg') {
            filetype = 'jpg';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }

        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpeg';
        }

        cb(null, file.originalname + '-' + Date.now() + '.' + filetype);
    }
});


var upload = multer({
    storage: storage,
    limits: { fileSize: '50M' }
});


//ADDING POST DATA
PostDetails = {
    UserID: 0,
    FirstName: '',
    PostText: '',
    PostTitle:'',
    PostImg:'',
    PostLike:0,
    PostDisLike:0,
    PostDate: '',
    PostTime: '',
    isViwed:false

}
//ADD_CURRENT_DATE
function getDate() {
    return new Date(Date.now()).toLocaleString();
}


//ADD_CURRENT_TIME
function getTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;

}
//ADD_POST
posts.post('/addpost', upload.single('postImg'), (req, res) => {
    const PostDetails = {
        UserID: req.body.id,
        FirstName: req.body.fname,
        LastName: req.body.lname,
        PostText: req.body.content,
        PostTitle: req.body.title,
        PostImg: req.file.filename,
        PostDate: getDate(),            
        PostTime: getTime(),
        isViwed:false
    }
    if (PostDetails) {
        console.log(PostDetails);
        Post.create(PostDetails)
            .then((post) => {
                res.send(post);
                console.log('POST_CRETED_SUCCESFULLY');

            }).catch((err) => {
                res.json(err);

            });
    }
    else {
        console.log('POST_NOT_RECEIVED');
    }
})

//ADD_IMAGE_TO_POST
posts.post('/addpostss', upload.single('postImg'), async function (req, res, file) {
    try {
        console.log("Trying add data to mysql")
        console.log("User ID: "+req.body.id)
        console.log(req.body.title)
        console.log(req.file.filename)
        const PostDetails = {
            UserID: req.body.UserID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            PostText: req.body.PostText,
            PostTitle: req.body.PostTitle,
            PostImg: req.file.filename,
            PostDate: getDate(),            
            PostTime: getTime(),
            isViwed:false
        }
        if (PostDetails) {
            console.log(PostDetails);
            Post.create(PostDetails)
                .then((post) => {
                    res.send(post);
                    console.log('POST_CRETED_SUCCESFULLY');
    
                }).catch((err) => {
                    res.json(err);
    
                });
        }
        else {
            console.log('POST_NOT_RECEIVED');
        }
    
      } catch (err) {
        res.send(400);
      }
});

//GET_POST_LIKE_COUNT
posts.post('/likecount',(req,res)=>{
   Post.update({
       PostLike:req.body.PostLike
   },{
       where:{
           id:req.body.id
       }
   }).then((likes)=>{
       res.json(likes);
   })

});

//GET_DISLIKE_COUNT
posts.post('/dislikecount',(req,res)=>{
    Post.update({
        PostLike:req.body.PostLike
    },{
        where:{
            id:req.body.id
        }
    }).then((dislikes)=>{
        res.json(dislikes);
    })
 
 });



module.exports = posts