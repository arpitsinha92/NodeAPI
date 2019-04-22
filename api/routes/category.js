const express = require('express');
const router = express.Router();
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

const upload = multer({
  storage : storage,
  limits: {
  fileSize : 1024 * 1024 * 2
},
fileFilter : fileFilter
});

router.post('/',upload.single('image'),(req,res,next) => {
  console.log(req.file);
  const category = new Category({
    name : req.body.name,
    image : req.file.path,
    isActive : req.body.isActive
  });

  category.save()
  .then( result => {
    res.status(200).json({
      message : "Category created",
      category_id : category
    })
  })
  .catch(err => console.log(err));

});

router.get('/',(req,res,next) => {
  Category.find()
  .select("_id name image")
  .then((categories) => {
    res.status(200).json({
      message:"Catgories fetched successfully",
      category : categories
    });
  })
});

router.put('/:id',upload.single('image'),(req,res,next) => {
  Category.update({_id : req.params.id},{
    name : req.body.name,
    image : req.file.path,
    isActive : req.body.isActive
  })
  .then(result => {
    res.status(200).json({
      message : "Updated"
    })
  })
  .catch(err => console.log(err));
});


router.delete('/:id',(req,res,next) => {
  console.log(req);
  Category.remove({_id : req.params.id})
  .then(result => {
    res.status(200).json({
      message : "Deleted"
    })
  })
  .catch(err => console.log(err));
});

router.delete('/',(req,res,next) => {
  Category.remove({})
  .then(result => {
    res.status(200).json({
      message : "Deleted"
    })
  })
  .catch(err => console.log(err));
});


module.exports = router;
