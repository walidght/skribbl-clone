import { useState } from 'react';
import './Chat.css';

const Chat = ({
    setMessages,
    messages,
    room,
    socket,
    name,
    isDrawing,
    setIsDrawing,
}) => {
    const [newMessage, setNewMessage] = useState([]);

    function handleMessageOnChange(e) {
        if (!isDrawing) {
            setNewMessage(e.target.value);
        }
    }

    socket.on('message', (message, sender) => {
        console.log(message);
        const arr = messages.concat({ message, sender });
        setMessages(arr);
    });

    function handleMessageSubmit(e) {
        if (!isDrawing && newMessage != '') {
            socket.emit('message', newMessage, name, room);
            const arr = messages.concat({
                message: newMessage,
                sender: `${name} (you)`,
            });
            setMessages(arr);
            setNewMessage('');
        }
    }
    let i = 0;
    return (
        <div className="messages-container">
            <div className="messages">
                {messages
                    .map((element) => (
                        <div className="message" key={i++}>
                            <p className="name"> {`${element.sender}`}</p>
                            <p className="content"> {`${element.message}`}</p>
                        </div>
                    ))
                    .reverse()}
            </div>

            <div className="input-container">
                <button onClick={handleMessageSubmit}></button>
                <input
                    type="text"
                    onChange={handleMessageOnChange}
                    value={newMessage}
                    placeholder="type your guess here..."
                />
            </div>
        </div>
    );
};

export default Chat;
