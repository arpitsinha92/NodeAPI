const express = require('express');
const router = express.Router();
const Order = require('../../models/order');

const User = require('../../models/user');


router.post('/',(req,res,next) => {
  User.findOne({_id : req.body.userId})
  .then(user => {
    const order = new Order({
      user : user,
      product : req.body.product,
      totalPrice : req.body.totalPrice,
      payment_mode : req.body.payment_mode,
      status : "CREATED",
      address : req.body.address,
      name : req.body.name,
      payment_status : "PENDING",
      ordered_date : new Date(),
      isActive : 1
    });
    order.save()
    .then(result => {
      console.log(result.orderId);
      res.status(200).json({
        message : "Order Created",
        order : order._id
      });
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});

router.put('/:id',(req,res,next) => {
  Order.findOne({_id : req.params.id})
  .then(order => {
    order.set('payment_id',req.body.payment_id);
    order.set('payment_status','PAID');
    order.save()
    .then(result => {
      res.status(200).json({
        message : "Order Updated",
        order : order._id
      });
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});

router.put('/status/:id',(req,res,next) => {
  Order.findOne({_id : req.params.id})
  .then(order => {
    order.set('payment_status','PAID');
    order.save()
    .then(result => {
      res.status(200).json({
        message : "Order Updated",
        order : order
      });
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});


router.get('/',(req,res,next) => {
  Order.find({})
  //.select("user product")
  .populate("user")
  .then(orders => {
    res.status(200).json({
      orders : orders
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err))
});


router.delete('/',(req,res,next) => {
  Order.remove({})
  .then(result =>
    res.status(200).json({
      message : "Deleted"
    })
  )
  .catch(err => console.log(err));
});



module.exports = router;
