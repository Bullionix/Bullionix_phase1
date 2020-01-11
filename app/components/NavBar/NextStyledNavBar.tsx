import React from 'react'
import { lightThemeColor, themeColor, themeGold } from '../../css/theme'
import Link from 'next/link'

import { rightLinks } from './links'
import userButton from './userButton'
import { hamburgerDropdown } from './hamburgerDropdown'
import { hamburgerLinks } from './hamburgerLinks'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
    logo: JSX.Element
    siteTitle: string
}


const NextStyledNavBar = (props: Props) => {



    const brand = (
        <div className="brandContainer">
            <Link href="/">
                <a className="brand">
                    <div className="logoImage">

                        <img src="/bullionix.png" width={40} height={40} />


                    </div>
                    <div className="siteTitle">{props.siteTitle}</div>
                </a>
            </Link>


        </div>

    )

    function _renderLinks(side: "left" | "right") {

        let linkArray = side === "left" ? [] : rightLinks
        if (linkArray !== undefined && linkArray.length > 0) {

            return (
                linkArray.map(linkObject => {
                    if (linkObject.component === undefined) {
                        return (
                            <div className="linkButton">
                                <Link key={linkObject.href} href={linkObject.href}>
                                    <a>{linkObject.name}</a>
                                </Link>
                            </div>


                        )
                    }
                    else {
                        return linkObject.component
                    }

                })
            )


        }

        else {
            return null
        }
    }




    return (




        <div className="navBar" style={{ boxShadow: `0 2px 5px rgba(0,0,0,0.1) ` }}>

            <style global jsx>
                {`

                .navPlaceholder {
                   display: flex;
                   height:65px;
                    flex: 0.75;
                    flex-direction: row;
                    justify-content: flex-start;
                    background-color:#393838;
                }



                .navBar {

                    position: sticky;
                    position: -webkit-sticky;
                    position: -moz-sticky;
                    position: -ms-sticky;
                    position: -o-sticky;
                  
                    top:0;
                    display: flex;
                    height:65px;
                   
                    background-color:#393838;
                    flex-direction: row;
                   
                    align-content: center;
                    justify-content: center;
                    justify-items: center;
                    z-index: 999;
                    margin: 0 auto;
                    opacity: 1;
                    flex-direction: column;
                    transition: background-color 0.25s ease;
                   
                
                }


                .brandContainer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                background: none;
                   
                    border-radius: 20px;
                    justify-content:center;

                }
                .brand {
                display: flex;
                align-items: center;
                justify-items: center;
                    border: none;
                    flex-direction: row;
                }

                .brand:hover {
                    text-decoration: none;
                }

                .logoImage {
                    height:36px;
                    width:36px;
                display:flex;
                justify-content:center;
                align-items:center;
                    margin-right: 8px;
                    color: white;
                    background:${themeColor};
                   
                    border-radius:30px;
                   
                }

                .siteTitle {
                    display:block;
                    font-size: 18pt;
                font-weight: 700;
                margin-right:15px;
                margin-left:3px;
                    color: white;
                }

                .userProfilePicture {
                  
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 35px;
                    min-width: 35px;
                    max-width: 35px;
                    max-height: 35px;
                    border-radius: 17.5px;
                    background: white;
                }


                .linkButton {
                   
                    height: 40px;
                    width:40px;
                    margin-left: 10px;
                    margin-right:10px;
                    border-radius:20px;
                font-size: 10pt;
                font-weight: bold;
                color: ${themeColor};
                border: none;
               
                display: flex;
                align-items: center;
                justify-content:center;
                transition: background-color 0.3s ease, transform .3s ease;
                background:${lightThemeColor};
                }

                .linkButton:hover {

                    background:${themeColor};
                    text-decoration: none;
                    color: white !important;
                }

                .navMenu {
                    display: flex;
                    flex: 4.25;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: center;
                }

                .navMenuHamburger {
                    display:none;
                }

                .navMenuHamburgerContainer {
                    display:none;
                  
                }

                
                @media only screen and (max-width: 900px) {
                    .siteTitle {
                        display:none;
                    }

                    .logoImage {
                        margin-right:15px;
                    }

                    .navPlaceholder {
                        display: flex;
                         flex: 0.3;
                         flex-direction: row;
                         justify-content: flex-start;
                     }

                   
                }

                @media only screen and (max-width:800px) {
                    .navMenu {
                        display: none;
                      
                    }

                    .navMenuHamburgerContainer {
                        display:flex;
                        flex-direction:row;
                        align-items:center;
                       
                    }

                    .navMenuHamburger {
                        display:flex;
                        background:${themeGold};
                        margin-left:15px;
                      
                      
                        height:50px;
                        width:auto;
                       
                        align-items:center;
                        justify-content:center;
                    }
                }
                
                
                `}
            </style>

            <div style={{ display: 'flex', flex: 1 }}>

                <div className="navPlaceholder"></div>

                {/*Left Side */}
                <div style={{ display: 'flex', flex: 4.25, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>


                    {brand}


                    {/*leftLinks !== undefined &&
                        _renderLinks("left")
                    */}


                </div>




                {/*Right */}
                <div className="navMenu">

                    {rightLinks !== undefined &&
                        _renderLinks("right")
                    }


                    {userButton()}
                </div>

                <div className="navMenuHamburgerContainer">

                    {userButton()}

                    <div className="navMenuHamburger">

                        {hamburgerDropdown(<FontAwesomeIcon icon={faBars} size="lg" />, hamburgerLinks)}

                    </div>



                </div>



                <div className="navPlaceholder"></div>


                {/*searchBar()*/}







            </div>

        </div>


    )

}





export default NextStyledNavBar