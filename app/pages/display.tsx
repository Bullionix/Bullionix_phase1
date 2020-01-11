import React from "react";
import DisplayCaseCoin from "../components/DisplayCase/DisplayCaseCoin";
import Footer from "../components/NextStyledFooter";
import PageTitle from "../components/PageTitle";
import { themeGold } from "../css/theme";

interface DisplayCasePageProps {

}

const DisplayCasePage = (props: DisplayCasePageProps) => {
    return (
        <div>

            <PageTitle
                title="gldnXross's"
                subtitle="Display Case"

            />


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

                `}
                </style>

                <div className="sixteen columns" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>




                    <div className="collectionHeader">
                        <div className="completeCollection">
                            Complete collection
                    </div>

                        <div className="itemsIcon">
                            13 items
                    </div>

                        <div className="weightIcon">
                            58g
                    </div>
                    </div>


                    <div className="collectionContainer">
                        <DisplayCaseCoin />
                        <DisplayCaseCoin />
                        <DisplayCaseCoin />
                        <DisplayCaseCoin />
                        <DisplayCaseCoin />
                        <DisplayCaseCoin />
                        <DisplayCaseCoin />
                        <DisplayCaseCoin />
                    </div>

                </div>

            </div>


            <Footer />

        </div>
    );
}
export default DisplayCasePage;