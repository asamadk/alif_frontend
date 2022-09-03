import React, { useState } from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import Collapse from '@mui/material/Collapse';
import * as URL from '../Helper/endpoints'
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import "../styles/Contact.css";
import axios from "axios";

function Contact(){

    const[name,setName] = useState('');
    const [loading,setLoading] = React.useState(false);
    const [email,setEmail] = useState('');
    const [subject,setSubject] = useState('');
    const [body, setBody] = useState('');
    const [show,setShow] = useState(false);
    const [mssg,setMssg] = useState('');

    const handleSubmitButton = () => {
        const payLoadData = {
            name : name,
            email : email,
            subject : subject,
            body : body
        }
        setLoading(true);
        axios.post(URL.CONTACT_US,payLoadData).then(() => {
            setLoading(false)
            cleanUIInput();
            window.scrollTo(0,0)
            setShow(true);
            setMssg('Email sent succesfully')
            setTimeout(() => {
                setShow(false);
            },5000);
        })
        console.log(payLoadData);
    }

    const cleanUIInput = () => {
        setName('');
        setEmail('');
        setSubject('');
        setBody('');
    }

    const handleOpenInstagram = () => {
        window.open('https://www.instagram.com/houseofalif.official/?hl=en','_blank')
    }

    return(
        <>
        {loading && (
          <CircularProgress
            size={34}
            sx={{
              color: '#e60023',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
            <Collapse in={show}>
                <Alert severity="success">{mssg}</Alert>
            </Collapse>
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
                        <li style={{cursor : 'pointer'}} >
                            <InstagramIcon onClick={handleOpenInstagram}/>
                        </li>
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
                <TextField value={name} onChange={(e) => {setName(e.target.value)}} className="input_box"  id="outlined-basic"  variant="outlined" />
                <InputLabel id="demo-simple-select-label">Email</InputLabel>
                <TextField value={email} onChange={(e) => {setEmail(e.target.value)}} className="input_box"  id="outlined-basic"  variant="outlined" />
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <TextField value={subject} onChange={(e) => {setSubject(e.target.value)}} className="input_box" id="outlined-basic"  variant="outlined" />
                <InputLabel id="demo-simple-select-label">Body</InputLabel>
                <TextField value={body} onChange={(e) => {setBody(e.target.value)}} className="input_box" id="outlined-basic"  variant="outlined" />
                <LoadingButton onClick={handleSubmitButton} className="contact_button" variant="outlined">Send</LoadingButton>
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact
