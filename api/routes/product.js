const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const Category = require('../../models/category');

const multer = require('multer');
const storage = multer.diskStorage({
  destination : function(req,file, callback){
     callback(null,'./uploads/');
  },
  filename : function(req,file,callback){
    callback(null,new Date().toISOString() + file.originalname)
  }
});

const fileFilter = function(req,file,callback)
{
 if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
  callback(null,true);
else
  callback(null,false);
};

//const upload = multer({dest : "uploads/"});
const upload = multer({
  storage : storage,
  limits: {
  fileSize : 1024 * 1024 * 2
},
fileFilter : fileFilter
});

router.post('/imageUpload/:id',upload.single('image'),(req,res,next) => {
  console.log(req.file);
  Product.update({_id : req.params.id},{
    image : req.file.path
  })
  .then(result => {
    res.status(201).json({
      message :"Image Uploaded Successfully"
    })
  })
  .catch(err => console.log(err));

});

router.post ('/',(req, res, next) => {
  Category.findOne({_id : req.body.category_id})
.then(category => {

  const product = new Product ({
    category_id : category,
    name : req.body.name,
    hindi_name : req.body.hindi_name,
    quantity : req.body.quantity.map(quant => {
      return{
        quantity : quant.quantity,
        unit : quant.unit,
        price : quant.price,
        isActive : 1
      }
    }),
    isActive : 1
  });

  product.save()
  .then(result => {
    res.status(200).json ({
      message : 'Product created',
      product_id : product._id
    });
  })
  .catch(err => console.log(err));

  }

)
.catch(err => console.log(err));


});

router.get('/',(req,res,next) => {
  Product.find({})
  .populate('category_id')
  .then(products => {
    res.status(200).json({
      message: "Products fetched successfully",
      products : products
    });
  })
  .catch(err => console.log(err));
});

router.get('/:id',(req,res,next) => {
  Product.find({category_id : req.params.id})
  .then(products => {
    res.status(200).json({
      message: "Products fetched successfully",
      products : products
    });
  })
  .catch(err => console.log(err));
})

router.delete('/:id',(req,res,next) => {
  Product.remove({_id : req.params.id})
  .then(result => {
    res.status(200).json({
      message : "Deleted"
    })
  })
  .catch(err => console.log(err));
});

router.delete('/',(req,res,next) => {
  Product.remove({})
  .then(result => {
    res.status(200).json({
      message : "Deleted"
    })
  })
  .catch(err => console.log(err));
});

module.exports = router;
