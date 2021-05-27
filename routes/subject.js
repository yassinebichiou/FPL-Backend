var express = require('express');
var router = express.Router();

var subjectModel = require('../models/subjectSchema')
const jwt = require('jsonwebtoken');

const jwtConfig = require("../models/JWTConfig/jwtverify")


router.post('/addSubject', jwtConfig.ensureToken,function(req, res) {

  console.log(req.body);

    const subject = new subjectModel({
            title:req.body.title,
            description:req.body.description,
            responses : {
                yes : 0 , 
                no : 0
            }

    })
    subject.save().then(createdSubject => {
        res.status(201).json({
            message: "subject added successfully",
  
        });
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "failed to create a product!"+error
  
        });
    });
  
  });


  
router.get("/getAllSubjects", jwtConfig.ensureToken,function(req, res, next) {
    subjectModel.find().then(allSubjects=>{
      res.json(allSubjects)
    })
  });


  router.put('/updateSubject/:id', jwtConfig.ensureToken,(req, res, next) => {
    console.log(req.body);
    subjectModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then(y => {
        res.json(response)
      })
    })

module.exports = router;
