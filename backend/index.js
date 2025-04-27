const express = require("express");
const router = require("./routes");
const cors = require("cors")
const bodyParser = require("body-parser")
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json())

const PORT = process.env.PORT

app.use("/api/v1", router)
app.listen(PORT, () => {
    console.log("Server is runnung on port", PORT)
})