import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const secret="something";
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  
  if(user){
    return res.json({message:"User already exits"});
  }
  const hashedPass=await bcrypt.hash(password,10);
  const newuser=new UserModel({username,password:hashedPass});
  newuser.save();

  res.json({message:"User created"});
});

router.post("/login",async (req,res)=>{
    const {username,password}=req.body;
    const user=await UserModel.findOne({username});

    if(!user){
      return res.json({message:"User not found"});
    }
    const check=await bcrypt.compare(password,user.password);

    if(!check){
      return res.json({message:"Wrong username or password"});
    }

    const token=jwt.sign({id:user._id},secret);

    res.json({token,userId:user._id});
});

export {router as userRouter};

export const verfiyToken=(req,res,next)=>{
  const token=req.headers.authorization;
  if(token){
    jwt.verify(token,secret,(err)=>{
        if(err)return res.sendStatus(403);
        next();  
    })
  }else{
    res.sendStatus(401);
  }
}