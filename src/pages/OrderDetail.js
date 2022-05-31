import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import * as URL from '../Helper/endpoints'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import "../styles/OrderDetails.css";
import LeftSideBar from "../components/LeftSideBar";

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
            </div>
            <div className="sidebar_and_orders">
                <LeftSideBar/>
              <div className="all_orders_container">
                <div className="all_orders_container_image">
                  <img src="https://picsum.photos/200/200" alt=''></img>
                  <h3>Red Dress</h3>
                  <p>size: M</p>
                </div>
                <div className="all_orders_container_single">
                  <CancelOutlinedIcon/>
                  <div>
                  <h3>Cancelled</h3>
                  <p>On Sat, 10 Jul 2021 as per your request.</p>
                  </div>
                </div>
                <div className="Order_items_price">
                  <div className="oder_item_price_name">
                    <h3>Total Order Price</h3>
                    <p>You saved <span style={{color:'green'}}>₹ 599.00</span> on this order</p>
                  </div>
                  <div className="oder_item_price_price">
                    <h3>₹ 1396.00</h3>
                    <p><span style={{color:'red'}}>View Breakup</span></p>
                  </div>
                </div>
                  <div className="order_payment_option">
                    <div className="payment_icon">
                      <CreditCardOutlinedIcon/>
                    </div>
                    <p>Pay on delivery.</p>
                  </div>
                  <div className="all_orders_container_single">
                    <h3>Updates sent to</h3>
                    <p>7007475550</p>
                    <p>abdul.samadkirmani.samad63@gmail.com</p>
                </div>
                <div className="all_orders_container_single">
                    <p>Order ID # 1177778 06966369084701</p>
                </div>
              </div>
            </div>
        </>
    )
}

export default OrderDetails
