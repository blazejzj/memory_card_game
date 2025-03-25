import React from "react";

export default function PointSystem(props) {
    return (
        <div className="pointsystem-container">
            <p>
                {props.points} / {props.requiredPoints}
            </p>
        </div>
    );
}
