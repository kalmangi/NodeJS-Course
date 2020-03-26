const mongoose = require('mongoose');
//const validator = require('validator')
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api-test",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const User = mongoose.model('User',{
//     name: {
//         type: String,
//     },
//     age: {
//         type: Number,
//         default: 0,
//          validate(value) {
//                 if(value<0){
//                     throw new Error('Must be positive')
//                 }
//             }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,

//         validate(value){
//             if(!validator.isEmail(value)){
//                 console.log('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Incorrect password')
//             }
//         }
//     }
// })

// const a=new User({
//     name: "a",
//     age: 24,
//     email: "a@g",
//     password: 'passwosrdd'
// })

// a.save().then(()=>{
//     console.log(a)
// }).catch((error)=>{
//     console.log(error)
// })

// const Tasks = mongoose.model('Task',{
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// });

// const Task = new Tasks({
//     description: "Eat Lunch",
//     //completed: true
// });

// Task.save().then(()=>{
//     console.log(Task)
// }).catch((error)=>{
//     console.log(error)
// })