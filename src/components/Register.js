import React from 'react'
import { useRef } from 'react';
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as Constants from '../Helper/Constants';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import * as URL from '../Helper/endpoints';
import "../styles/Register.css";
import { useHistory } from "react-router-dom";


const Register = () => {

    const history = useHistory();

    const fname = useRef(null);
    const lname = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confrimPassword = useRef(null);
    const address1 = useRef(null);
    const address2 = useRef(null);
    const mobile = useRef(null);
    const zipcode = useRef(null);
    const country = useRef(null);

    const [city,setCity] = React.useState('');
    const [state,setState] = React.useState('');
    const [user,setuser] = React.useState({});
    const [show,setShow] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [err,setErr] = React.useState(false);
    const [errDesc,setErrDesc] = React.useState('');
    const [verificationText, setVerificationText] = React.useState('verifiy');
    const [verifyColor, setVerifyColor] = React.useState('red');

    const clearAllInputBox = () => {
        setVerifyColor('red');
        setVerificationText('verifiy');
        fname.current.value = null;
        lname.current.value = null;
        email.current.value = null;
        password.current.value = null;
        setCity('');
        setState('');
        zipcode.current.value = null;
        mobile.current.value = null;
        country.current.value = null;
        address1.current.value = null;
    }

    const verifyFieldBeforeSaving = () => {
        setLoading(false);
        if(fname == null || fname.current?.value == null) return false;
        if(lname == null || lname.current?.value == null) return false;
        if(email == null || email.current?.value == null) return false;
        if(password == null || password.current?.value == null) return false;
        if(city == null || city === '') return false;
        if(state == null || state === '') return false;
        if(zipcode == null || zipcode.current?.value == null) return false;
        if(mobile == null || mobile.current?.value == null) return false;
        if(address1 == null || address1.current?.value == null) return false;
        return true;
    }

    const handleSubmit = (e) => {
        setLoading(true);
        window.scrollTo(0,0)
        e.preventDefault();
        if(password.current.value != confrimPassword.current.value){
            alert("Password do not match")
            return;
        }
        if(verifyFieldBeforeSaving() === false){
            setErr(true);
            setTimeout(() => {
                setErr(false);
            },2000);
            setErrDesc('Please check all the fields before proceeding')
            return;
        }
        setLoading(true);
        const data = {
            user_Fname : fname.current.value,
            user_Lname : lname.current?.value,
            email : email.current?.value,
            user_Password : password.current?.value, 
            user_City : city,
            user_State : state,
            user_zip : zipcode.current?.value,
            user_phone_number : mobile.current?.value,
            user_country : 'India',
            user_address1 : address1.current?.value,
            user_email_verified : true
        }
        console.log('User Data ',data)
        setuser(data);

        axios.post(URL.REGISTER,data).then(res => {
            setLoading(false);
            if(res.data.responseCode == Constants.OK_200){
                // clearAllInputBox();
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                },2000);
                history.push('/login')
                setErrDesc('Registered');
                // fname.current?.value
            }else{
                setShow(false);
                setErr(true);
                setTimeout(() => {
                    setErr(false);
                },2000);
                setErrDesc(res.data.errorMap.error);
            }
        }).catch(err => {
            setLoading(false);
            if(err.response && err.response.data.errorMap){
                console.log('Error response',err.response);
                setErrDesc(err.response.data.errorMap.Error);
                setErr(true);
                setTimeout(() => {
                    setErr(false);
                },2000);
            }
        });

    }

    const handleEmailVerification = async() => {
        setLoading(true);
        if(verificationText === 'verified'){
            return;
        }
        console.log('EMAIL VERIFICATION');
        let mailId = email.current?.value;
        if(mailId == null || mailId === ''){
            return;
        }
        let result = await axios.get(URL.VALIDATE_MAIL+mailId).catch(err => {console.log('EMAIL VERIFICATION ERROR :: ',err)});
        setLoading(false);
        if(result?.data?.deliverability === 'DELIVERABLE'){
            setVerifyColor('green');
            setVerificationText('verified');
        }
        console.log('handleEmailVerification',result);
    }

    const resetEmailVerification = () => {
        setVerificationText('verify');
        setVerifyColor('red');
    }

    return(
        <div className="Register">
            {loading && (
                <CircularProgress size={34}
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
            <h1>Register</h1>
            <div className='alertRegister'>
            <Collapse in={show}>
                <Alert severity="success">{errDesc}</Alert>
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
          <OutlinedInput
            id="outlined-adornment-password"
            type={'text'}
            sx={{width : '295px'}}
            inputRef={email}
            endAdornment={
              <InputAdornment onClick={handleEmailVerification} style={{cursor:"pointer"}} position="end">
                <div style={{color : verifyColor}}>{verificationText}</div>
                {verificationText === 'verified' && <CancelIcon onClick={resetEmailVerification} />}
              </InputAdornment>
            }
            label="Password"
          />
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

            {/* <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <TextField inputRef={country} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" /> */}

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