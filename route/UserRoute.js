const express = require('express')
const { addUser, emailVerify, forgetPassword, resetPassword, signin, signout, resendVerification, findUser, findUserByEmail, listofUsers, updateUser } = require('../controlller/UserController')
const router = express.Router()

router.post('/register',addUser)
router.get('/confirm/:token',emailVerify)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token',resetPassword)
router.post('/signin',signin)
router.get('/signout',signout)
router.post('/resendverification',resendVerification)
router.get('/finduserbyid/:id',findUser)
router.post('/finduserbyemail',findUserByEmail)
router.get('/allusers',listofUsers)
router.put('/updateuser/:id', updateUser)

module.exports= router