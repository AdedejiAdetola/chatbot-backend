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
    //console.log(socket.id)
    const welcomeMessage = {
        message: 'welcome',
        time: String(new Date(Date.now()).getHours()).padStart(2,0) + ":" + String(new Date(Date.now()).getMinutes()).padStart(2,0)
    }
    socket.emit('receive_message', welcomeMessage)

    // if socket.id, then let on>emit work
    socket.on('send_message', (data) => {
        //console.log('message',data)
        //if data.messge = this, emit that
        const messageResponse = {
            message: 'wagwan my gee',
            time: String(new Date(Date.now()).getHours()).padStart(2,0) + ":" + String(new Date(Date.now()).getMinutes()).padStart(2,0)
        }
        socket.emit('receive_message', messageResponse)
    })

    

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(3001, ()=>{
    console.log('server running on port 3001')
})