const express = require('express')
const { postCategory, getAllCategories, categoryById, updateCategory, deleteCategory } = require('../controlller/categoryController')
const { requireSignin } = require('../controlller/UserController')
const { categoryValidationRules, validate } = require('../validation')
const { route } = require('./testRoute')
const router = express.Router()

router.post('/addcategory',categoryValidationRules,validate,requireSignin,postCategory)
router.get('/getallcategories',getAllCategories)
router.get('/categorydetails/:id',categoryById)
router.put('/updatecategory/:id',requireSignin,updateCategory)
router.delete('/deletecategory/:id',requireSignin,deleteCategory)

module.exports= router