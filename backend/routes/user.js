const express = require("express");
const { signupSchema, updateUser } = require("../zod");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middlewares/middleware");


const userRouter = express.Router();

userRouter.post("/signup", async(req, res)=> {
     const body = req.body;

     const parsedBody = signupSchema.safeParse(body)

     if(!parsedBody.success) {
        return res.status(411).json({
            msg: "Error in Signup/ wrong inputs"
        })
     }

     const existingUser = await User.findOne({
        username: body.username
     })

     if(existingUser) {
        return res.status(411).json({
            msg: "Email already taken/Incorrect inputs"
        })
     }

     const hashPassword = await bcrypt.hash(body.password, 10);

     const user = await User.create({
        username: body.username,
        password: hashPassword,
        firstName: body.firstName,
        lastName: body.lastName
     });

     const userId = user._id;

     //add random balance
     await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
     })

     const token = jwt.sign({
        userId: user._id
     }, JWT_SECRET)

     res.json({
        msg: "User created successfully",
        token: token,
        userId: user._id
     })
})

userRouter.post("/signin", async(req, res) => {
    const body = req.body;

    const user = await User.findOne({
        username: body.username,
    })

    if(!user) {
        return res.status(411).json({
            msg: "Invalid username or password"
        })
    }

    const match = await bcrypt.compare(body.password, user.password);

    if(!match) {
      return res.status(401).json({
        msg: "wrong email or password"
       })
    }

    const token = jwt.sign({
        userId: user._id,
    }, JWT_SECRET)

    res.json({
        msg: "Signin successful",
        token,
        userId: user._id
    })

})

userRouter.put('/', authMiddleware, async(req, res) => {
    const parsedBody = updateUser.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(401).json({
            msg: "Error while updating information"
        })
    }

    if(req.body.password) {
        try{
            const hashPassword = await bcrypt.hash(req.body.password, 10);

            req.body.password = hashPassword
        } catch(err) {
            return res.status(500).json({
                msg: "Error hashing password"
            });
        }
    }

    await User.updateOne(
        {_id: req.userId},
        {$set: req.body}
    )

    res.json({
        msg: "Updated sucessfully"
    })
})

userRouter.get("/bulk", async(req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

userRouter.get('/profile', authMiddleware, async(req, res) => {
    try{
        const userId = req.userId
        userData = await User.findOne({
            _id: userId
        })
        
        res.json({
            userData
        })

    } catch(err) {
        res.status(401).json({
            msg: "error in getting user information", err
        })
    }
})

module.exports = userRouter;