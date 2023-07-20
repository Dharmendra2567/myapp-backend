const mongoose = require('mongoose')

categoryModelSchema = mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps: true})
module.exports = mongoose.model('Category', categoryModelSchema)