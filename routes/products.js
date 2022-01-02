const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    getPorduct,
    createProduct,
    editProduct,
    deleteProduct
} = require("../controllers/products")


router.route("/").get(getAllProducts).post(createProduct)
router.route("/:id").get(getPorduct).patch(editProduct).delete(deleteProduct)


module.exports = router