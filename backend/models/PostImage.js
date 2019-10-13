const Sequelize=require('sequelize')
const db= require("../database/db.js")


module.exports = db.sequelize.define(
    'postimages',
  {    
    postID:{
        type:Sequelize.INTEGER
    }, 
     userID:{
         type:Sequelize.INTEGER
     },
     post_img:{
         type:Sequelize.STRING
     },
    
      },
     {
          timestamps: false  
     }
  )
  
  
  