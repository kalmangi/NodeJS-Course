require("../src/db/mongoose");
const User = require("../src/models/user")

//Update a field of a user using promise chaining
User.findByIdAndUpdate("5e5f4f5f3b217a29801c5740", { age: 31 }).then((user) => {
    console.log(user)
    return User.countDocuments({age:31})
}).then(result=>{
    console.log(result)
}).catch(error=>{
    console.log(error)
})

const updateageandcount = async (id, age)=>{
    const a = await User.findByIdAndUpdate(id,{age})
    const count = await User.findByIdAndUpdate({age})
    return count
}


updateageandcount("5e5f4eece6930821fc419d31", 2).then(count=>{
    console.log(count)
}).catch(e=>{
    console.log(e)
})
