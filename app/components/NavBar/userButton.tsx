
import React from 'react'
import { useStateValue } from '../../State/globalState'
import { LinkObject } from '../../types'
import NextStyledDropdown from '../NextStyledDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'
import { themeColor, themeGray, lightThemeColor, themeCyan } from '../../css/theme'
import HoverButton from '../buttons/HoverButton'
import Router from 'next/router'
import NextStyledButton from '../NextStyledButton'
import Link from 'next/link'


function userProfile() {

    return (

        <div style={{ border: 'solid 1px rgba(0,0,0,0.1)' }} className="userProfilePicture">
            <FontAwesomeIcon icon={faDragon} size="1x" />
        </div>
    )

}


const userButton = () => {

    const [{ authState, authUser, authenticating }, dispatch] = useStateValue()

    if (authenticating) {
        return <div style={{ width: 120, height: 40, margin: 20 }}></div>
    }


    else if (!authenticating && authUser) {

        var items: LinkObject[] = [

            {
                name: "Settings",
                href: "/settings",

            },

        ]



        if (authState === "loaded" && authUser && authUser.email === "dmathieuva@gmail.com") {
            items.push(

                {
                    name: "Admin",
                    href: "/admin",


                },
            )
        }



        const userPicDimensions = 35
        const childButtonHeight = 44
        const childButtonWidth = 120


        return (

            <Link href="/settings">
                <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: 15
                }}>
                    {userProfile()}
                </button>
            </Link>


            /*} <NextStyledDropdown
                 openSide="right"
                 parentButtonContent={userProfile()}
                 items={items}
                 parentButtonWidth={userPicDimensions}
                 parentButtonHeight={userPicDimensions}
                 parentButtonStyle={`
                         color: ${themeColor};
                         width: ${userPicDimensions}px;
                         height: ${userPicDimensions}px;
                         padding: 0;
                         background:none;
                         border:none;
                         text-align: center;
 
                     `}
                 parentButtonHoverStyle={`
                       
                         background: ${themeGray};
                     `}
                 childButtonHeight={childButtonHeight}
                 childButtonWidth={childButtonWidth}
 
                 childButtonStyle={`
                         background: white;
                         display:flex;
 
                         border:none;
                         color: black;
                         width: ${childButtonWidth}px;
                         height: ${childButtonHeight}px;
                         margin: 0;
                         padding: 0;
                         padding-right: 15px;
                         text-align: right;
                         font-size: 12pt;
                         cursor:pointer;
                     `}
                 childHoverButtonStyle={`
                         background: ${lightThemeColor};
                     `}
 
 
             />
             */


        )
    }


    else if (!authenticating && !authUser) {
        return (

            <HoverButton
                buttonStyles={`
                background-color:${themeCyan};
                border:none !important;
                border-radius:5px;
                height:37px !important; 
            `}
                titleStyles={`
                    color:white;
                `}
                title="Get started"
                onClick={() => {
                    //  console.log('hello')
                    Router.push("/auth")
                }
                }

            />


        )
    }

    else {
        return (
            <HoverButton
                titleStyles={`
                    color:white;
                `}
                buttonStyles={`
                background-color:${themeCyan};
                
                `}
                title="Get started"
                onClick={() => {
                    //  console.log('hello')
                    Router.push("/auth")
                }}
            />
        )

    }




}


export default userButton