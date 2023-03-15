import express from 'express';
import {RecipeModel} from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';
import { verfiyToken } from './users.js';

const router=express.Router();

router.get("/",async (req,res)=>{
    try{
        const response=await RecipeModel.find({});
        res.json(response);
    }catch(err){
        console.log(err);
    }
});

router.post("/",verfiyToken,async (req,res)=>{
    const newRecipe=new RecipeModel(req.body);
    try{
        const response=await newRecipe.save();
        res.json(response);
    }catch(err){
        console.log(err);
    }
});

router.put("/",verfiyToken,async (req,res)=>{
    try{
        const recipe=await RecipeModel.findById(req.body.recipeId);
        const user=await UserModel.findById(req.body.userId);
        
        user.savedRecipes.push(recipe);
        await user.save();

        res.json({savedRecipes:user.savedRecipes});
    }catch(err){
        console.log(err);
    }
});

router.get("/savedRecipes/ids/:userId",async (req,res)=>{
    try{
        const user=await UserModel.findById(req.params.userId);
        res.json({savedRecipes:user?.savedRecipes})
    }catch(err){
        console.log(err);
    }
});

router.get("/savedRecipes/:userId",async (req,res)=>{
    try{
        const user=await UserModel.findById(req.params.userId);
        const savedRecipes=await RecipeModel.find({
            _id:{$in:user.savedRecipes},
        });
        res.json({savedRecipes});
    }catch(err){
        console.log(err);
    }
});

export {router as RecipeRouter};