import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import * as Constants from '../Helper/Constants';
import * as URL from '../Helper/endpoints';
import { useHistory } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import LogoutIcon from '@mui/icons-material/Logout';
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

    const handleChangePassword = () => {
        setLoading(true);
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
                    setLoading(true);
                    history.push('/reset');
                },3000);
            }
        }).catch(err => {
            if(err.response && err.response.status == Constants.NOT_FOUND_404){
                setLoginError(true);
                setcustomSeverity('error')
                setTimeout(() => {
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

            {/* {loading && (
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
            />)} */}

            { changePassword ? 
            <>
            <input ref={email} type='text' placeholder='email'></input>
                <button onClick={handleChangePassword}>Submit</button>
                <button onClick={() => {setChanegPassword(false)}}>Cancel</button>
            </>
            :
            <>
            <input type="text" placeholder="Email" ref={email}></input>
            <input type="Password" placeholder="Password" ref={password}></input>
            <a href="/register">Dont have an account?<span> Register here</span></a>
            <div>
            <a href="/" onClick={(e) => showChangePassword(e)}>Forgot password</a>
            </div>
            <LoadingButton onClick={handleSubmit} loading={loading} variant="outlined">
                Login
            </LoadingButton>
            </>
            }
            
        </div>
    )
}

export default Login
