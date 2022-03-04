import axios from 'axios';
import React, {useState} from 'react'
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'

import "../styles/coupons.css";

function Coupons(){

    const [coupons,setCoupons] = useState([]);
    const [logged,setLogged] = useState(false);
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

    return(
        <div className="Coupons">
            {
                coupons.length > 0 ? coupons.map(coupon => {
                return(
                <div className="Coupons_container">
                <h1>{coupon.couponDiscount}% Off</h1>
                <h3>{coupon.couponName}</h3>
                <p>Expire by : 31 December 2021</p>
                <p>On minimum purchase of 1000Rs </p>
                <a href="">Terms and conditions</a>
                </div>
                    )
                }) : ''
            }
        </div>
    )
}

export default Coupons