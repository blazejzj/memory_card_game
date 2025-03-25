import React, { useEffect, useState } from "react";
import Victory from "./Victory";
import Loss from "./Loss";
import pokemonBackside from "./../assets/pokemonBackside.webp";
import clickSound from "./../assets/clickCard.mp3";

export default function InitializeGame(props) {
    const [pokemons, setPokemons] = useState([]);
    const [clickedPokemons, setClickedPokemons] = useState([]);
    const [gameState, setGameState] = useState("");
    const [usedIds, setUsedIds] = useState([]);

    const api = "https://pokeapi.co/api/v2/pokemon/";

    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play().catch((e) => console.log("Sound blocked...", e));
    };

    async function getPokemon(id) {
        try {
            const response = await fetch(api + id);
            if (!response.ok) {
                throw new Error("Failed fetching pokemons.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error occured.", error.message);
        }
    }

    useEffect(() => {
        const newPokemonsArray = [];
        const localUsedIds = [];

        const fetchPokemons = async () => {
            for (let i = 0; i < props.difficulty; i++) {
                let randomId;
                do {
                    randomId = Math.floor(Math.random() * 500);
                } while (localUsedIds.includes(randomId));

                localUsedIds.push(randomId);

                const pokemon = await getPokemon(randomId);
                newPokemonsArray.push({
                    sprite: pokemon.sprites.front_default,
                    name: pokemon.name,
                    hasBeenClicked: false,
                    isRevealed: false,
                });
            }
            setUsedIds(localUsedIds);
            setPokemons(newPokemonsArray);
            setTimeout(() => {
                setPokemons((prev) =>
                    prev.map((pokemon) => ({ ...pokemon, isRevealed: true }))
                );
            }, 1000);
        };
        fetchPokemons();
    }, [props.difficulty]);

    function renderCards() {
        if (pokemons.length === 0) {
            return <div className="loading-indicator">Loading cards...</div>;
        }

        return (
            <div className="cards-container">
                {pokemons.map((pokemon) => (
                    <button
                        key={pokemon.name}
                        className="pokemon-card"
                        onClick={() => handleCardClick(pokemon.name)}
                    >
                        <div
                            className={`card-inner ${
                                !pokemon.isRevealed ? "flipped" : ""
                            }`}
                        >
                            <div className="card-front">
                                <img src={pokemon.sprite} alt={pokemon.name} />
                                <p>{pokemon.name}</p>
                            </div>
                            <div className="card-back">
                                <img src={pokemonBackside} alt="Backside" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        );
    }

    function shuffleCards() {
        let shuffled = [...pokemons];
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setPokemons(shuffled);
    }

    function handleCardClick(name) {
        playClickSound();

        if (clickedPokemons.includes(name)) {
            setGameState("loss");
            return;
        } else {
            setClickedPokemons([...clickedPokemons, name]);
            props.setPoints(props.points + 1);
            if (props.points + 1 === props.difficulty) {
                setGameState("win");
            }
        }
        setPokemons((prevPokemons) =>
            prevPokemons.map((p) => ({ ...p, isRevealed: false }))
        );

        setTimeout(() => {
            shuffleCards();
            setTimeout(() => {
                setPokemons((prevPokemons) =>
                    prevPokemons.map((p) => ({ ...p, isRevealed: true }))
                );
            }, 800);
        }, 800);
    }

    if (gameState === "") return renderCards();
    if (gameState === "loss") {
        return (
            <Loss
                setGameActive={props.setGameActive}
                setGameState={setGameState}
                setPoints={props.setPoints}
                setClickedPokemons={setClickedPokemons}
            />
        );
    }
    if (gameState === "win") {
        return (
            <Victory
                setGameActive={props.setGameActive}
                setGameState={setGameState}
                setPoints={props.setPoints}
                setClickedPokemons={setClickedPokemons}
            />
        );
    }
}
