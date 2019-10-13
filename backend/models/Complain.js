const Sequelize = require('sequelize')
const db = require("../database/db.js")


module.exports = db.sequelize.define(
   'complain',
   {
      //  complain_id needed
      user_id: {
         type: Sequelize.INTEGER
      },
      category: {
         type: Sequelize.STRING
      },

      description: {
         type: Sequelize.STRING
      },
      complainImg: {
         type: Sequelize.STRING
      },
      address1: {
         type: Sequelize.INTEGER
      },

      address2: {
         type: Sequelize.STRING
      },

      district: {
         type: Sequelize.STRING
      },

      date: {
         type: Sequelize.STRING
      },
      time: {
         type: Sequelize.STRING
      },

      longitude: {
         type: Sequelize.FLOAT
      },

      latitude: {
         type: Sequelize.FLOAT
      },
      isViwed: {
         type: Sequelize.BOOLEAN
      }
      ,
      status: {
         type: Sequelize.BOOLEAN
      },
      isAccepted: {
         type: Sequelize.BOOLEAN
      }
   },

   {
      timestamps: false
   }
)
