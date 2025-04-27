const mongoose = require("mongoose");
require('dotenv').config();


mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("MongoDb connected successfully")
})
.catch((err) => {
    console.log("MongoDb connection failed:", err)
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }

})
const User = mongoose.model("User", userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account,
}