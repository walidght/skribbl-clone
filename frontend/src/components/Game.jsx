import './Game.css';
import logo from '../assets/logo.svg';
import { useSearchParams } from 'react-router-dom';
import GameCanva from './GameCanva';
import { useState, useRef, useEffect } from 'react';
import immer from 'immer';
import Chat from './Chat';
import PlayersList from './PlayersList';
import axios from 'axios';
import Timer from './Timer';

const Game = ({ socket }) => {
    const [params, setParams] = useSearchParams();
    const [messages, setMessages] = useState([]);
    const [reset, setReset] = useState(false);
    const [players, setPlayers] = useState([]);
    const [lastDrawRound, setLastDrawRound] = useState(null); // represents the last round the client player draw
    const [isDrawing, setIsDrawing] = useState(false);
    const [timer, setTimer] = useState(1);
    const name = params.get('name');
    const room = params.get('room');
    const score = 0;
    const round = 0;
    const word = 'falling star';

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/game/${room}`)
            .then((response) => {
                if (response.data.data.creator === name) {
                    setLastDrawRound(response.data.data.currentRound);
                    setIsDrawing(true);
                } else {
                    setLastDrawRound(response.data.data.currentRound - 1);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    socket.on('connection', () => {
        console.log(socket.id);
        socket.emit('join room', room);
        socket.emit('new player', name, score, room);
    });

    return (
        <div className="game-container">
            <div className="header-container">
                <img src={logo} alt="" />
                <div className="header-buttons">
                    <p className="score">
                        {name}: <span>{score}</span>
                    </p>
                    <p className="round">round: {round}</p>
                    <Timer
                        timer={timer}
                        setTimer={setTimer}
                        isDrawing={isDrawing}
                        setIsDrawing={setIsDrawing}
                        room={room}
                        socket={socket}
                    />
                    <button
                        className="home"
                        onClick={() => {
                            window.location.replace('http://localhost:3001/');
                        }}
                    ></button>
                </div>
            </div>
            <div className="main-container">
                <div className="left-main-container">
                    <PlayersList
                        players={players}
                        setPlayers={setPlayers}
                        socket={socket}
                        name={name}
                        score={score}
                        room={room}
                    />

                    <div className="word-container">{word}</div>
                </div>
                <div className="right-main-container">
                    <div className="content-container">
                        <GameCanva
                            reset={reset}
                            setReset={setReset}
                            socket={socket}
                            room={room}
                            isDrawing={isDrawing}
                            setIsDrawing={setIsDrawing}
                        />
                        <Chat
                            room={room}
                            messages={messages}
                            setMessages={setMessages}
                            socket={socket}
                            name={name}
                            isDrawing={isDrawing}
                            setIsDrawing={setIsDrawing}
                        />
                    </div>
                    <div className="tools-container">
                        <button
                            id="trash"
                            onClick={() => {
                                setReset(true);
                                socket.emit('reset', room);
                            }}
                        ></button>
                        <button id="arrow"></button>
                        <button id="pencil-clicked"></button>
                        <button id="color"></button>
                        <button id="plus"></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
