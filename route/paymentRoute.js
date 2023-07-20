const express = require('express')
const { sendSTRIPEApiKey, processPayment } = require('../controlller/paymentController')
const router = express.Router()

router.get('/getstripekey', sendSTRIPEApiKey)
router.post('/processpayment', processPayment)


 module.exports = router