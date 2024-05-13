const router = require("express").Router()
const User = require("../models/User")



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