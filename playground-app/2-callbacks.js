const add = (a, b, callback) =>{
    setTimeout(()=>{
        callback(a+b)
    }, 2000)
}



add(2,3,(sum)=>{
    console.log(sum)
})

const doWorkCallback = (callback) =>{
    setTimeout(()=>{
        callback(undefined,'this')
    }, 2000)
}

doWorkCallback((error, result)=>{
    if(error){
        return console.log(result)
    }
    console.log(result)
})