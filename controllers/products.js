const Product = require("../models/Product");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");


const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find({});

    res.status(200).json({ success: true, data: { products, count: products.length } })
})


const createProduct = asyncWrapper(async (req, res) => {
    const product = await Product.create(req.body)

    res.status(201).json({ product })
})


const getPorduct = asyncWrapper(async (req, res, next) => {
    const { id: productID } = req.params
    const product = await Product.findOne({ _id: productID })

    if(!product){
        return next(createCustomError(404, `No product found with id: ${productID}`))
    }

    res.status(200).json({ product })
})


const editProduct = asyncWrapper(async (req, res, next) => {
    const { id: productID } = req.params;
    const newData = req.body;
    const product = await Product.findByIdAndUpdate({ _id: productID }, newData, {
        new: true,
        runValidators: true
    })

    if(!product){
        return next(createCustomError(404, `No product found with id: ${productID}`))
    }

    res.status(200).json({ product })
})


const deleteProduct = asyncWrapper( async (req, res, next) => {
    const { id: productID } = req.params;
    const product = await Product.findByIdAndDelete({ _id: productID })

    if (!product) {
        return next(createCustomError(404, `No product found with id: ${productID}`))
    }

    res.status(200).json({ product })

})



module.exports = {
    getAllProducts,
    createProduct,
    getPorduct,
    editProduct,
    deleteProduct
}