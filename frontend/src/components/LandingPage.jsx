import './LandingPage.css';
import { useState } from 'react';
import logo from '../assets/logo.svg';
import NickName from './NickName';
import GameSetup from './GameSetup';
import RoomCode from './RoomCode';
import StartGame from './StartGame';
import WaitGame from './WaitGame';

function NickNameScreen() {
    const [name, setName] = useState('');
    const [step, setStep] = useState(1);
    const [roomCode, setRoomCode] = useState('');
    const [newRoom, setNewRoom] = useState(false);
    const [roundsCount, setRoundsCount] = useState(1);

    return (
        <div className="container">
            <div>
                <div className="header">
                    <img src={logo} alt="" />
                    <button></button>
                </div>
                <div className="progress-bar">
                    <div className="filled-bar"></div>
                    {step >= 2 ? (
                        <div className="filled-bar"></div>
                    ) : (
                        <div className="empty-bar"></div>
                    )}
                    {step >= 4 ? (
                        <div className="filled-bar"></div>
                    ) : (
                        <div className="empty-bar"></div>
                    )}
                </div>
            </div>

            {(step === 1 && (
                <NickName name={name} setName={setName} setStep={setStep} />
            )) ||
                (step === 2 && (
                    <GameSetup
                        name={name}
                        setStep={setStep}
                        step={step}
                        newRoom={newRoom}
                        setNewRoom={setNewRoom}
                        roundsCount={roundsCount}
                        setRoundsCount={setRoundsCount}
                    />
                )) ||
                (step === 3 && (
                    <RoomCode
                        roomCode={roomCode}
                        setRoomCode={setRoomCode}
                        setStep={setStep}
                        title={newRoom ? 'create room' : 'your room code'}
                        step={step}
                        name={name}
                        roundsCount={roundsCount}
                    />
                )) ||
                (step === 4 &&
                    ((newRoom && (
                        <StartGame name={name} code={roomCode}></StartGame>
                    )) || <WaitGame name={name} code={roomCode}></WaitGame>))}
        </div>
    );
}

export default NickNameScreen;
