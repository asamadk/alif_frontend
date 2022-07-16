import axios from 'axios';
import React, {useState} from 'react'
import * as Constants from '../Helper/Constants'
import { useParams } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import LoadingButton from '@mui/lab/LoadingButton';
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
    const [copyText, setCopyText] = useState('copy');

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

    const handleCopyCoupons = (couponName) => {
        navigator.clipboard.writeText(couponName);
        setCopyText('copied');
        setTimeout(() => {
            setCopyText('copy');
        },4000)
    }

    const buttonCss = {
        marginLeft : '10px',
        color: 'black',
        border: '1px #B8B8B8 solid',
        marginTop : '10px'
      }

    return(<>
        <Collapse in={couponAdd}>
          <Alert severity="success" sx={{ mb: 1 }}>{successMsg}</Alert>
        </Collapse>
        <div className="Coupons">
            {
                coupons.length > 0 && coupons.map(coupon => {
                return(
                <div className="Coupons_container">
                <h1>{coupon.couponDiscount}% Off</h1>
                <h3>{coupon.couponName}</h3>
                <p>Expires on : {coupon.expireDate}</p>
                <p>On minimum purchase of ₹ {coupon.minimumPurchasePrice}</p>
                <p>Max discount of ₹ {coupon.maximumDiscount}</p>
                <a href="">Terms and conditions</a><br/>
                <LoadingButton style={buttonCss} onClick={() => handleCopyCoupons(coupon.couponName)} variant="outlined">
                    {copyText}
                </LoadingButton>
                </div>
            )})}
        </div>
        </>
    )
}

export default Coupons