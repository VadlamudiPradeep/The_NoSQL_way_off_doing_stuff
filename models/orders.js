const mongoose = require('mongoose');
const Schema = mongoose.Schema ; /* to construct the schema
it allows to create new schemas .
*/
const orderSchema = new Schema({
       products:[{
             product : {
              type:Object,
              required:true,
             },
             quantity:{
              type:Schema.Types.Number,
              required:true,
             }
       }],
       user:{
        name:{
          type:String,
          required:true,
        },
        userId:{
          type:Schema.Types.ObjectId,
          required:true,
          ref:'User',
        }
       }
});

module.exports = mongoose.model('Order', orderSchema);