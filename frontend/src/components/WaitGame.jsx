import './WaitGame.css';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';

const WaitGame = ({ name, code }) => {
    const navigate = useNavigate();
    setInterval(() => {
        console.log('fetching');
        axios.get(`http://localhost:3000/api/game/${code}`).then((response) => {
            if (response.data.data.started) {
                navigate(
                    `/game?name=${encodeURIComponent(
                        name
                    )}&room=${encodeURIComponent(code)}`
                );
            }
        });
    }, 1000);
    return (
        <div className="waiting-container">
            <p>waiting for the game to start</p>
            <ReactLoading
                type={'bubbles'}
                color={'#000'}
                height={150}
                width={100}
            />
        </div>
    );
};

export default WaitGame;
