const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const {sendWelcomeEmail, sendCancellationEmail} = require('../emails/account')
//////////////////////////REST API CRUD OPERATIONS FOR USER/////////////////////////


//using async await

router.get('/users', auth, async (req, res)=>{
   // const user = new User(req.body)
////////////////////////////////////////////////
///Using async/awaitnode 
    try{
       const users = await User.find({})
       //const token = await user.generateAuthToken()
       res.send(users)
    }catch (e){
        res.status(500).send('Site is down')
    }
////////////////////////////////////////
    //console.log(req.body)
    //res.send("Testing!")
    //const user = new User(req.body);


    //Without using async
    // User.find({}).then(users=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    //     // res.send(error)
    //     // console.log("error",error)
    // })
    


    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    //     // res.send(error)
    //     // console.log("error",error)
    // })
})

//////To read user profile///to get user profile when authenticated
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    console.log(req.user)
   
})
//////////////////////////////

const upload = multer({
    //dest:'images'
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

// router.post('/upload', auth, upload.single('upload'), async (req, res) => {
//     //const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
//     // if(avatar === null){
//     //     await req.user.save()
//     // }
    
//     //res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

router.post('/upload', upload.single('upload'), auth, async (req, res)=>{
    // req.user.upload=req.file.buffer  
    // await req.user.save()
    console.log(req.user)
    res.status(200).send('file uploaded successfully')
   // res.status(200).send('file uploaded successfully')
},(error, req, res, next)=>{
    res.status(400).send({error: error.message})
})//This func is designed to handle errors


router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

//using async/await
//This router is for sign up
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        console.log('email sent')
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

//    await user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//         // res.send(error)
//         // console.log("error",error)
//     })
})

// app.post('/users', (req,res)=>{
//     //console.log(req.body)
//     //res.send("Testing!")
//     const user = new User(req.body);

//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//         // res.send(error)
//         // console.log("error",error)
//     })
// })

//This route is for login
//user wont be able to create an account with same email or password
//this finds email, password of user to login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token })
        console.log(req.body.email, req.body.password)
        console.log('user logged in')
    } catch (e) {
        res.status(400).send('user not recognised')
        console.log('user restricted')
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()
        res.send(req.user)
        console.log('user has logged out')
    }
    catch(e){
        res.status(500).send()
        console.log('user has not logged out')
    }
})

//logout for all the sessions so that user cannot see profiles
router.post('/users/logoutAll', auth, async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
        console.log('logout All')
    }
    catch(e){
        res.status(500).send()
    }
})

//This API is used to update user. We use mongoose methods. With MOngodb native driver, there is no need to use '$set'
router.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)//Keys will convert object to array
    const allowedUpdates = ["name","email","age","password"]
    const isValidOperation = updates.every((update)=>{
        allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid operation'})
    }
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        updates.forEach((update)=>user[update]=req.body[update])
        console.log(user[update])
        await user.save()
        //const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        //new - this returns a new user.
        //runvalidators - This is used to run validation for the update.
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
});



router.patch('/users/me', auth, async (req,res)=>{
    const updates = Object.keys(req.body)//Keys will convert object to array
    const allowedUpdates = ["name","email","age","password"]
    const isValidOperation = updates.every((update)=>{
        allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid operation'})
    }
    //const _id = req.params.id

    try{
        //const user = await User.findById(_id)
        updates.forEach((update)=>user[update]=req.body[update])
        //await req.user.save()
        console.log(user[update])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        //new - this returns a new user.
        //runvalidators - This is used to run validation for the update.
        // if (!user){
        //     return res.status(404).send()
        // }
        res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/:id',async (req,res)=>{
    //Using async/await
    const _id = req.params.id
    //console.log(_id)
    try{
        const user = await User.findByIdAndDelete(_id)
        if (!user){
            return res.status(404).send()
        }
        sendCancellationEmail(user.email)
        res.send(req.user)
    }catch (e){
        res.status(500).send()
    }
  
})

//delete the user who is logged in
// router.delete('/users/:id', auth, async (req, res)=>{
//     try {
//         await req.user.remove()
//         sendCancellationEmail(req.user.email)
//         res.send(req.user)
//     }
//     catch(e){
//         res.status(500).send()
//     }
// })


// router.get('/users/:id',async (req,res)=>{
//     //Using async/await
//     const _id = req.params.id
//     //console.log(_id)
//     try{
//         const user = await User.findById(_id)
//         if (!user){
//             return res.status(400).send()
//         }
//         res.send(user)
//     }catch (e){
//         res.status(500).send()
//     }
//     // console.log(req.params)
//     // User.findById(_id).then((user)=>{
//     //     if (!user){
//     //         res.status(400).send()
//     //     }
//     //     res.send(user)
//     // }).catch(()=>{
//     //     res.status(500).send()
//     // })
// })



module.exports = router
