import React from "react";
import Footer from "../../components/NextStyledFooter";


interface CoinDrillDownProps {

}

const CoinDrillDown = (props: CoinDrillDownProps) => {

    if (typeof window !== 'undefined') {



        var ThreeJSComponent = require('../../components/ThreeJS/ThreeJSCanvas').default

        return (


            <div>

                <div className="container">

                    <style jsx>
                        {`
                
                    .headerContainer {
                        display:flex;
                        flex-direction:column;
                        align-items:center;
                        margin-top:20px;
                    }

                    .collectionHeader {
                        display:flex;
                        flex-direction:row;
                    }

                    .completeCollection {
                        display:flex;
                        flex:1;
                        margin-bottom:15px;
                    }

                    .collectionContainer {
                        display:flex;
                        flex-wrap:wrap;
                      
                        align-items:center;
                        justify-content:center;
                    }

                    .coinImageContainer {
                        display:flex;
                        flex-direction:row;
                     
                    
                    }

                    .coinButtons {
                        display:flex;
                        flex:1;
                        flex-direction:row;
                        margin-bottom:50px;
                    }

                    .coinButtonsContainer {
                      
                        margin-left:20px;
                    }

                    .coinButtonContainer {
                        display:flex;
                        flex:1;
                        justify-content:center;
                    }

                    .coinButton {
                        width:70px;
                        height:70px;
                        border-radius:50px;
                    }

                    @media only screen and (max-width:800px) {
                        .coinImageContainer {
                            flex-direction:column;
                        }
                    }

                `}
                    </style>

                    <div className="sixteen columns" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>


                        <div className="headerContainer">

                            <div className="ownerTitle">
                                gldnXross's
                </div>

                            <div className="displayCase">
                                Display Case
                </div>

                        </div>

                        <div className="coinInfoContainer">

                            <div className="coinTitle">
                                Feeling Bullish
                    </div>

                            <div className="coinSeries">
                                2020 - Founders Series
                    </div>

                            <div className="coinMaker">
                                By Bullionix
                    </div>

                            <div className="coinWeight">
                                1 of 50 | 3 grams
                    </div>


                            <div className="coinImageContainer">
                                <div className="coinImage">
                                    <ThreeJSComponent />
                                </div>



                                <div className="coinButtonsContainer">
                                    <div className="coinDescriptionContainer">
                                        <p>
                                            Feeling Bullish is the first Bullionix collectible ever minted.
                            </p>


                                        <p>
                                            This coin is weighted at 3 grams of gold and commemorates the launch of Bullionix.io. The mould from which it came supports only 50 of these coins ever being minted.
                               </p>

                                        <p>
                                            Side-A showcases the dapp’s logo and weight while Side-B features an
                                            energetic bull looking upward. The words “Non-Fungible, Forever Valuable” are inscribed. This phrase. . .
                            </p>


                                    </div>


                                    <div className="coinButtons">
                                        <div className="coinButtonContainer">
                                            <button className="coinButton">
                                                Manage</button>

                                        </div>

                                        <div className="coinButtonContainer">
                                            <button className="coinButton">
                                                Source</button>
                                        </div>

                                        <div className="coinButtonContainer">
                                            <button className="coinButton">
                                                Sell
                                        </button>
                                        </div>

                                        <div className="coinButtonContainer">
                                            <button className="coinButton">
                                                Melt</button>
                                        </div>
                                    </div>

                                </div>


                            </div>


                        </div>




                    </div>

                </div >



                <Footer />

            </div >
        );
    }
    else {
        return <div></div>
    }
}


export default CoinDrillDown;