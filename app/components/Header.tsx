import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
    transparent: boolean
}

const Header = (props: HeaderProps) => {

    const { transparent } = props

    return (
        <header className={`${transparent ? "transparent" : ""} sticky-header`}>


            <div className="container">
                <div className="sixteen columns" style={{ display: 'flex', alignItems: 'center', height: 90 }}>

                    {/*Logo{*/}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                        <a style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} href="/">
                            <div style={{ fontSize: '8px', marginRight: 10 }}><FontAwesomeIcon icon={faSearchDollar} size="3x" color={transparent ? "white" : "black"} /></div>
                            <h3 style={{ color: transparent ? "white" : "black" }}> NextJS Amazon</h3>
                        </a>
                    </div>

                    <a style={{ fontSize: '12px', paddingLeft: 15, paddingRight: 15, paddingTop: 7, paddingBottom: 7 }} href="https://makergrants.typeform.com/to/mXJjfB" target="_blank" className="button">Add a Grant</a>

                    {/*Menu{*/}


                    {/*Navigation{*/}
                    {/*} <div id="mobile-navigation">
                        <a href="#menu" className="menu-trigger"><i className="fa fa-reorder"></i></a>
                    </div>

    {*/}

                </div>
            </div>
        </header>
    );
}
export default Header;