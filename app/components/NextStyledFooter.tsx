import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import '../css/footer.css'

interface FooterProps {

}

const Footer = (props: FooterProps) => {
    return (
        <div id="footer">

            <div className="container">

                <div className="seven columns">
                    <h4>About Bullionix</h4>
                    <p>Next Amazon Template provides all the useful bits you need for an SEO-friendly mobile-responsive site. </p>

                    <p>Created by <a target="_blank" href="https://twitter.com/@coderdannn">@coderdannn</a></p>
                    <a href="https://makergrants.typeform.com/to/mXJjfB" target="_blank" className="button">Add a Grant</a>
                </div>

                <div className="three columns">
                    <h4>Company</h4>
                    <ul className="footer-links">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Open Startup</a></li>
                        <li><a href="#">Our Blog</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>


                    </ul>
                </div>



                <div className="three columns">
                    <h4>Press</h4>
                    <ul className="footer-links">
                        <li><a href="#">In the News</a></li>
                        <li><a href="#">Press Releases</a></li>
                        <li><a href="#">Awards</a></li>
                        <li><a href="#">Testimonials</a></li>
                        <li><a href="#">Timeline</a></li>
                    </ul>
                </div>


                <div className="three columns">
                    <h4>Browse</h4>
                    <ul className="footer-links">
                        {/*}  <li><a href="#">View all Grants</a></li>
                        <li><a href="#">View all Categories</a></li>
{*/}
                        <li><a target="_blank" href="https://makergrants.typeform.com/to/mXJjfB">Call to Action</a></li>
                        <li><a target="_blank" href="https://paypal.me/coderdannn">Donate</a></li>

                        {/*}   <li><a href="#">Freelancers in Canada</a></li>
                        <li><a href="#">Freelancers in Australia</a></li>
                        <li><a href="#">Find Jobs</a></li>

{*/}

                    </ul>
                </div>

            </div>


            <div className="container">
                <div className="footer-bottom">
                    <div className="sixteen columns">
                        <h4>Follow Us</h4>
                        <ul className="social-icons">
                            <li style={{ margin: 5 }}><a className="social-icon" href="#"><FontAwesomeIcon icon={faFacebook} size="2x" /></a></li>
                            <li style={{ margin: 5 }}><a className="social-icon" target="_blank" href="https://www.twitter.com/makergrants"><FontAwesomeIcon icon={faTwitter} size="2x" /></a></li>

                        </ul>
                        <div className="copyrights">©  Copyright 2019-2020 by <a href="#">Daniel Mathieu</a>. All Rights Reserved.</div>
                    </div>
                </div>
            </div>

        </div>


    );
}
export default Footer;