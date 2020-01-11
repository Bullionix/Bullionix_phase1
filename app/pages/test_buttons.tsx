import React, { useState } from "react";
import HoverButton from "../components/buttons/HoverButton";
import NextStyledButton from "../components/NextStyledButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import RetroButton from "../components/buttons/RetroButton";
import FunButton from "../components/buttons/FunButton";

interface ButtonProps {

}

const Button = (props: ButtonProps) => {



    return (
        <div style={{ width: '100%', height: 1000, display: 'flex', alignItems: 'center', flexDirection: 'column', paddingTop: 100 }}>

            <div style={{ display: 'none' }}>
                <div>Hover Button</div>

                <HoverButton
                    title="Hey i'm hovering"
                    onClick={() => undefined}
                    icon={<FontAwesomeIcon icon={faArrowRight} />}

                />
            </div>


            <div style={{ display: 'none' }}>
                <div>Cool Button</div>
                <RetroButton
                    title="Retro Button"
                    icon={<FontAwesomeIcon icon={faAd} size="2x" />}
                />
            </div>

            <div>

                <FunButton
                    title="Fun Button"
                    icon={<FontAwesomeIcon icon={faAd} size="2x" />}
                />
            </div>

        </div>
    );
}
export default Button;