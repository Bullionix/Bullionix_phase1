import NextStyledDropdown from "../NextStyledDropdown";
import { themeGold } from "../../css/theme";


export function hamburgerDropdown(parentTitle, linkObject, href?) {

    return (
        <NextStyledDropdown
            href={href}
            openSide="right"
            parentButtonContent={parentTitle}
            items={linkObject}
            parentButtonWidth={45}
            parentButtonHeight={40}
            parentButtonStyle={`
                    color: black;
                    display:flex;
                    justify-content:center;
                    font-size: 11pt;
                    width: 60px;
                    height: 40px;
                    padding: 0;
                  
                    text-align: center;
                    background: none;
                    border: none;
                    cursor:${linkObject.length > 0 ? "auto" : "pointer"};
                   
                    white-space:nowrap;
                   
                `}
            parentButtonHoverStyle={`
                    color: white;
                    background: ${themeGold};
                `}
            childButtonHeight={44}
            childButtonWidth={150}

            childButtonStyle={`
                    background: white;
                    display:flex;
                    align-items:center;
                    color:black;
                    width: 150px;
                    height: 44px;
                    margin: 0;
                    padding: 0;
                    padding-left: 15px;
                    text-align: left;
                    font-size: 10pt;
                    border-bottom:solid 1px whitesmoke;
                    cursor:pointer;
                `}
            childHoverButtonStyle={`
                    background: red;
                `}



        />
    )


}