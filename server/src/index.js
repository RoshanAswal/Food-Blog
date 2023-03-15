import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { RecipeRouter } from "./routes/recipes.js";

const app=express();

app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipes",RecipeRouter);

mongoose.connect("mongodb+srv://Roshan:test123@test.98za2kd.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.listen(3000,
    ()=>{console.log("running");}
)

// mongodb+srv://Roshan:<password>@test.98za2kd.mongodb.net/test