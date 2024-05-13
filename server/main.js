const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const multer = require("multer")
const cors = require("cors")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/products")
const orderRoute = require("./routes/orders")

const app = express()

app.use(express.json())
app.use(cors({ origin: "*" }))
dotenv.config()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where you want to store uploaded files
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.error("MongoDB connection failed:", err));


app.use('/uploads', express.static('uploads'));




app.post("/uploadImage", upload.single("image"), (req, res) => {
    try {
        // Check if an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        // Return the filename of the uploaded image
        res.status(200).json({ filename: req.file.filename });
    } catch (err) {
        res.status(500).json(err);
    }
});


app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/product", productRoute)
app.use("/order", orderRoute)





const port = process.env.PORT || 4004
app.listen(port, () => console.log(`Server running at port ${port}`))