import "./styles/_main.scss";
import backgroundMusic from "./assets/backgroundMusic.mp3";
import bgImage from "./assets/backgroundMain.jpg";
import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import DifficultySelector from "./components/DifficultySelector";
import PointSystem from "./components/PointSystem";
import InitializeGame from "./components/InitializeGame";

export default function App() {
    const [difficulty, setDifficulty] = useState("");
    const [gameActive, setGameActive] = useState(false);
    const [points, setPoints] = useState(0);

    const audioRef = useRef();

    const startMusic = () => {
        audioRef.current?.play().catch((e) => {
            console.log("Autoplay blocked!", e);
        });
    };

    useEffect(() => {
        window.addEventListener("click", startMusic, { once: true });
        return () => window.removeEventListener("click", startMusic);
    });

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = true;
            audioRef.current.play().catch((e) => {
                console.warn("Autoplay blocked, wait for mousedown", e);
            });
        }
    }, []);

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
            <audio ref={audioRef}>
                <source src={backgroundMusic} type="audio/mpeg" />
            </audio>
            <Header />
            {!gameActive ? (
                <DifficultySelector
                    setDifficulty={setDifficulty}
                    setGameActive={setGameActive}
                />
            ) : (
                <div className="gameactive-container">
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
