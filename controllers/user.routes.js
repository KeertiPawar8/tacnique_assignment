const {UserModel} = require("../models/user.model")
const mongoose = require("mongoose")
const express = require("express")
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



userRouter.post("/register",async(req,res)=>{

const {name,email,password} = req.body;
console.log(name,email,password)
const checkuser = await UserModel.find({email})

if(checkuser.length>0){
    res.status(200).send({msg:"user already exist please login"})
}
else{

    try{
          
          bcrypt.hash(password,5,async(err,hash)=>{

                 const user = new UserModel({name,email,password:hash})
                 await user.save()
                 res.status(200).send({msg:"user has been registered"})

          })

    }
    catch(err){
        res.status(400).send(err)
    }
}

})

userRouter.post("/login",async(req,res)=>{

    const {email,password} = req.body;

    const user = await UserModel.find({email})

    if(user.length==0){
        res.status(200).send({msg: "user does not exist please signup"})
    }


    else{
              
        bcrypt.compare(password,user[0].password,(err,result)=>{
                 
            if(result){

              
                const token = jwt.sign({userID:user[0]._id, name: user[0].name},process.env.JWT_SECRET)
             
                res.status(200).send({token})


            }
            else{
                res.status(200).send({msg:"wrong credentials"})
            }


        })



    }

})

module.exports = {
    userRouter
};
