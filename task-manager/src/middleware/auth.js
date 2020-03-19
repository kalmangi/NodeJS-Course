const jwt = require('jsonwebtoken')
const User = require('../models/user')

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization')
//         //const decoded = jwt.verify(token, 'thisismynewcourse')
//         //const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

//         if (!user) {
//             throw new Error()
//         }

//         req.token = token
//         req.user = user
//         next()
//     } catch (e) {
//         res.status(401).send({ error: 'Please authenticate.' })
//     }
// }

const auth = async (req, res, next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        //const decoded = jwt.verify(token, 'this')
        //console.log('decoded', decoded)
        const user = await User.findOne({_id: '5e709d3e41e2e8379cd95df4'})
        // if(!user){
        //     throw new Error('No user')
        // }

        req.user = user
        //next()
        console.log('token', token)
        console.log('user', user)
    }
    catch(e){
        res.status(401).send({error: 'Failed auth'})
    }
    console.log('auth middleware')
    next()
}

module.exports = auth