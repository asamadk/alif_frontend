import React, { useState,useRef } from "react";
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import * as Constants from '../Helper/Constants';
import * as URL from '../Helper/endpoints';
import Alert from '@mui/material/Alert';

import "../styles/ResetPassword.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ResetPassword() {
    
    let history = useHistory();

    const newPassword = useRef(null);
    const confirmPassword = useRef(null);
    const link = useRef(null);

    const [loginError,setLoginError] = useState(false);
    const [customSeverity,setcustomSeverity] = useState('error');
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);
    
    const handleResetPassword = () => {
        const newPass = newPassword.current?.value;
        const confPass =confirmPassword.current?.value;
        let token = link.current?.value;

        if(newPass == '' || confPass == '' || token == ''){
            setLoginError(true);
            setTimeout(() => {
                setLoginError(false);
            },3000)
            setMessage('Please fill all the details');
            setcustomSeverity('error');
            return;
        }

        let formDate = new FormData();
        formDate.append('password',newPassword.current?.value);

        if(newPass !== confPass){
            setLoginError(true);
            setTimeout(() => {
                setLoginError(false);
            },3000)
            setMessage('Passwords do not match');
            setcustomSeverity('error');
            return;
        }
        if(token !== '' && token != null){
            token =  token.substring(token.indexOf('=')+1);
            console.log('Token',token);
            axios.post(URL.CHANGE_PASSWORD+token,formDate)
            .then(res => {
                setLoginError(true);
                    setTimeout(() => {
                    setLoginError(false);
                },3000)
                setMessage(res.data);
                setcustomSeverity('success');
            }).catch(err => {
                if(err.response.status == Constants.SERVER_ERROR_500){
                    history.push('/status',{code : err.response.status});
                }
            })
        }else{
            setLoginError(true);
            setTimeout(() => {
                setLoginError(false);
            },3000)
            setMessage('The link is not valid');
            setcustomSeverity('error');
        }
    }

    return(
        <div className="reset-password-container">
            <Collapse in={loginError}>
                <Alert severity={customSeverity} sx={{ mb: 1 }}>{message}</Alert>
            </Collapse>
            <label>New Password</label>
            <input autoComplete="false" ref={newPassword} type="password"></input>
            <label>Confirm Password</label>
            <input autoComplete="false" ref={confirmPassword} type="password"></input> 
            <label>Link sent to your mail</label>
            <input autoComplete="false" ref={link} type="text" ></input>     
            <button onClick={handleResetPassword}>Reset Password</button>   
        </div>
    )
}

export default ResetPassword;