import "./styles/_main.scss";
import bgImage from "./assets/backgroundMain.jpg";
import React from "react";
import Header from "./components/Header";

export default function App() {
    return (
        <div
            className="app"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <Header />;
        </div>
    );
}
