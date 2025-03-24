import "./styles/_main.scss";
import bgImage from "./assets/backgroundMain.jpg";
import React, { useState } from "react";
import Header from "./components/Header";
import DifficultySelector from "./components/DifficultySelector";
import PointSystem from "./components/PointSystem";
import InitializeGame from "./components/InitializeGame";

export default function App() {
    const [difficulty, setDifficulty] = useState("");
    const [gameActive, setGameActive] = useState(false);
    const [points, setPoints] = useState(0);

    const difficultyLevels = {
        easy: 5,
        medium: 10,
        hard: 20,
    };

    return (
        <div
            className="app"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <Header />
            {!gameActive ? (
                <DifficultySelector
                    setDifficulty={setDifficulty}
                    setGameActive={setGameActive}
                />
            ) : (
                <div>
                    <PointSystem
                        points={points}
                        requiredPoints={difficultyLevels[difficulty]}
                    />
                    <InitializeGame
                        difficulty={difficultyLevels[difficulty]}
                        points={points}
                        setPoints={setPoints}
                        setGameActive={setGameActive}
                    />
                </div>
            )}
        </div>
    );
}
