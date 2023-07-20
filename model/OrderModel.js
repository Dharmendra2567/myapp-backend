const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const ordersSchema = new mongoose.Schema({
    orderItemsIds:[
        {
            type: ObjectId,
            ref:'OrderItems',
            required:true
        }   ],
        total:{
            type:Number,
            required:true
        },
        user:{
            type: ObjectId,
            ref:'User',
            required:true
        },
        shipping_Address:{
            type:String,
            required:true
        },
        alternate_Shipping_Address:{
            type:String
        },
        city:{
            type:String,
            required:true
        },
        zip:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        status:{
            type:String,
           default:"pending"
        }
})
module.exports= mongoose.model("Order",ordersSchema)