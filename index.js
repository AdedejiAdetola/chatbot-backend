const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");


const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    }
})

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.emit('receive_message', 'welcome')

    // if socket.id, then let on>emit work
    socket.on('send_message', (data) => {
        console.log(data)
        //if data.messge = this, emit that
        socket.emit('receive_message', 'boys')
    })

    

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(3001, ()=>{
    console.log('server running on port 3001')
})