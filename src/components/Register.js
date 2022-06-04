import React from 'react'
import { useRef } from 'react';
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as Constants from '../Helper/Constants';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
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
    // const state = useRef(null);
    const mobile = useRef(null);
    const zipcode = useRef(null);
    const country = useRef(null);

    const [city,setCity] = React.useState('');
    const [state,setState] = React.useState('');
    const [user,setuser] = React.useState({});
    const [show,setShow] = React.useState(false);
    const [err,setErr] = React.useState(false);
    const [errDesc,setErrDesc] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('CRRR',state);
        if(password.current.value != confrimPassword.current.value){
            alert("Password do not match")
            return;
        }

        const data = {
            user_Fname : fname.current.value,
            user_Lname : lname.current?.value,
            email : email.current?.value,
            user_Password : password.current?.value, 
            user_City : city,
            user_State : state,
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
                setTimeout(() => {
                    setErr(false);
                },2000);
                setErrDesc(res.data.errorMap.error);
            }
        }).catch(err => {
            if(err.response && err.response.data.errorMap){
                setErrDesc(err.response.data.errorMap.Error);
                setErr(true);
                setTimeout(() => {
                    setErr(false);
                },2000);
            }
            console.log(err.response)
        });

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
        
        <div className='register-input-container'>
            <InputLabel id="demo-simple-select-label">First Name</InputLabel>
            <TextField inputRef={fname} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">Last Name</InputLabel>
            <TextField inputRef={lname} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">Email</InputLabel>
            <TextField inputRef={email} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">Password</InputLabel>
            <TextField type='password' inputRef={password} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">Confirm Password</InputLabel>
            <TextField type='password' inputRef={confrimPassword} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">Address</InputLabel>
            <TextField inputRef={address1} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select value={state} onChange={(e) => {setState(e.target.value)}}  sx={{width : '295px'}} labelId="demo-simple-select-label" id="demo-simple-select">
                    {Constants.GEOGRAPHY.states.map(state => {
                        return(<MenuItem value={state.state}>{state.state}</MenuItem>)
                    })}
            </Select>

            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select value={city} onChange={(e) => {setCity(e.target.value)}} sx={{width : '295px'}} label="city" labelId="demo-simple-select-label" id="demo-simple-select">
                    {Constants.GEOGRAPHY.states.map(st => {
                        return(st.state === state && st.districts.map(district => {
                            return(<MenuItem value={district}>{district}</MenuItem>)
                        }))
                    })}
            </Select>

            <InputLabel id="demo-simple-select-label">Mobile no.</InputLabel>
            <TextField inputRef={mobile} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <TextField inputRef={country} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">Zip Code</InputLabel>
            <TextField inputRef={zipcode} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />
        </div>

            <a href='/login'>Already a member ? signin</a>
            <br/>
            <div className='registerButtom'>
                <LoadingButton  onClick={handleSubmit} variant="outlined">Register</LoadingButton>
            </div>     
        </div>
    )
}

export default Register