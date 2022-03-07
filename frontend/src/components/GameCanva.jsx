import './GameCanva.css';
import { useRef } from 'react';
import Sketch from 'react-p5';
import { useEffect } from 'react';

const GameCanva = ({
    reset,
    setReset,
    socket,
    room,
    isDrawing,
    setIsDrawing,
}) => {
    const ref = useRef(null);

    let oldX = null;
    let oldY = null;
    let x = null;
    let y = null;

    function mouseDragged(event) {
        oldX = x;
        oldY = y;
        x = event.mouseX;
        y = event.mouseY;
        return false;
    }

    function mouseReleased(event) {
        oldX = null;
        oldY = null;
        x = null;
        y = null;
    }

    const draw = (p5) => {
        if (isDrawing) {
            p5.stroke(p5.color(0, 0, 0));
            if (oldX) {
                p5.line(oldX, oldY, x, y);
                socket.emit('draw', oldX, oldY, x, y, room);
            }
            if (reset) {
                p5.background(255);
                setReset(false);
            }
        }

        socket.on('draw', (oldX, oldY, x, y) => {
            p5.line(oldX, oldY, x, y);
        });

        socket.on('reset', () => {
            p5.background(255);
        });
    };

    return (
        <div ref={ref} className="canva-container">
            <Sketch
                setup={(p5, canvasParentRef) => {
                    // use parent to render the canvas in this ref
                    // (without that p5 will render the canvas outside of your component)
                    p5.createCanvas(
                        ref.current.offsetWidth,
                        ref.current.offsetHeight
                    ).parent(canvasParentRef);
                    p5.background(255);
                }}
                draw={draw}
                mouseDragged={mouseDragged}
                mouseReleased={mouseReleased}
            />
        </div>
    );
};

export default GameCanva;
