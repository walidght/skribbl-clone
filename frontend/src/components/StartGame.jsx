import './StartGame.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StartGame = ({ name, code }) => {
    const navigate = useNavigate();
    function startGame() {
        axios
            .post('http://localhost:3000/api/game/start', { name, code })
            .then((response) => {
                if (response.data.success) {
                    navigate(
                        `/game?name=${encodeURIComponent(
                            name
                        )}&room=${encodeURIComponent(code)}`
                    );
                }
            });
    }
    return (
        <div className="start-game-container">
            <button onClick={startGame}>start game</button>
        </div>
    );
};

export default StartGame;
