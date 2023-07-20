const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE)
.then(()=>{
    return console.log("DATABASE CONNECTED")
})
.catch(error=>console.log(error.message))