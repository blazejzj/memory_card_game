import React, { useEffect, useState } from "react";
import Victory from "./Victory";
import Loss from "./Loss";
import pokemonBackside from "./../assets/pokemonBackside.webp";

export default function InitializeGame(props) {
    const [pokemons, setPokemons] = useState([]);
    const [clickedPokemons, setClickedPokemons] = useState([]);
    const [gameState, setGameState] = useState("");
    const [usedIds, setUsedIds] = useState([]);

    const api = "https://pokeapi.co/api/v2/pokemon/";

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

    function getRandomId() {
        const randomId = Math.floor(Math.random() * 500);
        if (usedIds.includes(randomId)) return getRandomId();

        setUsedIds([...usedIds, randomId]);
        return randomId;
    }

    useEffect(() => {
        const newPokemonsArray = [];
        const fetchPokemons = async () => {
            for (let i = 0; i < props.difficulty; i++) {
                const id = getRandomId();

                const pokemon = await getPokemon(id);

                newPokemonsArray.push({
                    sprite: pokemon.sprites.front_default,
                    name: pokemon.name,
                    hasBeenClicked: false,
                    isRevealed: false,
                });
            }
            setPokemons(newPokemonsArray);
            const timer = setTimeout(() => {
                setPokemons((prev) =>
                    prev.map((pokemon) => ({ ...pokemon, isRevealed: true }))
                );
            }, 1000);

            return () => clearTimeout(timer);
        };
        fetchPokemons();
    }, [props.difficulty]);

    function renderCards() {
        return pokemons.map((pokemon) => (
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
        ));
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
        if (clickedPokemons.includes(name)) {
            setGameState("loss");
        } else {
            setClickedPokemons([...clickedPokemons, name]);
            props.setPoints(props.points + 1);
            if (props.points + 1 === props.difficulty) {
                setGameState("win");
            }
        }
        setPokemons((prev) =>
            prev.map((pokemon) => ({ ...pokemon, isRevealed: false }))
        );
        setTimeout(() => {
            shuffleCards();
            setTimeout(() => {
                setPokemons((prev) =>
                    prev.map((pokemon) => ({ ...pokemon, isRevealed: true }))
                );
            }, 100);
        }, 1000);
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
            />
        );
    }
}
