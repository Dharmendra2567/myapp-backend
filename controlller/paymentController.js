const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//return stripe key to frotend
exports.sendSTRIPEApiKey= async(req,res)=>{
   return res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY})
}

//payment processing
exports.processPayment = async(req,res)=>{
    const myPaymentIntent = await stripe.paymentIntents.create({
        amount:req.body.amount*100,
        currency:'npr',
        metadata:{integration_check:"accept_a_payment"}
    })
    return res.status(200).json({client_secret:myPaymentIntent.client_secret})
    // res.send(myPaymentIntent.client_secret)
}
