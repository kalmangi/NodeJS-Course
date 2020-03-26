//write code to connect to web sockets
const socket = io()
socket.on('message', (message)=>{
    console.log(message)
})
// socket.on('count updated', (count) =>{
//     console.log('The count has been updated! ', count)
// })                                   //function runs when an event occurs

// document.querySelector('#increment').addEventListener('click', ()=>{
//     console.log('clicked')
//     socket.emit('increment')         //send event from client to server
// }) 
document.querySelector('#form-msg').addEventListener('submit', (e)=>{
    e.preventDefault()                   //Prevents default behavious when browser goes through full page refresh.
    //const message = document.querySelector('input').value
    const message = e.target.elements.message.value
    
    socket.emit('sendMessage', message)   //send event from client to server
}) 

document.querySelector('#send-location').addEventListener('click', ()=>{
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((a)=>{
        //console.log(a)
        socket.emit('sendlocation', {
            latitude: a.coords.latitude,
            longitude: a.coords.longitude
        })
    })
})