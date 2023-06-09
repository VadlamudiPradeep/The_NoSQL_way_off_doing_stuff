const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')


const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('641af12a33210a2a89c40e8d')
    .then(user => {
      req.user = user;
      // req.user = new User(user.name , user.email , user.cart , user._id);
      next();
    })
    .catch(err => console.log(err));
   
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoose connection 
mongoose
.connect(
  'mongodb+srv://vadlamudipradeep2000:02062000@cluster0.99ucuts.mongodb.net/shop'
  )
.then(result =>{
  User.findOne()
.then(user =>{
  if(!user){
    const user = new User({
      name:'Pradeep',
      email:'email@gmail.com',
      cart:{
        items:[]
      }
    })
    user.save();
  }
})
  app.listen(3000, ()=>{
    console.log('port is connect at 3000')
  })
})
.catch(err => console.log(err))

//MongoDb default connection
// mongoConnect(() => {
//   app.listen(3000);
// });
