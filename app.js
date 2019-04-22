const express = require('express');
const app = express();

const categoryRoutes = require('./api/routes/category');
const productRoutes = require('./api/routes/product');
const userRoutes = require('./api/routes/user');
const orderRoutes = require('./api/routes/order');

const bodyParser = require('body-parser');

const admin = require('firebase-admin');

const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//app.use((req,res,next) => {
  //res.header('Access-Control-Allow-Origin','*');
  //res.header("Access-Control-Allow-Headers","*");

/*  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
  }*/
//});

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bgp_test');
mongoose.connection
.on('error',(error) => {
  console.warn('Error',error);
});


app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/category',categoryRoutes);
app.use('/product',productRoutes);
app.use('/user',userRoutes);
app.use('/order',orderRoutes);
module.exports = app;
