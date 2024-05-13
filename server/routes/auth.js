const router = require("express").Router()
const User = require("../models/User")





router.post("/validate", async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Find user by phone number
        const user = await User.findOne({ phone });

        // If user not found or password doesn't match
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid phone number or password." });
        }

        // Return success response
        res.status(200).json(user);
    } catch (err) {
        console.error("Error authenticating user:", err);
        res.status(500).json(err);
    }
});






module.exports = router