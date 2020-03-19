require("../src/db/mongoose");
const Task = require("../src/models/task")

//using promise chaining
Task.findByIdAndDelete("5e5f5251da5db13e804a4dd2").then((task)=>{
    console.log(task)
    return Task.countDocuments({completed: true})
}).then(result=>{
    console.log(result)
}).catch(error=>{
    console.log(error)
})

//using async/await
const deleteTaskandCount = async (id,completed)=>{
    const b = await Task.findByIdAndDelete(id);
    const c = await Task.countDocuments({completed})
    return c
}

deleteTaskandCount("5e5f5231897cb1427cdd56c0", true).then((count)=>{
    return console.log(count)
}).catch((e)=>{
    console.log(e)
})