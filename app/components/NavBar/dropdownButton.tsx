import NextStyledDropdown from "../NextStyledDropdown";
import { themeGold } from "../../css/theme";


export function dropdownButton(parentTitle, linkObject, href?) {

    return (
        <NextStyledDropdown
            href={href}
            openSide="left"
            parentButtonContent={parentTitle}
            items={linkObject}
            parentButtonWidth={120}
            parentButtonHeight={40}
            parentButtonStyle={`
                    color: #FEFEFE;
                    font-size: 11pt;
                    width: auto;
                    height: 40px;
                    
                    padding: 0;
                    padding-right:15px;
                    padding-left:15px;
                    text-align: center;
                    background: none;
                    border: none;
                    cursor:${linkObject.length > 0 ? "auto" : "pointer"};
                   
                    white-space:nowrap;
                   
                `}
            parentButtonHoverStyle={`
                    color: black;
                    background: ${themeGold};
                `}
            childButtonHeight={44}
            childButtonWidth={150}

            childButtonStyle={`
                    background: white;
                    color:black;
                    display:flex;
                    align-items:center;
                    flex:1;
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