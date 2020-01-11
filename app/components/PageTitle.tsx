import React from "react";
import { themeGold } from "../css/theme";

interface PageTitleProps {
    title: string
    subtitle?: string
    styles?: string
}

const PageTitle = (props: PageTitleProps) => {

    const { title, subtitle, styles } = props
    return (
        <div className="title">

            <style jsx>
                {`
                    .title {
                        text-align:center;
                        height:100px;
                        margin-bottom:15px;
                        display:flex;
                        justify-content:center;
                        flex-direction:column;
                        background:${themeGold};
                        ${styles}
                    }
                `}
            </style>

            <div>
                {title}
            </div>


            {subtitle &&
                <div>{subtitle}
                </div>}
        </div>
    );
}
export default PageTitle;