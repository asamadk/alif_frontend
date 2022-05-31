import React from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import "../styles/Contact.css";

function Contact(){
    return(
        <div className="Contact">
            <div className="Contact__Mail">
                <h2>Contact Us</h2>
                <p>alifclothing@alif.com</p>
                <p>7007475550</p>
                <p>@alifclothing</p>
            </div>
            <div className="Contact__Mail">
                <h2>Mail Us</h2>
                <input type="text" placeholder="Name"></input>
                <input type="text" placeholder="Email"></input>
                <input type="text" placeholder="Subject"></input>
                <div className="Contact__Mail_Body">
                <input type="text" placeholder="Body"></input>

                </div>
                {/* <button>Send</button> */}
                <LoadingButton variant="outlined">Send</LoadingButton>
            </div>
            
        </div>
    )
}

export default Contact