const path = require('path');
const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)//this is going to create web server and pass this to the application. 
let count = 0;                     //If we dont do this express library does this behind the scenes.
const socketio = require('socket.io')
const io = socketio(server)//server supports web sockets
const port = process.env.PORT || 3003;
const publicDirectoryPath = path.join(__dirname,'../public')

//set up a middleware
app.use(express.static(publicDirectoryPath))

// app.get('/',(req, res)=>{
//     res.send('Hello Express!')
// })

//server (emit) -> client (receive) - count updated
//client (emit) -> server(receive) - increment

//print a msg to ther terminal when new client connects
io.on('connection', (socket) =>{
    console.log('New web socket connection');
    socket.emit('message','Welcome!')
    socket.broadcast.emit('message','A new user has joined')
    socket.on('sendMessage', (message)=>{
        io.emit('message', message )
    })
    socket.on('disconnect', () => { 
        io.emit('message','A user has left')
    })
    socket.on('sendlocation', (coords) =>{
        io.emit('message', `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
    //socket.emit('count updated', count)     //sending and receiving events
    // socket.on('increment', () => {
    //     //console.log('The count has been updated! ', count)
    //     count++
    //     //console.log('ddd',count++)
    //     io.emit('count updated', count)       //Client gets updated count
    //                                          //io.emit This omits the event to every single connection
    // })
  });                                          //Socket is an object it contains info about new connection. 
                                            //Socket on the server thats available when new connection comes in.
                                            //we can use methods on socket to communicate with that specific client. 
                                            //Function is called 5 times when 5 clients are connected
server.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})