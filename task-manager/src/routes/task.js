const express = require('express')
const Task = require('../models/task')
const User = require('../models/user')
const auth = require("../middleware/auth")
const router = new express.Router()

//////////////////////////CRUD OPERATIONS FOR TASK/////////////////////////

router.post('/tasks', auth, async (req, res)=>{
    //console.log(req.body)
    //res.send("Testing!")
    // const task = new Task({
    //     ...req.body,
    //     owner: req.user._id//This is to make association with another model which is user
    // })
   // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user
        //This is to make association with another model which is user
    })
    console.log('request user', task.completed)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    
    // task.save().then(()=>{
    //     //const token = task.generateAuthToken()
    //     res.send(task)
    //     console.log('task created')
    // }).catch((error)=>{
    //     res.send(error)
    //     console.log("Task not created",error)
    // })
})
//GET /tasks?completed=true - This is to filter  all tasks which are completed
//GET /tasks?limit=10&skip=10 - If we skip 10 then get 10, we are getting second set of 10
router.get('/tasks', auth, async (req,res)=>{
    
    const match = {}
    if(!req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    //Using async/await
    try {
        const task = await Task.find({match})
        //await req.user.populate('tasks').execPopulate()
        // await req.user.populate({
        //     tasks
        //     // path: 'tasks',
        //     // match: {
        //     //     completed: false
        //     // }
        //     // // options: {
        //     // //     limit: 1
        //     // // }
        // }).execPopulate()
        //const token = await task.generateAuthToken()
        res.send(task)
        // console.log('tokennn',token)
    }
    catch(e){
        res.status(500).send('site is down')
    }
    //console.log(req.body)
    //res.send("Testing!")
    //const task = new Task(req.body);

//Without async/await
    // Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })


    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     res.send(error)
    //     console.log("Task not created",error)
    // })
})

router.delete('/tasks/:id',async (req,res)=>{
    //Using async/await
    const _id = req.params.id
    //console.log(_id)
    try{
        const task = await Task.findByIdAndDelete(_id)
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (e){
        res.status(500).send()
    }
  
})

router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body)//Keys will convert object to array
    const allowedUpdates = ["description"]
    const isValidOperation = updates.every((update)=>{
        allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid operation'})
    }
    const _id = req.params.id

    try{    

        //encrypting password
        const task = await Task.findById(_id)
        console.log(task)
        updates.forEach((update)=>task[update]=req.body[update])
        console.log(task[update])
        await task.save()


       // const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        //new - this returns a new user.
        //runvalidators - This is used to run validation for the update.
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
});

router.post('/tasks/login', async (req, res) => {
    try {
        const task = await Task.findByCredentials(req.body.description)
        const token = await task.generateAuthToken()
        res.send({ task, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/tasks/:id', async (req,res)=>{
    //console.log(req.body)
    //res.send("Testing!")
    //const task = new Task(req.body);

//using async/await
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }
    catch (e){
        res.status(500).send()
    }


//Without using async/await
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         res.status(400).send()
    //     }
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })


    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     res.send(error)
    //     console.log("Task not created",error)
    // })
})

module.exports=router