//import { set } from "mongoose"

const doNewPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve([1,2,3])
    }, 2000)
})

doNewPromise.then((result)=>{
    console.log('Result',result)
}).catch((error)=>{
    console.log('Error',error)
})
const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },3000)
    })
}

const add1 = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },3000)
    })
}

//This will keeping summing up the result: 8,13. This is not promise chaining. This is just nesting async operations
add(5,3).then((sum)=>{
    console.log(sum);

    add(sum, 1).then((sum2)=>{
        console.log(sum2)
    }).catch((error)=>{
        console.log('Error',error)
    })
}).catch(error=>{
    console.log(error)
})

//Promise Chaining

add1(1,1).then((sum)=>{
    return add(sum, 5);
}).then((sum)=>{
    console.log(sum)
}).catch((error)=>{
    console.log(error)
})

//If we want to access to both of these two sums together its not easy.We should do something like save it to db and send them to user.
//Or we have to create variables in parent scope and assign in the add function.


