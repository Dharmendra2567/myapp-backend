const express = require('express')
const { placeOrder, viewOrder, viewOrderDetails, viewOrderbyUser, viewOrderbyStatus, updateOrder, deleteOrder } = require('../controlller/orderController')
const router = express.Router()

router.post('/placeorder',placeOrder)
router.get('/orderslist',viewOrder)
router.get('/orderdetails/:order_id',viewOrderDetails)
router.get('/orderbyuser/:user_id',viewOrderbyUser)
router.post('/orderbystatus',viewOrderbyStatus)
router.put('/updateorder/:id',updateOrder)
router.get('/deleteorder/:id',deleteOrder)


module.exports= router