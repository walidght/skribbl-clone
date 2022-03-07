import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Game from './components/Game';
import io from 'socket.io-client';

function App() {
    const socket = io('http://localhost:3000/', { transports: ['websocket'] });

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route
                        exact
                        path="/game"
                        element={<Game socket={socket} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
