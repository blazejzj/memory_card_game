import React from "react";

export default function PointSystem(props) {
    return (
        <div>
            <p>
                {props.points} / {props.requiredPoints}
            </p>
        </div>
    );
}
