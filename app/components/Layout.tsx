import React from "react";
import '../css/fonts.css'
import '../css/responsive.css'
import { themeColor } from "../css/theme";

interface LayoutProps {
    children: any
}

const Layout = (props: LayoutProps) => {
    return (
        <div>

            <style global jsx>
                {`
                body {
                    margin:0 !important;
                }

                ul {
                    list-style-type:none !important;
                    padding-inline-start:0px !important;
                }

                a {
                    color:${themeColor};
                    text-decoration:none;
                }
                `}
            </style>

            {props.children}
        </div>
    );
}
export default Layout;