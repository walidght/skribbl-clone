module.exports = function (socket) {
    console.log('new client connected');

    socket.emit('connection', 'welcome');

    socket.on('join room', (room) => {
        socket.join(room);
        console.log(`socket ${socket.id} joined ${room}`);
    });

    socket.on('message', (message, sender, room) => {
        console.log(message);
        socket.to(room).emit('message', message, sender);
    });

    socket.on('draw', (oldX, oldY, x, y, room) => {
        socket.to(room).emit('draw', oldX, oldY, x, y);
    });

    socket.on('reset', (room) => {
        socket.to(room).emit('reset');
    });

    socket.on('new player', (name, score, room) => {
        const newName = name;
        const newScore = score;

        socket.to(room).emit('new player', newName, newScore);
    });

    socket.on('update players', (name, score, room) => {
        const newName = name;
        const newScore = score;

        socket.to(room).emit('update players', newName, newScore);
    });

    socket.on('timer', (timer, room) => {
        if (timer >= 0) socket.to(room).emit('timer', timer);
    });

    socket.on('new drawer', (room) => {});
};
