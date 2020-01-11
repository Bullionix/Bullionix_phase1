import React from "react";
import Link from "next/link";

interface ShopCaseModuleCoinProps {

}

const ShopCaseModuleCoin = (props: ShopCaseModuleCoinProps) => {
    return (

        <Link href="/coin/[coinID]" as="/coin/bull">

            <button className="coin">

                <style jsx>
                    {`

                    .coin {
                        display:flex;
                        flex-direction:column;
                        align-items:center;
                        text-align:left;
                    
                       
                        width:auto;
                        padding:15px;
                        cursor:pointer;
                    }

                `}
                </style>


                <div className="coinContainer">

                    <img src="/bullionix.png" width={200} height={200} />

                    <div className="coinTitle">
                        Feeling Bullish
            </div>

                    <div className="coinDescription">
                        2020 - Founders Series
            </div>

                    <div className="coinCreator">
                        By Bullionix
            </div>

                    <div className="coinSeries">
                        1 of 50 | 3 grams
            </div>

                    <div className="coinBuyButton">
                        <button>
                            0.15
                </button>
                    </div>

                </div>

            </button>
        </Link>
    );
}
export default ShopCaseModuleCoin;