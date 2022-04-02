import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import * as URL from '../Helper/endpoints'

import "../styles/OrderDetails.css";

function OrderDetails(){
    let { id } = useParams(); 

    const [logged,setLogged] = useState(false);
    const [token,setToken] = useState('');
    const [show,setShow] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
    const [loading,setLoading] = React.useState(false);
    const [severity,setSeverity] = useState('error');

    useEffect(() => {
        setLoading(true);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
          }

          axios.get(URL.GET_ORDER+id,{headers : { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` }})
          .then(res => {
            setLoading(false);
            console.log(res.data);
          }).catch(err => {
                console.log(err)
          })
    },[])
    return(
        <>
           {loading && <CircularProgress
            size={34}
            sx={{
              color: '#e60023',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />}
          <Collapse in={show}>
                <Alert severity={severity}>{errorMsg}</Alert>
            </Collapse>

            <h1>Order Details</h1>
        </>
    )
}

export default OrderDetails