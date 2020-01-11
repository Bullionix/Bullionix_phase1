import React from "react";
import NextStyledButton from "../NextStyledButton";
import { themeGray, darkThemeColor } from "../../css/theme";

interface HoverButtonProps {
  titleStyles?: string
  buttonStyles?: string
  title: string
  icon?: string | JSX.Element
  onClick: () => void
}

const HoverButton = (props: HoverButtonProps) => {

  const { title, onClick, icon, buttonStyles, titleStyles } = props

  return (
    <NextStyledButton
      title={title}
      onClick={onClick}
      additionalStyles={buttonStyles}
      titleStyles={titleStyles}
      defaultStyle={`
              
                width: 120px;
                height:50px;
                font-size: 10pt;
                box-shadow: none;
                border: solid 1px ${themeGray};
              
                
                /*  box-shadow: 0 2px 4px 0 rgba(136,144,195,0.6);*/
                 
                
                  font-weight:700;
                /*  box-shadow:0 2px 4px 0 rgba(136,144,195,0.2), 0 5px 15px 0 rgba(37,44,97,0.15);*/
                  transition:color .2s ease,background-color .2s ease,border-color .2s ease,box-shadow .2s ease,transform .2s ease;
                  text-transform:none;
                  margin:20px;

                
           `}
      hoverStyle={`
          
                box-shadow:0 2px 4px 0 rgba(136,144,195,0.2), 0 5px 15px 0 rgba(37,44,97,0.3);
             
            
           `}
      icon={icon}
      iconPosition="right"
      iconStyle={`
             margin-left:7px;
             transition: opacity .2s ease,transform .2s ease, margin-left .2s ease;
           `}
      iconHoverStyle={`
            
             transform:translateX(3px);
           `}

    />
  );
}
export default HoverButton;