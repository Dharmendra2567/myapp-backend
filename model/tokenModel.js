const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        dafault: Date.now(),
        expires: 86400
    }
})

module.exports = mongoose.model("Token", tokenSchema)