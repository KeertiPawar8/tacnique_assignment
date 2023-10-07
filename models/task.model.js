const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creation_date: { type: Date, default: Date.now },
  status: {
    type: String,
    default: 'pending', 
    enum: ['pending', 'completed'], 
  
  },
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
    TaskModel,
};
