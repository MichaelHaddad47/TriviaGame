type EndGamePopupProps = {
    points: number;
    onRestart: () => void;
};

const EndGamePopup: React.FC<EndGamePopupProps> = ({ points, onRestart }) => {
    return (
        <div className="popup-container">
            {points < 15 ? (
                <p>Oh no, you ran out of lives!</p>
            ) : (
                <p>Congratulations, you won with {points} points!</p>
            )}
            <button className="popup-btn" onClick={onRestart}>Play Again</button>
        </div>
    );
};

export default EndGamePopup;