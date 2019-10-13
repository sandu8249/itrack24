const express = require('express');
const notifications = express.Router();
const cors = require("cors");
const Post = require("../models/Post");
const Complain = require("../models/Complain");
notifications.use(cors());
const Sequelize = require('sequelize');


//NOTIFICATION_COUNT_FOR_POSTS
notifications.post('/getPostCount',(req,res)=>{
  console.log(req.body.uid)
    Post.count({
        where:{
        UserID:{
            [Sequelize.Op.ne]:[req.body.uid]
        },
        isViwed:false
    }
    }).then((result)=>{
        console.log(result);
        res.json(result);
    })
})


//NOTIFICATION_COUNT_FOR_COMPLAIN
notifications.post('/getCompCount',(req,res)=>{
    console.log(req.body.uid);
    Complain.count({
        where:{
            user_id:{
                [Sequelize.Op.ne]:[req.body.uid] //NOT_QUERY Op=OPTION ne=NOT
            },
            isViwed:false
        }
    }).then((respond)=>{
        console.log(respond);
        res.json(respond);
    })
})

//GET_POSTS_OF_OTHER_USERS_AS_DESC_ORDER
notifications.post('/viewPostNotifications',(req,res)=>{
    Post.findAll({
        where:{
            UserID:{
                [Sequelize.Op.ne]:[req.body.UserID] //NOT_QUERY Op=OPTION ne=NOT
            },
            isViwed:false,
        },
        order:[
            ['id','DESC']
        ]
    })
    .then((respond)=>{  
        res.json(respond);
    })
})



//GET_COMPLAINS_OF_OTHER_USERS_AS_DESC_ORDER
notifications.post('/viewCompNotifications',(req,res)=>{
    Complain.findAll({
        where:{
            user_id:{
                [Sequelize.Op.ne]:[req.body.user_id] //NOT_QUERY Op=OPTION ne=NOT
            },
            isViwed:false,
        },
        order:[
            ['id','DESC']
        ]
    }).then((respond)=>{
        res.json(respond);
    })
})

 module.exports=notifications