const Order = require('../model/OrderModel')
const OrderItems = require('../model/OrderItemsModel')

//place order
exports.placeOrder = async (req, res) => {
    let orderitemsids = await Promise.all(
        req.body.orderItems.map(async (orderitem) => {
            let orderItem = await new OrderItems({
                product: orderitem.product,
                quantity: orderitem.quantity
            })
            orderItem = await orderItem.save()
            return orderItem._id
            if(!orderItem){
                return res.status(400).json({error:"something went wrong"})
            }
        })
    )
    let individual_total = await Promise.all(
        orderitemsids.map(async (orderitem) => {
            let item = await OrderItems.findById(orderitem).populate('product', 'product_price')
            return item.product.product_price * item.quantity
        })
    )
    let total_price = individual_total.reduce((acc, cur) => acc + cur)
 
    let order = new Order({
        orderItemsIds:orderitemsids,
        total:total_price,
        user:req.body.user,
        shipping_Address:req.body.shipping_Address,
        alternate_Shipping_Address:req.body.alternate_Shipping_Address,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone
    })
    order = await order.save()
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.send(order)
}
//view all orders
    exports.viewOrder= async (req,res)=>{
        let orders = await Order.find().populate('user','username')
        .populate({path:"orderItemsIds",populate:({path:"product",populate:({path:"category"})})})
    if(!orders){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.send(orders)
    }
    //view an order details
    exports.viewOrderDetails= async (req,res)=>{
        let order = await Order.findById(req.params.order_id).populate('user','username')
        .populate({path:"orderItemsIds",populate:({path:"product",populate:({path:"category"})})})
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.send(order)
    }
    //view order details by user
    exports.viewOrderbyUser= async (req,res)=>{
        let order = await Order.find({user:req.params.user_id}).populate('user','username')
        .populate({path:"orderItemsIds",populate:({path:"product",populate:({path:"category"})})})
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.send(order)
    }

    //find order by status
    exports.viewOrderbyStatus= async (req,res)=>{
        let order = await Order.find({status:req.body.status}).populate('user','username')
        .populate({path:"orderItemsIds",populate:({path:"product",populate:({path:"category"})})})
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.send(order)
    }

    //update order
    exports.updateOrder = async(req,res)=>{
        let order = await Order.findByIdAndUpdate(req.params.id,{
            status:req.body.status
        },{new:true})
        if(!order){
            return res.status(400).json({error:"something went wrong"})
        }
        return res.send(order)
    }

    //delete order
    exports.deleteOrder= async(req,res)=>{
        Order.findByIdAndDelete(req.params.id)
        .then(order=>{
            if(order==null){
                return res.status(400).json({error:"order not found"})
            }
            order.orderItemsIds.map( async(orderItem)=>{
               let orderItems=await OrderItems.findByIdAndDelete(orderItem)
                if(!orderItems){
                    return res.status(400).json({error:"something went wrong"})
                }
               
            })
            return res.status(200).json({message:"order deleted or removed"})
        })
        .catch(err=> res.status(400).json({error:err}))
    }

