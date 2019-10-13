const express = require("express");
const getposts = express.Router();
const cors = require("cors");
var async = require("async");
const Post = require("../models/Post");
getposts.use(cors());

PostDetails = {
    UserID: 0,
    FirstName: '',
    PostText: '',
    PostTitle:'',
    PostImg:'',
    PostDate: '',
    PostTime: '',
    isViwed:''
    
}

//GET_POSTS
getposts.get('/viewposts',(req,res,err)=>{
    Post.findAll({
        order: [
            ['id','DESC'],
        ],
    })                       //.findAll returns all the rows in table//
    .then(result=>{
        console.log('HERE ALL THE POSTS...');
        res.json(result);
    });
});

//GET_MY_POSTS
getposts.post('/viewmyposts', (req,res)=>{
    console.log(req.body.uid);
    Post.findAll({
        where:{
          UserID:req.body.uid
        },
        order: [
            ['id','DESC'],
        ]
    })
    .then((result)=>{
        res.json(result);
        console.log(result);
    })
})

//DELETE_POST
getposts.post('/deletepost',(req,res)=>{
    console.log(req.body.postid);
    Post.destroy({
        where:{
          id:req.body.postid
        }
    })
    .then((result)=>{
        res.json(result);
        console.log("POST_DELETED");
    })
})

//GET_SELECTED_POST
getposts.post('/getselectedpost',(req,res)=>{
    console.log(req.body.userid);
    console.log(req.body.postid);

    Post.findOne({
        where:{
            id:req.body.postid,
            UserID:req.body.userid
        }
    }).then((result)=>{
        res.json(result);
        console.log("THIS_IS_SELECTED_NOTIFICATION_POST")
        if(result){
        Post.update({
            isViwed:true
        },{
            where:{
                id:req.body.postid
            }
        })
    }
    })
})



module.exports=getposts