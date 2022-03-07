// requiring packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socket = require('socket.io');
const http = require('http');
const cors = require('cors');

// requiring routes
const game = require('./routes/game.routes');
const socketOnConnection = require('./services/socketService');

const app = express();
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3001/',
    },
});

dotenv.config();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.send({ success: 'app running' });
});

app.use('/api/game', game);

io.on('connection', socketOnConnection);

// connecting to db + listen
const dbURI = process.env.dbURI;
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        server.listen(PORT);
        console.log('now listening');
    })
    .catch((error) => console.log(error));
