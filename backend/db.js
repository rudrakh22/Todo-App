const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo-app');

const todoSchema = new mongoose.Schema({
  title: String,
  description:String,
  completed: Boolean,
});

const Todo=mongoose.model('todos',todoSchema);

module.exports={Todo}