const router = require("express").Router();
const Product = require("../models/Product");

// Save product (existing code)
router.post("/saveProduct", async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json(err);
    }
});

// Get products with pagination
router.get("/getProducts", async (req, res) => {
    try {
        const { page = 1, limit = 30 } = req.query; // Default to page 1 and limit 30
        const skip = (page - 1) * limit; // Skip records for pagination

        const products = await Product.find()
            .skip(skip)
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments(); // Get total count for checking if there are more products
        const hasMore = totalProducts > skip + products.length; // If total products are more than the skip + current length, we have more to fetch

        res.status(200).json({ products, hasMore });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Existing routes for product search, update, delete, etc.
router.get("/getByStore", async (req, res) => {
    try {
        const storeId = req.query.id;
        const findProducts = await Product.find({ storeId });
        res.status(200).json(findProducts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getSingle/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const getProduct = await Product.findById(productId);
        res.status(200).json(getProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/search", async (req, res) => {
    try {
        const productName = req.body.name;
        const query = { name: { $regex: new RegExp(productName, "i") } };
        const searchResults = await Product.find(query);
        res.status(200).json(searchResults);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const { storeId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.storeId !== storeId) {
            return res.status(403).json({ message: "Unauthorized: You are not allowed to delete this product" });
        }
        const deletedProduct = await Product.findByIdAndDelete(productId);
        res.status(200).json(deletedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/updateProduct/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProductData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
