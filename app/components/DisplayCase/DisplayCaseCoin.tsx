import React from "react";
import Link from "next/link";

interface DisplayCaseCoinProps {

}

const DisplayCaseCoin = (props: DisplayCaseCoinProps) => {
    return (
        <a href="/coin/bull">

            <button className="coinContainer">

                <style jsx>
                    {`
                
                .coinContainer {
                    padding:15px;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    cursor:pointer;
                }

                .coinWeight {
                    margin-top:10px;
                }

                `}
                </style>

                <img src="/bullionix.png" height={200} width={200} />

                <div className="coinWeight">
                    1 of 20 | 5 grams
            </div>

            </button>
        </a>
    );
}
export default DisplayCaseCoin;