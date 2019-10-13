const Sequelize=require('sequelize')
const db= require("../database/db.js")


module.exports = db.sequelize.define(
  'user',
{     

         
      user_type:{
         type:Sequelize.STRING
      },
      
   
      first_name:{
         type:Sequelize.STRING
      },
      
      last_name:{
        type:Sequelize.STRING
      },

     address:{
      type:Sequelize.STRING
     },

     contact_num:{
      type:Sequelize.INTEGER
     },

     email:{
        type:Sequelize.STRING
     },

     password:{
        type:Sequelize.STRING
     },

     resetPasswordToken:{
         type:Sequelize.STRING
     },

     resetPasswordExpires:{
      type:Sequelize.DATE
    },
    tokenid:{
       type:Sequelize.STRING
    },
    isActivated:{
       type:Sequelize.BOOLEAN
    }

    },
   {
        timestamp: false  
   }
)


