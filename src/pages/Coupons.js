import axios from 'axios';
import React, {useState} from 'react'
import * as Constants from '../Helper/Constants'
import { useParams } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as URL from '../Helper/endpoints'

import "../styles/coupons.css";

function Coupons(){

    let { cartId } = useParams();

    const [coupons,setCoupons] = useState([]);
    const [logged,setLogged] = useState(false);
    const [couponAdd,setCouponAdd] = React.useState(false);
    const [successMsg,setSuccessMsg] = React.useState('Something went wrong');
    const [token,setToken] = useState('');

    React.useEffect(() => {

        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
          }

        axios.get(URL.GET_COUPONS, {headers : {Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` }})
        .then(res => {
            console.log(res.data.responseWrapper);
            setCoupons(res.data.responseWrapper);
        }).catch(err => {
            
        })
    },[])


    const handleApplyCoupons = (coupon_name) => {
        console.log('Cart id ',cartId);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(Constants.TOKEN)}`
        axios.post(`${URL.ADD_COUPON_TO_CART}?couponName=${coupon_name}&cartId=${cartId}`)
        .then(res => {
            if(res.data.responseWrapper.length > 0){
                setSuccessMsg(res.data.responseWrapper[0]);
                setCouponAdd(true);
                window.location.replace('/cart');
            }
          console.log(res.data.responseWrapper[0])

        }).catch(err => {
    
        })
    }

    return(<>
        <Collapse in={couponAdd}>
          <Alert severity="success" sx={{ mb: 1 }}>{successMsg}</Alert>
        </Collapse>
        <div className="Coupons">
            {
                coupons.length > 0 ? coupons.map(coupon => {
                return(
                <div className="Coupons_container">
                <h1>{coupon.couponDiscount}% Off</h1>
                <h3>{coupon.couponName}</h3>
                <p>Expire by : 31 December 2021</p>
                <p>On minimum purchase of 1000Rs </p>
                <a href="">Terms and conditions</a><br/>
                {logged ?
                <button onClick={() => {handleApplyCoupons(coupon.couponName)}}>Apply</button> : ''
                }
                </div>
                    )
                }) : ''
            }
        </div>
        </>
    )
}

export default Coupons