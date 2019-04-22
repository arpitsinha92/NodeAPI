const express = require('express');
const router = express.Router();
const User = require('../../models/user');

const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');



router.post('/login',(req,res,next) => {
  console.log(req);
  const phoneNumber = req.body.phoneNumber;
  const tokenId = req.body.tokenId;

  admin.auth().verifyIdToken(tokenId)
  .then(function(decodedToken) {

    User.find({phonenumber : phoneNumber})
    .then(users => {
      if(users.length > 1){
        const token = jwt.sign({
          phoneNumber : users[0].phoneNumber,
          userId : users[0]._id
        },"secretkey",{
          expiresIn: "1h"
        });
      res.status(201).json({
        message : "Login Successful",
        token : token,
        user_id : users[0]._id
      });
    }
      else {
        const user = new User({name : '',
        phonenumber : req.body.phoneNumber,
        isActive : 1});
        user.save()
        .then(result => {
          const token = jwt.sign({
            phoneNumber : user.phoneNumber,
            userId : user._id
          },"secretkey",{
            expiresIn: "1h"
          });
          res.status(201).json({
            message : "Login Successful",
            token : token,
            user_id : user._id
          });
        })
        .catch(function(error) {
          res.status(500).json({
            error : error
            });
        });

      }
    })
    .catch(function(error){
      res.status(500).json({
        error : error
        });
    });

  })
.catch(function(error) {
  res.status(500).json({
    error : error
    });
  });
});

router.get('/',(req,res,next) => {
  User.find({})
  .then(users => {
    res.status(200).json({
      users : users
    })
  })
  .catch(function(error) {
    res.status(500).json({
      error : error
      });
    });
});

router.get('/address/:id',(req,res,next) =>{
  console.log(req.params.id);
  User.findById(req.params.id)
  .then(user => {
    console.log(user);
    if(user.address.length > 0){
      res.status(200).json({
        address : user.address
      })
    }else{
      res.status(200).json({
        message : "No Address Found"
      })
    }
  })
  .catch(function(error) {
    console.log(error);
    res.status(500).json({
      error : error
      });
    });
});

router.put('/address/delete/:id',(req,res,next) => {
  console.log(req.params.id);
  User.findOne({_id: req.params.id})
  .then(user => {
console.log(user);
    user.address = [];
    user.save()
    .then(result => {
      res.status(200).json({
        message :"Deleted"
      });
    })
    .catch(err => console.log(err));

  })
  .catch(err => console.log(err));
});

router.put('/address/:id',(req,res,next) => {
  console.log(req.body.address);
  User.findOne({_id: req.params.id})
  .then(user => {
console.log(user);
    user.address.push(req.body.address);
    console.log(user);
    user.save()
    /*User.update({_id : req.params.id},{
      address : req.body.address
    })*/
    .then(result => {
      console.log(result);
      res.status(200).json({
        message :"Address Updated Successfully"
      })
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));


});


module.exports = router;
