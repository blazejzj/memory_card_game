import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    function renderTitleAndGithub() {
        return (
            <div className="credit">
                <a
                    href="https://github.com/blazejzj"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        icon={faGithub}
                        size="1x"
                        className="githubIcon"
                    />
                    blazejzj
                </a>
            </div>
        );
    }

    return <div>{renderTitleAndGithub()}</div>;
}
