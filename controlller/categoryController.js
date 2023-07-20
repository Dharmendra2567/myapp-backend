const Category = require('../model/CategoryModel')

// add Category
exports.postCategory = async (req, res) => {
    let category = await Category.findOne({ category_name: req.body.category_name })
    if (!category) {
        let categoryToAdd = new Category({
            category_name: req.body.category_name
        })
        categoryToAdd = await categoryToAdd.save()
        if (!categoryToAdd) {
            return res.status(400).json({ error: "something went wrong" })
        }
        else {
            res.send(categoryToAdd)
        }
    }
    else {
        return res.status(400).json({ error: "Category already exist" })
    }

}
//get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await Category.find()
    if (categories) {
        res.send(categories)
    }
    else {
        return res.status(400).json({ error: "something went wrong" })
    }
}
// get category details by id
exports.categoryById = async (req, res) => {
    let category1 = await Category.findById(req.params.id)
    if (category1) {
        res.send(category1)
    }
    else {
        return res.status(400).json({ error: "something went wrong" })

    }
}

//update category by id
exports.updateCategory = async (req, res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.category_name
    }, { new: true })
    if (categoryToUpdate) {
        return  res.send(categoryToUpdate)
    }
    else {
        return res.status(400).json({ error: "somethng went wrong" })
    }
}
// //delete category by id
// exports.deleteCategory = async (req,res)=>{
//     let categoryToDelete = await Category.findByIdAndDelete(req.params.id)
//     if(categoryToDelete){
//         res.send(categoryToDelete)
//     }
//     else{
//         return res.status(400).json({error:"somethng went wrong"})

//     }

// }

//delete category
exports.deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(400).json({ error: "something went wrong" })
            }
            else {
                return res.status(200).json({ message: "category deleted successfully" })
            }
        })
        .catch(error => {
            return res.status(400).json({ error: error.message })
        })
}