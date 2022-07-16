import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import * as Constants from '../Helper/Constants';
import * as URL from '../Helper/endpoints';
import { useHistory } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';


import "../styles/Login.css";

function Login(){

    const history = useHistory();

    const email = useRef(null);
    const password = useRef(null);

    const [token,setToken] = useState(null);
    const [loginError,setLoginError] = useState(false);
    const [customSeverity,setcustomSeverity] = useState('error');
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const [changePassword,setChanegPassword] = useState(false);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const requestData = {
            username : email.current?.value,
            password : password.current?.value
        }

        console.log('REQUEST DATA',requestData)
        
        axios.post(URL.LOGIN,requestData)
            .then(res => {
                setLoading(false);
                console.log(res.data);
                setToken(res.data.responseWrapper[0]);
                localStorage.setItem(Constants.TOKEN,res.data.responseWrapper[0]);
                if(res.data.responseCode === Constants.OK_200){
                    // history.push('/home');
                    window.location.replace('/home')
                }
            }).catch(err => {
                //create error response backend
                setLoginError(true);
                setMessage('email or password is incorrect');
                setcustomSeverity('error');
                setTimeout(() => {
                    setLoginError(false);
                },1500)
                setLoading(false);
                console.log(err);
            })
    }

    const showChangePassword = (e) => {
        e.preventDefault();
        setChanegPassword(true);
    }

    const ValidateEmail = (mail)  =>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return (true)
        }
    return (false)
    }

    const handleChangePassword = () => {
        setLoading(true);
        console.log(email.current?.value)
        if(email.current?.value == null){
            setMessage('Email cannot be empty')
            setLoginError(true);
            setLoading(false)
            setTimeout(() => {
                setLoginError(false);
            },3000);
            return;
        }

        if(ValidateEmail(email.current?.value) == false){
            setMessage('You have entered an invalid email address!')
            setLoginError(true);
            setLoading(false)
            setTimeout(() => {
                setLoginError(false);
            },3000);
            return;
        }

        axios.post(URL.RESET_PASSWORD+email.current?.value)
        .then(res => {
            console.log(res);
            if(res.data.responseCode == Constants.OK_200){
                setLoginError(true);
                setcustomSeverity('success')
                setTimeout(() => {
                    setLoginError(false);
                },3000);
                setMessage('A mail has been sent to your email id')
                setLoading(false);
                setTimeout(() => {
                    setLoading(false);
                    history.push('/reset');
                },3000);
            }
        }).catch(err => {
            if(err.response && err.response.status == Constants.NOT_FOUND_404){
                setLoginError(true);
                setcustomSeverity('error')
                setTimeout(() => {
                    setLoading(false);
                    setLoginError(false);
                },3000);
                setMessage('No account with this email address is present')
            }else if(err.response && err.response.status == Constants.SERVER_ERROR_500){
                setLoginError(true);
                setcustomSeverity('error')
                setTimeout(() => {
                    setLoginError(false);
                },3000);
                setMessage('Something went wrong')
            }
        })
        
    }
    
    return(
        <div className="Login">
            <h1>{changePassword ? 'Change Password' : 'Login'} </h1>
            <div className='alertLogin'>
            <Collapse in={loginError}>
                <Alert severity={customSeverity} sx={{ mb: 1 }}>{message}</Alert>
            </Collapse>
            </div>

        {changePassword && <>
            <TextField inputRef={email} sx={{width : '295px'}} label="email" id="outlined-basic"  variant="outlined" />
                <LoadingButton onClick={handleChangePassword} loading={loading} variant="outlined">
                Submit
                </LoadingButton>
                <LoadingButton onClick={() => {setChanegPassword(false)}} variant="outlined">
                Cancel
                </LoadingButton>
        </>}
        
        { !changePassword && <>
            <InputLabel id="demo-simple-select-label">Email</InputLabel>
            <TextField inputRef={email} sx={{width : '250px'}} id="outlined-basic"  variant="outlined" />

            <InputLabel id="demo-simple-select-label">Password</InputLabel>
            <TextField type='password' inputRef={password} sx={{width : '250px'}} id="outlined-basic"  variant="outlined" />
            <br/>
            <a href="/register">Dont have an account?<span> Register here</span></a>
            <div><a href="/" onClick={(e) => showChangePassword(e)}>Forgot password</a></div>
            <LoadingButton onClick={handleSubmit} loading={loading} variant="outlined">
                Login
            </LoadingButton>
        </>}
            
        </div>
    )
}

export default Login
