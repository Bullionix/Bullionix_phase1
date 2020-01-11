import React, { useState } from "react";
import NextStyledButton from "../components/NextStyledButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd } from "@fortawesome/free-solid-svg-icons";
import NextStyledInput from "../components/NextStyledInput";

interface ComponentsProps {

}

const Components = (props: ComponentsProps) => {

    const [submitting, setSubmitting] = useState(true)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'green', height: 400 }}>
            <div style={{ height: 110 }} /*We need this to prevent the button from changing height when it's clicked because of border height*/>
                <NextStyledButton
                    title="Welcome to Bullionix"
                    onClick={() => undefined}
                    titleStyles={`
                    font-size:24px;
                    color:yellow;
                `}
                    icon={<FontAwesomeIcon icon={faAd} size="2x" />}
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
                    submitting={true}
                    submittingTitle="Loading ... "

                />
            </div>


            <p></p>

            <div style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                <NextStyledInput
                    placeHolderText="This is a single line input"
                    value="Hello"
                    onChangeText={() => { }}
                    buttonTitle="Save"
                    inputLabel="Crazy"
                    errorText="Fucked up"
                    inputFieldStyles={`
                        height:100px;
                        width:80%;
                    `}
                    buttonStyles={`
                      width:20%;
                      min-width:80px;
                      max-width:80px;
                      height:auto;
                      color:white;
                  `}

                />



            </div>



        </div>
    );
}
export default Components;