const Sequelize=require('sequelize')
const db= require("../database/db.js")


module.exports = db.sequelize.define(
    'profileimages',
  {     
     u_id:{
         type:Sequelize.INTEGER
     },
     pic_name:{
         type:Sequelize.STRING
     },
    
      },
     {
          timestamps: false  
     }
  )
  
  
  