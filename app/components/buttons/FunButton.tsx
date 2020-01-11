import React, { useState } from "react";
import NextStyledButton from "../NextStyledButton";

interface FunButtonProps {
    title: string
    icon: JSX.Element | string
}

const FunButton = (props: FunButtonProps) => {

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
            height:60px;
            `
            }
            HW_1024={`
        height:60px;
        width:200px;
        `}
            additionalStyles={
                `
            border-radius:30px;
          
            border-bottom:solid 3px #3d3d3d;
            border-right:solid 3px #3d3d3d;
           
         
            background:magenta;
            `
            }
            submitting={submitting}
            submittingTitle="Loading ... "

        />

    );
}
export default FunButton;