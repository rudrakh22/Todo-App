const express = require('express');
const {createTodo,updateTodo} = require('./types');
const {Todo}= require('./db');
const cors = require('cors');
const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}));

app.post("/todo",async (req,res)=>{
    const createPayload=req.body;
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({msg:"Wrong inputs"});
        return;
    }
    //Here you would save the parsed payload to your database
    await Todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })
    return res.json({
        msg:"Todo created successfully",
    })
})

app.get("/todos",async (req,res)=>{
    const todos=await Todo.find({});
    res.json({
        todos,
    })
})

app.put("/completed",async (req,res)=>{
    const updatePayload=req.body;
    const parsedPayload=updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success) { 
        res.status(411).json({msg:"Wrong inputs"});
        return;
    }
    //Here you would update the todo in your database
    await Todo.updateOne({
        _id:req.body.id
    },{
        completed:true
    })
    res.json({
        msg:"Todo marked as completed successfully",
    })
})

app.delete("/del-todos",async(req,res)=>{
    await Todo.deleteOne({
        _id:req.body.id
    })
    const todos=await Todo.find({});
    res.json({
        todos,
        msg:"Todo deleted successfully",
    })
})
app.get('/',(req,res)=>{
    res.send("Welcome")
})
app.listen(3000)

