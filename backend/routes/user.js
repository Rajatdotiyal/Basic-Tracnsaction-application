const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
})



router.post("/signup", async (req,res)=>{
    const validUser = signupSchema.safeParse(req.body);
    if(!validUser.success){
       return res.json({
        message: "Incorrect inputs"
       })
    }

    const existingUser = await User.findOne({
        username : req.body.username,
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
           })
    }

    const dbUser = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    });

    const userId  = dbUser._id;

    //------creating Account------

    await Account.create({
        userId,
        balance : 1 + Math.random() * 10000,
    })


    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })


})


const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
})


router.post("/signin", async (req,res)=>{
    const body = req.body;
    const validUser = signinSchema.safeParse(req.body);
    if(!validUser.success){
        return res.json({
            message: "Incorrect inputs"
           })
    }

    const user = await User.findOne(body);
    if(user){
        const token = jwt.sign({
            userId: user._id,
        },JWT_SECRET)

        res.json({
            token
        })
        return
    }

    res.status(411).json({
        message: "Error while logging in"
    })

})

const updateUser = zod.object({
    firstName : zod.string().optional(),
    password : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put('/', authMiddleware, async (req,res)=>{
    const validUser = updateUser.safeParse(req.body);
    if(!validUser.success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id : req.userId},req.body)

    res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk",authMiddleware, async(req,res)=>{

    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName : {
                "$regex" : filter,
            }
        },{
            lastName : {
                "$regex" : filter,
            }
        }]
    })

    res.json({
        user: users.map(user =>({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id,
    }))
})
})

module.exports = router;