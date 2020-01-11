import React from "react";
import DisplayCaseModuleCoin from "../Shop/ShopCaseModuleCoin";

interface ShopCaseModelProps {

}

const ShopCaseModel = (props: ShopCaseModelProps) => {
    return (
        <div className="displayCaseSeriesContainer">

            <style jsx>
                {`
                
                    .displayCaseSeriesContainer {
                        width:calc(100%);
                        display: flex;
                        flex-wrap: wrap;
                      
                        margin-top:50px;
                       
                        margin-bottom:30px;
                      
                    }

                    @media only screen and (max-width: 600px) {
                        .displayCaseSeriesContainer {
                            flex-direction:column;
                        }
                    }

                `}
            </style>

            <div className="displayCaseTitleContainer">
                <div className="displayCaseTitle">
                    Great-value collectibles
                </div>

                <div className="displayCaseDescription">
                    Check out the the most recent releases. Be among the earliest to mint Bullionix collectibles from these new mould designs.
                </div>

                <div className="displayCaseSeriesContainer">


                    <DisplayCaseModuleCoin />
                    <DisplayCaseModuleCoin />

                    <DisplayCaseModuleCoin />
                    <DisplayCaseModuleCoin />

                </div>

                <div className="displayCaseBrowseButtonContainer">
                    <button style={{ width: '100%', height: 40 }}>Browse All</button>
                </div>
            </div>
        </div>
    );
}
export default ShopCaseModel;