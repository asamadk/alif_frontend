import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import * as URL from '../Helper/endpoints'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import jwt_decode from "jwt-decode";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import "../styles/OrderDetails.css";
import LeftSideBar from "../components/LeftSideBar";

function OrderDetails(){
    let { id } = useParams(); 
    const history = useHistory();

    const [logged,setLogged] = useState(false);
    const [token,setToken] = useState('');
    const [show,setShow] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
    const [loading,setLoading] = React.useState(false);
    const [severity,setSeverity] = useState('error');
    const [userMail,setUserMail] = React.useState('Email');
    const [order, setOrder ] = React.useState(history.location.state?.order);

    useEffect(() => {
        setLoading(false);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
            setUserMail(jwt_decode(localStorage.getItem(Constants.TOKEN))?.sub);
          }
          console.log('Order',order)
          console.log('Order String',JSON.stringify(order))
          // axios.get(URL.GET_ORDER+id,{headers : { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` }})
          // .then(res => {
          //   setLoading(false);
          //   console.log(res.data);
          // }).catch(err => {
          //   setLoading(false);
          //       console.log(err)
          // })
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
              <p>{userMail}</p>
            <div className='divider'></div>
            </div>
            <div className="sidebar_and_orders">
                <LeftSideBar/>
              <div className="all_orders_container">
                <div className="all_orders_container_image">
                  <img src="https://picsum.photos/200/200" alt=''></img>
                  <h3>Thank you for your order</h3>
                  {/* <p>React out to us in </p> */}
                </div>
                <div className="all_orders_container_single">
                  <div className="cross_icon">
                    <CheckCircleOutlineIcon/>
                  <h3>{order.orderStatusString}</h3>
                  </div>
                  <p>On {new Date(order.orderDate).toDateString()}</p>
                </div>
                <div className="Order_items_price">
                  <div className="oder_item_price_name">
                    <h3>Total Order Price</h3>
                    {/* <p>You saved <span style={{color:'green'}}>₹ 599.00</span> on this order</p> */}
                  </div>
                  <div className="oder_item_price_price">
                    <h3>₹ {order.price}</h3>
                    {/* <p><span style={{color:'red'}}>View Breakup</span></p> */}
                  </div>
                </div>
                  <div className="order_payment_option">
                    <div className="payment_icon">
                      <CreditCardOutlinedIcon/>
                      <p>{order.paymentMode}</p>
                    </div>
                  </div>
                  <div className="all_orders_container_single">
                    <h3>Updates sent to</h3>
                    <p>{order?.userModel?.user_phone_number}</p>
                    <p>{order?.userModel?.email}</p>
                </div>
                <div className="all_orders_container_single">
                    <p>Order ID # {order?.orderId}</p>
                </div>
              </div>
            </div>
        </>
    )
}

export default OrderDetails
