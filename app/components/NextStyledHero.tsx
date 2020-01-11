import React from "react";

interface NextStyledHeroProps {

}

const NextStyledHero = (props: NextStyledHeroProps) => {
    return (

        <div id="banner" className="with-transparent-header parallax background" data-img-width="2000" data-img-height="1330" data-diff="300">
            <div className="container">
                <div className="sixteen columns">

                    <div className="search-container">

                        <h2>Equity-free Grants for Makers and Startups</h2>

                        <h3>Receive email alerts when new grants are added</h3>



                        <input
                            type="text"
                            className="ico-01"
                            placeholder="Enter your email address"
                            value={"email"}
                            onChange={(text) => {
                                //  setEmailStatus("")
                                //  setEmailErrorText("")
                                // setEmail(text.target.value)
                            }}
                        />

                        <button
                            //disabled={subscribing}
                            style={{ fontSize: '16px' }} onClick={() => {

                                /* if (validateEmail(email)) {
                                     addSubscriber()
                                 }
                                 else {
                                     window.alert("Please input a valid email!")
                                 }
                                 */


                            }}> Get Updates
                        </button>

                        {/*emailErrorText !== "" &&
                            <div style={{
                                margin: 10,
                                color: emailStatus === "success" ? themeColor : "red",
                                fontWeight: 'bold',
                            }}>{emailErrorText}</div>
                        
                        */}







                    </div>

                </div>
            </div>
        </div>



    );
}
export default NextStyledHero;