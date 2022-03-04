import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import * as Constants from '../Helper/Constants';
import * as URL from '../Helper/endpoints';
import { useHistory } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';


import "../styles/Login.css";

function Login(){

    const history = useHistory();

    const email = useRef(null);
    const password = useRef(null);

    const [token,setToken] = useState(null);
    const [loginError,setLoginError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestData = {
            username : email.current?.value,
            password : password.current?.value
        }
        
        axios.post(URL.LOGIN,requestData)
            .then(res => {
                console.log(res.data);
                setToken(res.data.responseWrapper[0]);
                localStorage.setItem(Constants.TOKEN,res.data.responseWrapper[0]);
                if(res.data.responseCode == Constants.OK_200){
                    history.push('/');
                }
            }).catch(err => {
                //create error response backend
                setLoginError(true);
                console.log(err);
            })
    }
    
    return(
        <div className="Login">
            <h1>Login </h1>
            <div className='alertLogin'>
            <Collapse in={loginError}>
                <Alert severity="error" sx={{ mb: 1 }}>email or password is incorrect</Alert>
            </Collapse>
            </div>
            
            <input type="text" placeholder="Email" ref={email}></input>
            <input type="Password" placeholder="Password" ref={password}></input>
            <a href="/register">Dont have an account <span>Register here !</span></a>
            <button onClick={handleSubmit} type="submit">Login</button>
        </div>
    )
}

export default Login
