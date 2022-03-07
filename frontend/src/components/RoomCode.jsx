import './RoomCode.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RoomCode({
    title,
    roomCode,
    setRoomCode,
    setStep,
    step,
    name,
    roundsCount,
}) {
    const navigate = useNavigate();
    function clickHandler(event) {
        if (event.key === 'Enter' && roomCode != '') {
            if (title === 'create room') {
                axios
                    .post('http://localhost:3000/api/game/create', {
                        creator: name,
                        code: roomCode,
                        rounds: roundsCount,
                    })
                    .then(function (response) {
                        if (!response.data.success) {
                            return alert(response.data.error);
                        }
                        console.log(response.data.success);

                        setStep(4);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            if (title === 'your room code') {
                axios
                    .post('http://localhost:3000/api/game/join', {
                        name: name,
                        code: roomCode,
                    })
                    .then(function (response) {
                        if (!response.data.success) {
                            return alert(response.data.error);
                        }

                        console.log(response.data);
                        if (response.data.room.started) {
                            navigate(
                                `/game?name=${encodeURIComponent(
                                    name
                                )}&room=${encodeURIComponent(roomCode)}`
                            );
                        } else {
                            setStep(4);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
    return (
        <div className="roomcode-container">
            <p>{title}</p>
            <input
                type="text"
                placeholder="room code"
                onKeyPress={clickHandler}
                onInput={(e) => setRoomCode(e.target.value)}
            />
            <button
                className="button-goback"
                onClick={() => {
                    setStep(step - 1);
                }}
            ></button>
        </div>
    );
}

export default RoomCode;
