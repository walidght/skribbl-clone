import './GameSetup.css';

function GameSetup({
    name,
    setStep,
    step,
    setNewRoom,
    roundsCount,
    setRoundsCount,
}) {
    return (
        <div className="gamesetup-content-container">
            <div className="avatars-container">
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
            </div>
            <p className="name">{name}</p>
            <div className="buttons-container">
                <button
                    onClick={() => {
                        setNewRoom(false);
                        setStep(3);
                    }}
                >
                    room code
                </button>
                <button
                    onClick={() => {
                        setNewRoom(true);
                        setStep(3);
                    }}
                >
                    create room
                </button>
            </div>
            <div className="footer-container">
                <button
                    className="button-goback"
                    onClick={() => {
                        setStep(step - 1);
                    }}
                ></button>
                <div className="round-container">
                    <div className="div-button">
                        {roundsCount === 1 || (
                            <button
                                onClick={() => {
                                    setRoundsCount(roundsCount - 1);
                                }}
                            >
                                -
                            </button>
                        )}
                    </div>

                    <div className="round-text">
                        <p className="label">rounds</p>
                        <p className="value">{roundsCount}</p>
                    </div>
                    <div className="div-button">
                        {roundsCount === 20 || (
                            <button
                                onClick={() => {
                                    setRoundsCount(roundsCount + 1);
                                }}
                            >
                                +
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameSetup;
