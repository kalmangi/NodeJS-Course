const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser: true,
    useCreateIndex: true
})

// const User = mongoose.model('User',{
//     name: {
//         type: String,
//     },
//     age: {
//         type: Number,
//     }
// })

// const a=new User({
//     name: "a",
//     age: 24
// })

// a.save().then(()=>{
//     console.log(a)
// }).catch((error)=>{
//     console.log(error)
// })

const Tasks = mongoose.model('Task',{
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const Task = new Tasks({
    description: "a",
    completed: true
});

Task.save().then(()=>{
    console.log(a)
}).catch((error)=>{
    console.log(error)
})