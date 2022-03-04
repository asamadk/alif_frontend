import React from 'react'
import { useRef } from 'react';
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as Constants from '../Helper/Constants';
import * as URL from '../Helper/endpoints';
import "../styles/Register.css";


const Register = () => {

    // const navigate = useNavigate();

    const fname = useRef(null);
    const lname = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confrimPassword = useRef(null);
    const address1 = useRef(null);
    const address2 = useRef(null);
    const state = useRef(null);
    const city = useRef(null);
    const mobile = useRef(null);
    const zipcode = useRef(null);
    const country = useRef(null);


    const [user,setuser] = React.useState({});
    const [show,setShow] = React.useState(false);
    const [err,setErr] = React.useState(false);
    const [errDesc,setErrDesc] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(password.current.value != confrimPassword.current.value){
            alert("Password do not match")
            return;
        }

        const data = {
            user_Fname : fname.current.value,
            user_Lname : lname.current?.value,
            email : email.current?.value,
            user_Password : password.current?.value, 
            user_City : city.current?.value,
            user_State : state.current?.value,
            user_zip : zipcode.current?.value,
            user_phone_number : mobile.current?.value,
            user_country : country.current?.value,
            user_address1 : address1.current?.value
    
        }
        setuser(data);

        axios.post(URL.REGISTER,data).then(res => {
            if(res.data.responseCode == Constants.OK_200){
                setShow(true);
                fname.current?.value
            }else{
                setShow(false);
                setErr(true);
                setErrDesc(res.data.errorMap.error);
            }
        }).catch(err => console.log(err));

    }

    return(
        <div className="Register">
            <h1>Register</h1>
            <div className='alertRegister'>
            <Collapse in={show}>
                <Alert severity="success">Successfully registered</Alert>
            </Collapse>
            <Collapse in={err}>
                <Alert severity="error">{errDesc}</Alert>
            </Collapse>
            </div>
            
                <input type="text" placeholder="First Name" ref={fname}></input>
                <input type="text" placeholder="Last Name" ref={lname} ></input>
                <input type="text" placeholder="Email" ref={email} ></input>
                <input type="password" placeholder="password" ref={password} ></input>
                <input type="password" placeholder="Confirm Password" ref={confrimPassword} ></input>
                <input type="text" placeholder="Address" ref={address1} ></input>
                <input type="text" placeholder="State" ref={state} ></input>
                <input type="text" placeholder="City" ref={city} ></input>
                <input type="text" placeholder="Mobile no." ref={mobile} ></input>
                <input type="text" placeholder="Country" ref={country} ></input>
                <input type="text" placeholder="Zip Code" ref={zipcode} ></input>
                <a href='/login'>Already a member ? signin</a>

                <button className='registerButtom' onClick={handleSubmit}>Register</button>
                 
        </div>
    )
}

export default Register