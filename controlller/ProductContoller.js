const Product = require('../model/ProductModel')

exports.addProduct = async (req, res) => {
    let productToAdd = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: req.file.path,
        category: req.body.category,
        rating: req.body.rating,
        count_in_stock: req.body.count_in_stock
    })
    productToAdd = await productToAdd.save()
    if (!productToAdd) {
        return res.status(400).json({ error: "something went wrong" })
    }
    else {
        res.send(productToAdd)
    }
}
//get all products
exports.getAllProduct = async (req, res) => {
    // let productToGet = await Product.find().select(['product_name', 'product_price']).populate('category', 'category_name')
    let productToGet = await Product.find().populate('category', 'category_name')
    if (productToGet) {
        res.send(productToGet)
    }
    else {
        return res.status(400).json({ error: "something went wrong" })
    }
}
//get product by id
exports.getProductById = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    }
    else {
        return res.status(400).json({ error: "something went wrong" })
    }

}
//get product by category
exports.getProductByCategory = async (req, res) => {
    let productToGet = await Product.find({ category: req.params.category_id }).populate('category', 'category_name')
    if (productToGet) {
        res.send(productToGet)
    }
    else {
        return res.status(400).json({ error: "something went wrong" })
    }

}
// to update product
exports.updateProduct = async (req, res) => {
    console.log(req.body)
    let productToUpdate = await Product.findByIdAndUpdate(
        req.params.id,
        req.file?
        {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_description: req.body.product_description,
            product_image: req.file.path,
            category: req.body.category,
            count_in_stock: req.body.count_in_stock,
            rating: req.body.rating
        }:{
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_description: req.body.product_description,
            // product_image: req.file.path,
            category: req.body.category,
            count_in_stock: req.body.count_in_stock,
            rating: req.body.rating
        },
        {new: true}
    )
    if(!productToUpdate){
        return res.status(400).json({error:"Something went wrong"})
    }
    else{
        res.send(productToUpdate)
    }
}
//delete product by  category
exports.deleteProductByCategory = async (req, res) => {
    let product = await Product.findByIdAndDelete({ category: req.params.category_id })
    if (product) {
        return res.status(200).json({ message: "product deleted successfullly" })
    }
    else {
        return res.status(400).json({ error: "something went wrong" })
    }
}
//delete product by id
exports.deleteProduct = async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id )
    if (product) {
        return res.status(200).json({ message: "product deleted successfullly" })
    }
    else {
        return res.status(400).json({ error: "something went wrong" })
    }
}
//get filtered products
exports.filterProduct = async(req,res)=>{
    let sortBy =req.query.sortBy? req.query.sortBy : 'created_at'
    let order =req.query.order? req.query.order:'ASC'
    let limit = req.query.limit? req.query.limit: 999999999
    let skip = req.query.skip? req.query.skip: 0

    let Args = {}
    for (let key in req.body.filters){
        if(req.body.filters[key].length>0){
            if(key=="category"){
                Args[key] = req.body.filters[key]
            }
            else {
                Args[key]={
                    $gte:req.body.filters[key][0],
                    $lte:req.body.filters[key][1]
                }
            }
        }
    }
    // console.log(req.body.filters)
    let filteredProduct = await Product.find(Args).populate('category').sort([[sortBy, order]])
    .limit(limit)
    .skip(skip)
    if(!filteredProduct){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(filteredProduct)
}