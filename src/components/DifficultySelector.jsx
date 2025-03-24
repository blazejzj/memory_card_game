import React from "react";

export default function DifficultySelector(props) {
    function handleClick(e) {
        props.setDifficulty(e.target.value);
        props.setGameActive(true);
    }

    return (
        <div className="difficulty-selector">
            <h2>Pick the difficulty level</h2>
            <div className="difficulty-buttons">
                <button
                    className="difficulty-button"
                    value={"easy"}
                    onClick={(e) => handleClick(e)}
                >
                    Easy
                </button>
                <button
                    className="difficulty-button"
                    value={"medium"}
                    onClick={(e) => handleClick(e)}
                >
                    Medium
                </button>
                <button
                    className="difficulty-button"
                    value={"hard"}
                    onClick={(e) => handleClick(e)}
                >
                    Hard
                </button>
            </div>
        </div>
    );
}
