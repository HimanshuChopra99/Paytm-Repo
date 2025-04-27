const express = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router()

accountRouter.get("/balance", authMiddleware, async(req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

accountRouter.post("/transfer", authMiddleware, async(req, res) => {
    const session = await mongoose.startSession();
    
    try{
        session.startTransaction();

    const {amount, to} = req.body;

    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount) {
        res.status(400).json({
            msg: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount) {
        await session.abortTransaction();
        res.status(400).json({
            msg: "Invalid Account"
        })
    }

    //perform transfer
    await Account.updateOne({userId: req.userId}, {$inc: { balance: -amount }}).session(session)
    await Account.updateOne({userId: to}, {$inc: { balance: amount }}).session(session)

    //commit transaction
    await session.commitTransaction()

    res.json({
        msg: "Transfer successful"
    });
    
    } catch (err) {
        session.abortTransaction()
        res.json({
            msg: "Transation Failed"
        })
    }
})

module.exports = {
    accountRouter
}