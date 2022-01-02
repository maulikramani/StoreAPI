require("dotenv").config()

const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");


const app = express();

const products = require("./routes/products")
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs", "access.log"), { flags: "a" })

// Middleware
app.use(express.json())
app.use(morgan("combined", { stream: accessLogStream }))


// Routes
app.use("/api/v1/products", products)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();
