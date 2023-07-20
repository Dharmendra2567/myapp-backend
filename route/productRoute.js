const express = require('express')
const { addProduct, getAllProduct, getProductById, getProductByCategory, updateProduct, deleteProductByCategory, deleteProduct, filterProduct} = require('../controlller/ProductContoller')
const { requireSignin } = require('../controlller/UserController')
const upload = require('../utils/fileUpload')
const { productValidationRules, validate } = require('../validation')
 const router = express.Router()

 router.post('/addproduct',upload.single('product_image'),productValidationRules,validate,requireSignin, addProduct)
 router.get('/products',getAllProduct)
 router.get('/productdetails/:id',getProductById)
 router.get('/getproductbycategory/:category_id',requireSignin,getProductByCategory)
//  router.put('/updateproduct/:id',upload.single('product_image'), requireSignin,updateProduct)
 router.put('/updateproduct/:id',updateProduct)
 router.delete('/deleteproductbycategory/:category_id',requireSignin,deleteProductByCategory)
router.delete('/deleteproduct/:id',requireSignin,deleteProduct)
router.post('/filteredproduct', filterProduct)

 module.exports = router