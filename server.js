const express = require('express');
const path = require('path');
const cors=require("cors");
const app = express();

const server = require('http').Server(app);

app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})


const port = process.env.PORT || 8080;
const io = require('socket.io')(server);
server.listen(port, () => console.log('start ' + port));
var rooms = {};

io.on('connection', (socket) => {

    console.log('connection ' + socket.id);
    socket.on('client-send-roomName', (data) => {
        console.log(socket.id + " " +data);
        socket.join(data); 
        socket.roomName = data;
        if (rooms[data] === undefined) rooms[data] = [];
        //console.log(socket.rooms);
        socket.emit('server-send-initData', rooms[data]);
        console.log(rooms);
    });
    socket.on('client-send-info', (data) => {
        rooms[socket.roomName].push(data);
        console.log(rooms);
        io.to(socket.roomName).emit('server-send-data', data);
    });
    socket.on('client-send-pass', (data) => {
        console.log(data);
        let rs = rooms[socket.roomName].length + 11 + 12 + 99;
        
        let c = false;
        if (parseInt(data) === rs) c = true;
        socket.emit('server-send-pass', c);
    });
    socket.on('client-send-infoRandom', (data) => {
        var start = parseInt(data.start);
        var end = parseInt(data.end);
        var amount = parseInt(data.amount);
        var list = [];
        var i = 1;
        while (i <= amount){
            let num = Math.floor((Math.random() * end) + start);
            list.push(rooms[socket.roomName][num]);
            i++;
        }
        io.to(socket.roomName).emit('server-send-infoRandom', list);
    });
}); 
