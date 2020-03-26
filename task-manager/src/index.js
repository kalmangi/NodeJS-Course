const app = require('./app')
// const express = require('express')
// require("./db/mongoose")
// const User = require('./models/user')
// const Task = require('./models/task')
//
//const auth = require('../src/middleware/auth')
//const router = new express.Router()
// const userRouter = require("./routes/user")
// const taskRouter = require("./routes/task")

// const app = express()
const port = process.env.PORT || 3002 

// const multer = require('multer')

// const upload = multer({
//     dest: 'images',
//     limits:{
//         fileSize:22000//set the size of files upload
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload word document'))
//         }
//         cb(undefined, true)
//         // cb(new Error('Must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// const errorMiddleware=(req,res,next)=>{
//     throw new Error('From my middleware')
// };

//register multi-year middleware - upload.single() - What ever comes back from call to single
// app.post('/upload', upload.single('upload'), auth, async (req, res)=>{
//     res.status(200).send('file uploaded')
// },(error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })//This func is designed to handle errors

// const upload1 = multer({
//     //dest: 'avatars',
//     limits:{
//         fileSize:22000//set the size of files upload
//     },
//     fileFilter (req, file, cb){
//         if(!file.originalname.match(/\.(jpg|pdf|docx)$/)){
//             return cb(new Error('Please upload valid document'))
//         }
//         cb(undefined, true)
//     }
// })

// app.post('/users/me/avatar', auth, upload1.single('avatar'), async (req, res)=>{
//     req.user.avatar = req.file.buffer
//     await req.user.save()
//     res.status(200).send('file uploaded')
//     console.log(req.file)
// },(error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })

// app.use((req, res, next)=>{
  
//     // if(req.method === 'GET'){
//     //     res.send('Get req are disabled')
//     // }else{
//     //     next()
//     // }
//     console.log(req.method, req.path)
//      next()//This is called so as to run the route handler
// });//This is middleware function. It can validate if user exists in db.

// app.use((req, res, next)=>{
//     res.status(503).send('site is currently down')
// })

// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)

//start application
// app.get('/', (req, res) => {
//     return res.json({
//         message: 'Welcome to task api!!!'
//     })
// })


// const bcrypt = require('bcrypt')
// const myfunc = async () =>{
//     const password = "abcd"
//     const hashPass = await bcrypt.hash(password, 8)
//     console.log(hashPass)
//     console.log(password)
// }
// myfunc()

// var jwt = require('jsonwebtoken');

// const myfunction = async () => {
//     const mytoken = jwt.sign({_id:'abch123'},'firstcourse', {expiresIn:'6 days'})
//     console.log(mytoken)

//     const data = jwt.verify(mytoken, 'firstcourse')
//     console.log('dddaataa',data)

// }

// myfunction()

//Without middleware: whenever there is new request :- run route handler

//With middleware: new request :- do something(validate if token authentication, set some logs for analytics) :- run route handler

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

//const Task = require('./models/task')

// const main = async () =>{

//     const user = await User.findById('')
//     //console.log(user.tasks)
//     // const task = await Task.findById('5e707280d4647a48f4076c3b')
//     // await task.populate('owner').execPopulate()//This is used to populate data from relationship
//     // console.log(task.owner)
// }

// main()