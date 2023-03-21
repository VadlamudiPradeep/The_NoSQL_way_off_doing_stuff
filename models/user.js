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

let updatedCart = {
  items:updatedCartItems ,
}
let db = getDb();
return db
.collection('users')
.updateOne({_id: new ObjectId(this._id)},
{$set:{cart:updatedCart}}
);

}

getCart(){
  //return this.cart;
  const db = getDb();
  const productIds = this.cart.items.map(i =>{
    return i.productId;
  })
  return db.collection('products')
  .find({_id:{$in:productIds}})// `in` operator takes array of  id and therefore every id will be accepted and return back cursor which holds refrences of the all products which one of the id is menthoned in the array
   .toArray()
   .then(products =>{
 return products.map( p=>{
  return {
    ...p , 
    quantity:this.cart.items.find(i =>{
    return i.productId.toString() === p._id.toString()
  }).quantity
};
 })
   })
  //  .catch(err =>{
  //   console.log(err)
  //  })
}

deleteItemFromCart(productId){
  let updatedCartItems  = this.cart.items.filter(item =>{
    return item.productId.toString() !== productId.toString()
  });
  let db = getDb();
return db
.collection('users')
.updateOne({_id: new ObjectId(this._id)},
{$set:{cart:{items:updatedCartItems}}}
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