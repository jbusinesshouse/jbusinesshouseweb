const router = require("express").Router()
const Order = require("../models/Order")





router.post("/saveOrder", async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/getOrdersByStoreId/:id", async (req, res) => {
    try {
        const storeId = req.params.id;
        const orders = await Order.find({ "product.storeId": storeId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/updateOrder/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updatedOrderData = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/deleteOrder/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        res.status(200).json(deletedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router