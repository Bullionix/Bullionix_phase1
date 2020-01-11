import React from "react";
import { useStateValue } from "../State/globalState";
import { authUserPayload, handleLogout } from "../aws-helpers";
import NextStyledButton from "../components/NextStyledButton";
import { themeColor } from "../css/theme";
import Router from 'next/router'
import DisplayCaseModel from "../components/Shop/ShopCaseModule";
import Footer from "../components/NextStyledFooter";
import PageTitle from "../components/PageTitle";

interface SettingsPageProps {

}

const ShopPage = (props: SettingsPageProps) => {

    const [{ authUser, authenticating }, dispatch] = useStateValue()



    return (
        <div>

            <PageTitle
                title="SHOP"
                subtitle="Bullionix"
            />


            <div className="container">

                <style jsx>
                    {`

                .spotlightContainer {
                    flex:1;
                    display:flex;
                  
                }
                
                .spotlightModuleContainer {
                    display:flex;
                    flex:0.3333;
                    flex-direction:column;
                    background:whitesmoke;
                }

                @media only screen and (max-width:600px) {
                    .spotlightContainer {
                        flex-direction:column;
                    }
                }

                `}
                </style>

                <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 20, }}>



                    <div className="spotlightContainer">

                        <div className="spotlightModuleContainer">
                            <div className="spotlightTextTitle">
                                Spotlight
            </div>
                            <div className="spotlightTextDescription">
                                Dig deeper into the latest highlighted mould
            </div>
                        </div>

                        <div className="spotlightModuleContainer">
                            <div className="spotlightImage">
                                <img src="/bullionix.png" width={200} height={200} />
                            </div>
                        </div>

                        <div className="spotlightModuleContainer" style={{ flexDirection: 'column' }}>
                            <div className="spotlightImageTextTitle">
                                Vault One
                            </div>

                            <div className="spotlightImageTextDescription">
                                2020 - DigixDAO Series
                            </div>

                            <div className="spotlightImageTextAuthor">
                                By Full_Fridge89
                            </div>

                            <div className="spotlightImageTextQuantity">
                                1 of 47 | 1 gram
                            </div>

                            <div className="spotlightImageTextDescription">
                                <p>
                                    Feeling Bullish is the first Bullionix collectible ever minted.
                                </p>


                                <p>This coin is weighted at 3 grams of gold and commemorates the launch of Bullionix.io. The mould from which it came is....
</p>
                            </div>
                        </div>

                    </div>


                    <div className="displayCaseContainer">
                        <DisplayCaseModel />
                    </div>

                </div>





            </div>


            <Footer />

        </div>
    );
}
export default ShopPage;