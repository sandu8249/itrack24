const Sequelize=require('sequelize')
const db= require("../database/db.js")


module.exports = db.sequelize.define(
    'compimage',
  {     
     user_ID:{
         type:Sequelize.INTEGER
     },
     uniq_id:{
         type:Sequelize.STRING
     },
     img_name:{
         type:Sequelize.STRING
     },
    
      },
     {
          timestamps: false  
     }
  )
  
  
  