const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId =  mongodb.ObjectId


class User {
  constructor(username, email ,cart , id) {
    this.name = username;
    this.email = email;
    this.cart = cart ;// object with some items {items :[]}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

addToCart(product){
 let cartProductIndex = this.cart.items.findIndex(cp =>{
  return cp.productId.toString() === product._id.toString();
 })
let newQuantity = 1 ;
let updatedCartItems = [...this.cart.items];

if(cartProductIndex >= 0){
  newQuantity = this.cart.items[cartProductIndex].quantity + 1 ;
  updatedCartItems[cartProductIndex].quantity = newQuantity;
}else{
  updatedCartItems.push({
    productId:new ObjectId(product._id) , quantity:newQuantity
  })
}
// 
let db = getDb();
let updatedCart = {
  items:updatedCartItems ,
}

return db
.collection('users')
.updateOne({_id: new ObjectId(this._id)},
{$set:{cart:updatedCart}}
);

}

  static findByPk(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}


module.exports = User;