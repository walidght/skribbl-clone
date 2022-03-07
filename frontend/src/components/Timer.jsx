import { useEffect } from 'react';

const Timer = ({ timer, setTimer, isDrawing, setIsDrawing, room, socket }) => {
    useEffect(() => {
        setTimeout(() => {
            if (isDrawing) {
                if (timer > 0) {
                    setTimer(timer - 1);
                    socket.emit('timer', timer, room);
                } else if (timer === 0) {
                    socket.emit('timer', timer, room);
                    setIsDrawing(false);
                    socket.emit('new drawer', room);
                }
            }
        }, 1000);
    });

    socket.on('timer', (timer) => {
        if (!isDrawing) {
            setTimer(timer);
        }
    });

    return <p className="timer">timer: {timer} s</p>;
};

export default Timer;
