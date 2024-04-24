const Token = require('../model/tokenModel')
const User = require('../model/UserModel')
const crypto = require('crypto')
const { sendEmail } = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')

exports.addUser = async (req, res) => {
    //check email if exist or not
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ error: "user already exist .Create new one or login with different email" })
    } 
    //create email or user
    let userToadd = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    //generaet token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: userToadd._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "something went wrong" })
    }
    //send token in email
     // const url = `http://localhost:5000/api/resetpassword/${token.token}`
    const url = `${process.env.FRONTEND_URL}/confirm/${token.token}`
    sendEmail({
        from: "noreply@example.com",
        to: req.body.email,
        subject: "verification email",
        text: "click to the following link to verify your account." + url,
        html: `<a href='${url}'><button>verify Link</button></a>`
    })
    //add user
    userToadd = await userToadd.save()
    if (!userToadd) {
        return res.status(400).json({ error: "something went wrong" })
    }
    else {
        return res.send(userToadd)
    }
}
//resend verification
exports.resendVerification=async (req,res)=>{
    //check user
    let user =await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:"user not registered"})
    }
    //email is verified or not
    if(user.isVerified){
        return res.status(400).json({error:"user already verified"})
    }
    //generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "something went wrong" })
    }
    //send token in email
    // const url = `http://localhost:5000/api/confirm/${token.token}`
    const url = `${process.env.FRONTEND_URL}/confirm/${token.token}`
    sendEmail({
        from: "noreply@example.com",
        to: req.body.email,
        subject: "verification email",
        text: "click to the following link to verify your account." + url,
        html: `<a href='${url}'><button>verify Link</button></a>`
    })
    return res.status(200).json({message:"email verification link has been sent to email"})
}

//email verification
exports.emailVerify = async (req, res) => {
    //check token
    const token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "invalid token or may have expired" })
    }
    //check user
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ erro: "user not found " })
    }
    //check token verification
    if (user.isVerified) {
        return res.status(400).json({ error: "user already verified,login login to continue" })
    }
    //verify token
    user.isVerified = true
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "something went wrong" })
    }
    return res.status(200).json({ message: "user verified successfully.Login to continue" })
}
//forget password
exports.forgetPassword = async (req, res) => {
    //check user
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "user not registered" })
    }
    //generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "something went wrong" })
    }
    //send token in email
    // const url = `http://localhost:5000/api/resetpassword/${token.token}`
    const url = `${process.env.FRONTEND_URL}/resetpassword/${token.token}`
    sendEmail({
        from: "noreply@example.com",
        to: req.body.email,
        subject: "Reset Password",
        text: "click to the following link to reset your password." + url,
        html: `<a href='${url}'><button>Reset Password</button></a>`
    })
    return res.status(200).json({ message: "password reset link has  been send in your email" })

}
//reset password
exports.resetPassword = async (req, res) => {
    //check token
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "invalid token or may have expired" })
    }
    //check user
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "user not found .Login to continue" })
    }
    //change password
    user.password = req.body.password
    //save user
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "something went wrong" })
    }
    return res.status(200).json({ message: "password changed successfully" })
}

//signin
exports.signin = async (req, res) => {
    const { email, password } = req.body
    //check user
    let user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ error: "user not found" })
    }
    //check password
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: "invalid password" })
    }
    //check verify or not
    if (!user.isVerified) {
        return res.status(400).json({ error: "user is not verified.Login to continue" })
    }
    //create login token
    let token = jwt.sign({ user: user._id, role: user.role }, process.env.JWT_SECRET)
    //set cookies
    res.cookie('myCookie', token, { expire: Date.now() + 86400 })
    //provide information to user
    const { _id, username, role } = user
    return res.status(200).json({ token, user: { _id, username, role, email } })
}
//signout
exports.signout = async (req, res) => {
    let response = await res.clearCookie('myCookie')
    if (!response) {
        return res.status(400).json({ error: "something went wrong" })
    }
    return res.status(200).json({ message: "logout successfully" })
}

//authorization
exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

//find user by email
exports.findUserByEmail= async (req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:"user not found"})
    }
    return res.send(user)
}
//find user by id
exports.findUser= async (req,res)=>{
    let user = await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({error:"user not found"})
    }
    return res.send(user)
    
}
// get list of all user
exports.listofUsers=async (req,res)=>{
    let users= await User.find()
    if(!users){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.send(users)
}
//update user details
exports.updateUser = async(req,res)=>{
    let user = await User.findByIdAndUpdate(req.params.id,{
        // username: req.body.username,
        role: req.query.role
    },{new:true})
    if(!user){
        return res.status(400).json({error:"soemthing went wrong"})

    }
   else{
    return res.status(200).json({message:"user updated successfully"})
    // return res.send(user)
   }
}


