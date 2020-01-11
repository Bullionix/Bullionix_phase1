import React, { useState } from "react";
import NextStyledButton from "../NextStyledButton";

interface RetroButtonProps {
    title: string
    icon: JSX.Element | string
}

const RetroButton = (props: RetroButtonProps) => {

    const [submitting, setSubmitting] = useState(false)
    const { title, icon } = props

    return (
        <NextStyledButton
            title={title}
            onClick={() => undefined}
            titleStyles={`
            font-size:24px;
            color:yellow;
        `}
            icon={icon}
            iconPosition="right"
            disabled={true}
            hoverStyle="background:red;"
            activeStyle={`
     
        border:none;
        `}
            defaultStyle={
                `
            width:200px;
            height:100px;
            `
            }
            HW_1024={`
        height:100px;
        width:200px;
        `}
            additionalStyles={
                `
            border-radius:60px;
           
            border-bottom:solid 5px black;
            border-right:solid 5px black;
            background:${submitting ? "magenta" : "green"};
            `
            }
            submitting={submitting}
            submittingTitle="Loading ... "

        />
    );
}
export default RetroButton;