const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }//this will tell who this image belongs to
}, {
    timestamps: true
})

//This is used to set up virtual attributes
userSchema.virtual('tasks', {
    ref: 'Task',//Ref between user and task. This is for mongoose to able to figure out who owns what, how they are related.
    localField: '_id',
    foreignField: 'owner'
})

//Hiding private Date
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    // delete userObject.password
    // delete userObject.tokens
    //delete userObject.avatar

    return userObject
}


//generates auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'this')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')//immediately end execution of func
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
    console.log(user)
}


userSchema.methods.getPublicProfile = async function(){
    const user = this
    const userObject = user.toObject()
    console.log('this is pass',userObject.password)
    delete userObject.email
    //delete userObject.tokens
    
    return userObject
}
//use a method on user schema and set up middleware
//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)//creating separate schema and model will create to take advantage of middleware.

module.exports = User