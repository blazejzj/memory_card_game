import React from "react";

export default function Victory(props) {
    function handleRetry(e) {
        if (e.currentTarget.value === "yes") {
            props.setGameActive(true);
            props.setGameState("");
            props.setPoints(0);
            props.setClickedPokemons([]);
        } else if (e.currentTarget.value === "no") {
            props.setGameActive(false);
            props.setGameState("");
            props.setPoints(0);
            props.setClickedPokemons([]);
        }
    }
    return (
        <div className="retry-container">
            <h1>Congratulations! You won!</h1>
            <p>Play again? (With the same cards)</p>
            <div className="retry-buttons">
                <button onClick={handleRetry} value="yes">
                    YES
                </button>
                <button onClick={handleRetry} value="no">
                    NO
                </button>
            </div>
        </div>
    );
}
