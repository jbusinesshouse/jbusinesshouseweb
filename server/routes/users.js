const router = require("express").Router()
const User = require("../models/User")




router.get("/getUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch the user from the database and select specific fields
        const user = await User.findById(userId).select('name phone storeName storeAddress storePhoto');

        // If no user is found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the response with the selected fields
        res.status(200).json({
            id: user._id,
            name: user.name,
            phone: user.phone,
            storeName: user.storeName,
            storeAddress: user.storeAddress,
            storePhoto: user.storePhoto
        });
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json(err);
    }
});




router.post("/saveUser", async (req, res) => {
    try {
        const userData = req.body;

        // Create a new user instance
        const newUser = new User(userData);

        // Save the user to the database
        const savedUser = await newUser.save();

        // Return success response
        res.status(200).json(savedUser);
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).json(err);
    }
})






module.exports = router