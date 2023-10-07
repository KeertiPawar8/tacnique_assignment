const express = require("express")
const taskRouter = express.Router();

const {authenticate} = require("../middlewares/auth.middleware");
const {TaskModel}  = require("../models/task.model");
const {UserModel} = require("../models/user.model")
taskRouter.post("/tasks",authenticate,async(req,res)=>{
    const payload = req.body
    try {
        const task = new TaskModel(payload)
         await task.save()
        
        res.status(200).send({msg:"Task created"})
    } catch (error) {
        
        res.status(400).send({error})
    }
   
    
    })


    taskRouter.get("/tasks",authenticate,async(req,res)=>{

        try {
         
    let data = await TaskModel.find();
    res.status(200).send(data)

          } catch (err) {
            res.status(400).send(err.message);
          }
    
        })

        taskRouter.get("/tasks/:id",authenticate,async(req,res)=>{

            const taskid = req.params.id;
            try{
                const task = await TaskModel.find({"_id":taskid})
    
                res.status(200).send(task)
            }
            catch(error){
                res.status(400).send({error})
            }
       
            })


            taskRouter.put("/tasks/:id",authenticate,async(req,res)=>{

                const taskid = req.params.id;
                try{
                    const task = await TaskModel.findByIdAndUpdate({"_id":taskid},req.body)
        
                    res.status(200).send({msg:"Task has been updated"})
                }
                catch(error){
                    res.status(400).send({error})
                }
           
                })




            taskRouter.delete("/tasks/:id",async(req,res)=>{
                    const id = req.params.id
                      const user  = await TaskModel.find({_id:id})
                    
                      if(user[0].userID == req.body.userID){
                       
                        await TaskModel.findByIdAndDelete ({_id:id})
                          res.status(200).send({msg:"Task has been deleted"})
                  
                      }
                      else{
                        res.status(401).send({msg:"Not authorised to delete the task"})
                      }
                  
                    })

    module.exports = {
        taskRouter
    };
    