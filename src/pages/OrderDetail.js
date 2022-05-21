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
            setLoading(false);
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
            <div className="order_details_account">
              <h3>Account</h3>
              <p>Abdul Samad Kirmani</p>
            <div className='divider'></div>
            {/* <div className='Right_divider'></div> */}
            </div>
            <div className="sidebar_and_orders">
              <div className="sidebar">
                <h1>Overview</h1>
                <div className='divider_small'></div>
                <h1>Orders</h1>
                <h1>orders and return</h1>
                <div className='divider_small'></div>
                <h1>Credits</h1>
                <h1>coupons</h1>
                <h1>Alif Credit</h1>
                <h1>Alif Cash</h1>
                <div className='divider_small'></div>
                <h1>ACCOUNT</h1>
                <h1>Profile</h1>
                <h1>Saved Cash</h1>
                <h1>Addresses</h1>
                <h1>Alif insider</h1>
              </div>
              <div className="all_orders_container">
                <div className="all_orders_container_single">
                  <h2>Cancelled</h2>
                  <p>On Sat, 10 Jul 2021 as per your request.</p>
                  <div className="all_orders_container_single_inner">
                    <div><img src="https://picsum.photos/80/90" alt=''></img></div>
                    <div>
                      <h2>Red Shirts</h2>
                      <p>sixe: M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default OrderDetails