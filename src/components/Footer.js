import React from "react"
import "../styles/Footer.css"

function Footer(){
    return(
        <div className="Footer">
            <div className="Footer__col1">
                <h3>Reach Us</h3>
                <ul>
                    <li>alif@alifclothing.com</li>
                    <li>timing 11am-4am</li>
                    <li>Social Media</li>
                    <li>click here</li>

                </ul>
            </div>
            <div className="Footer__col2">
                <h3>Information</h3>
                <ul>
                    <li>Refund policy</li>
                    <li>Customer service</li>
                    <li>Special Request</li>
                    <li>Shipping and delivery</li>
                    <li>Work with us</li>
                </ul>
            </div>
            <div className="Footer__col3">
                <h3>Resources</h3>
                <ul>
                    <li>Terms and condition</li>
                    <li>Privacy policy</li>
                    <li>Whats new</li>
                    <li>FAQs</li>
                    <li>About us</li>
                </ul>
            </div>
            {/* <h4>copyright 2021</h4> */}
        </div>
    )
}

export default Footer;