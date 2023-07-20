const {check, validationResult} = require('express-validator')

exports.categoryValidationRules =[
    check('category_name','category name is required').notEmpty()
    .isLength({min:3}).withMessage('category name must be at least of three characters')
]
exports.validate= (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()[0].msg})
    }
    next()
}
exports.productValidationRules =[
    check('product_name','product name is required').notEmpty()
    .isLength({min:3}).withMessage('product name must be at least of three characters'),
    check('product_price','product price is required').notEmpty()
    .isNumeric().withMessage('product price must be in number '),
    check('product_description','product description is required').notEmpty()
    .isLength({min:20}).withMessage('product description must be at least of 20 characters'),
    check('category','product category is required').notEmpty(),
    
]