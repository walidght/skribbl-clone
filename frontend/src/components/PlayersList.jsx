const PlayersList = ({ players, setPlayers, socket, name, score, room }) => {
    socket.on('update players', (newName, newScore) => {
        if (newName === name) return;
        if (players.some((el) => el.name === newName)) return;
        const arr = players.concat({ name: newName, score: newScore });
        setPlayers(arr);
    });

    socket.on('new player', (newName, newScore) => {
        if (newName === name) return;
        if (players.some((el) => el.name === newName)) return;
        const arr = players.concat({ name: newName, score: newScore });
        setPlayers(arr);
        socket.emit('update players', name, score, room);
    });

    let temp = 0;
    return (
        <div className="players-list-container">
            {players.map((el) => (
                <p key={temp++}>{`${el.name} : ${el.score}`}</p>
            ))}
        </div>
    );
};

export default PlayersList;
