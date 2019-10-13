const express = require("express");
const charts = express.Router();
const cors = require("cors");
const Complain = require("../models/Complain");
charts.use(cors());


charts.get("/category_count1",(req,res)=>{
  Complain.count({
      where:{
          category:"Signal post"
      }
  }).then((count1)=>{
      res.json(count1);
  });

})

charts.get("/category_count2",(req,res)=>{
    Complain.count({
        where:{
            category:"Garbage disposal"
        }
    }).then((count2)=>{
        res.json(count2);
    });
  
  })



module.exports=charts