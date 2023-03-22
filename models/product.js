const mongoose = require('mongoose');
const Schema = mongoose.Schema ; /* to construct the schema
it allows to create new schemas .
*/

const productSchema = new Schema({
  title:{
   type:String,
  required:true,
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
});

module.exports = mongoose.model('Product', productSchema);



















// MogoDb collection 

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product{
//   constructor(title , price , description , imageUrl ,id , userId){
//   this.title = title ;
//   this.price = price;
//   this.description = description;
//   this.imageUrl = imageUrl;
//   this._id = id ? new mongodb.ObjectId(id) : null ;
//   this.userId = userId
//   }

//   save(){
//   const db = getDb();
//   let dbOp ;
//   if(this._id){
//     // update the product
//     dbOp = db
//     .collection('products')
//     .updateOne({_id:this._id},{$set:this});// this represent the entire class constructor params 
//   }else{
//      dbOp = db.collection('products')
//      .insertOne(this)
//   }
//   return dbOp
//   .then(result =>{
//     console.log(result)
//   })
//   .catch(err =>{
//     console.log(err)
//   })
//   }
//   static fetchAll(){
//     let db = getDb();
//     return db.collection('products')
//     .find()// find all the products give the next document after one documents form the mongoDB database
//     .toArray()// turn them in to javascript array with toArray method
//     .then( products =>{
//       console.log(products);
//       return products // return the products 
//     })
//     .catch(err =>{
//       console.log(err);
//       throw new Error(err)
//     })
//   }
//   static findByPk(prodId){
//     let db = getDb();
//     return db.collection('products')
//     .find({_id:new mongodb.ObjectId(prodId)})
//     .next()
//     .then(product=>{
//       console.log(product);
//       return product ;
//     })
//     .catch(err =>{
//       console.log(err)
//       throw new Error(err)
//     })
//   }
//   static deleteByPk(prodId){
//     let db = getDb();
//     db.collection('products')
//     .deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then(result =>{
//       console.log(result);
//       return result;
//     })
//     .catch(err =>{
//       console.log(err);
//       throw new Error(err)
//     })
//   }
  
  
// }

// module.exports = Product ;

