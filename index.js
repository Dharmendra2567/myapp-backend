const express= require('express')
require('dotenv').config()
require('./database/connection')

const port =process.env.PORT
//middleware
const bodyParser = require('body-parser')
const Morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//routes
const TestRouter = require('./route/testRoute')
const CategoryRouter = require('./route/categoryRoute')
const productRouter = require('./route/productRoute')
const userRouter = require('./route/UserRoute')
const orderRouter = require('./route/orderRoute')
const PaymentRoute = require('./route/paymentRoute')

const app= express()

//use middleware
app.use(bodyParser.json())
app.use(Morgan('dev'))
app.use(cors())
app.use(cookieParser())

//use routes
app.use(TestRouter)
app.use('/api', CategoryRouter)
app.use('/api',productRouter)
app.use('/api/public/uploads',express.static('public/uploads'))
app.use('/api',userRouter)
app.use('/api',orderRouter)
app.use('/api', PaymentRoute)

app.listen(port, ()=>{
    console.log(`server started at port:${port}`)
})



























// app.get('/first', (request,response)=>{
//     response.send("HELLO WORLD")
   
// })


// // console.log(port)
// // console.log("Hello world")
// // console.log("server starting")

// const date = new Date()
// console.log(date)

// const os = require('os')
// const path =require('path')
// const fs = require('fs')
// const crypto = require('crypto')
// const {add2} = require('./server')
// // const add =require('./server')
// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())
// console.log(os.hostname())
// console.log(__dirname)
// console.log(__filename)

// // let ans = add(2,3)
// // console.log(ans)

//  ans =add2(3,5)
//  console.log(ans)