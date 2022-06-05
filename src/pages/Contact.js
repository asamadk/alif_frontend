import React from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import "../styles/Contact.css";

function Contact(){
    return(
        <div className="Contact">
            <div className="contact_left">
                <h2>Get in touch</h2>
                <p>we'd Love to hear from you. our team is always here to talk.</p>
                <h3><MailOutlineIcon/> chat with us</h3>
                <p>Our friendly team is here to help</p>
                <p>@alifclothing</p>
                <h3><LocalPhoneOutlinedIcon/> Phone</h3>
                <p>+91 7007475550</p>
                <div className="list_items">
                    <ul>
                        <li><FacebookIcon/></li>
                        <li><InstagramIcon/></li>
                        <li><InstagramIcon/></li>
                        <li><FacebookIcon/></li>
                    </ul>
                </div>
            </div>
            <div className="contact_right">
                <div className="contact_right_header">
                    <h2>Get in touch with us</h2>
                    <p>You can reach us anytime via @alifclothing.in</p>
                </div>
                <div className="Contact__Mail">
                    <h2>Mail Us</h2>
                <InputLabel id="demo-simple-select-label">Name</InputLabel>
                <TextField className="input_box"  id="outlined-basic"  variant="outlined" />
                <InputLabel id="demo-simple-select-label">Email</InputLabel>
                <TextField className="input_box"  id="outlined-basic"  variant="outlined" />
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <TextField className="input_box" id="outlined-basic"  variant="outlined" />
                <InputLabel id="demo-simple-select-label">Body</InputLabel>
                <TextField className="input_box" id="outlined-basic"  variant="outlined" />
                

                    {/* <input type="text" placeholder="Name"></input>
                    <input type="text" placeholder="Email"></input>
                    <input type="text" placeholder="Subject"></input>
                    <div className="Contact__Mail_Body">
                        <input type="text" placeholder="Body"></input>
                    </div> */}
                    <LoadingButton className="contact_button" variant="outlined">Send</LoadingButton>
                </div>
            </div>
            {/* <div className="Contact__Mail">
                <h2>Contact Us</h2>
                <p>alifclothing@alif.com</p>
                <p>7007475550</p>
                <p>@alifclothing</p>
            </div> */}
            {/* <div className="Contact__Mail">
                <h2>Mail Us</h2>
                <input type="text" placeholder="Name"></input>
                <input type="text" placeholder="Email"></input>
                <input type="text" placeholder="Subject"></input>
                <div className="Contact__Mail_Body">
                <input type="text" placeholder="Body"></input>

                </div>
                <LoadingButton variant="outlined">Send</LoadingButton>
            </div> */}
            
        </div>
    )
}

export default Contact



{/* <div className="Contact">
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
//     <LoadingButton variant="outlined">Send</LoadingButton>
// </div>

// </div> */}