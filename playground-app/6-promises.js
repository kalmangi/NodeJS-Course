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


