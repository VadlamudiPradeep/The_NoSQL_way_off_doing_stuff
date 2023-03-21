const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product{
  constructor(name, email , phone, password ,id){
  this.name = name ;
  this.email = email ;
  this.phone =phone;
  this.password = password;
  this._id = id ? new mongodb.ObjectId(id) : null ;
  }

  save(){
  const db = getDb();
  let dbOp ;
  if(this._id){
    // update the product
    dbOp = db
    .collection('user')
    .updateOne({_id:this._id},{$set:this});// this represent the entire class constructor params 
  }else{
     dbOp = db.collection('user')
     .insertOne(this)
  }
  return dbOp
  .then(result =>{
    console.log(result)
  })
  .catch(err =>{
    console.log(err)
  })
  }

}


module.exports = User;