import React, { Component } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
import '../styles/OrderMail.css'
import * as Endpoint from '../Helper/endpoints'
import axios from 'axios';

const OrderMail = () => {
    let { orderid } = useParams();
    const [orderJSON, setOrderJSON] = React.useState({});
    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        axios.get(Endpoint.MAIL_ORDER+orderid).then(res => {
            console.log(res.data.responseWrapper[0]);
            if(res.data.responseWrapper[0] != null){
                setOrderJSON(res.data.responseWrapper[0]);
                setLoading(false);
            }
        })
    },[]);

    let circularCss = {
        color: '#e60023',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
      }

    return (
        <>
            {loading && <CircularProgress size={34} sx={circularCss} />}
            <div className='admin-order-main-container'>
                <h1 style={{textAlign : 'start', padding : '10px'}} >An order has been placed</h1>
                <div className='date-container' >
                    <p style={{color : 'gray'}} >Order placed on:  
                    <span style={{fontWeight : '600'}}>{new Date(orderJSON?.orderDate).toLocaleDateString()}</span>
                    </p>
                    <p style={{color : 'gray'}} >Estimated delivery by:   
                    <span style={{fontWeight : '600'}}>{new Date(orderJSON?.expectedArrivalDate).toLocaleDateString()}</span>
                    </p>
                </div>
                <div className='date-container'>
                    <h1 style={{textAlign : 'start'}} >User details</h1>
                    <p style={{color : 'gray'}} >Name :   
                        <span style={{fontWeight : '600'}}>{ orderJSON?.userModel?.user_Fname + orderJSON?.userModel?.user_Lname}</span>
                    </p>
                    <p style={{color : 'gray'}} >Email :   
                        <span style={{fontWeight : '600'}}>{ orderJSON?.userModel?.email}</span>
                    </p>
                    <p style={{color : 'gray'}} >From :   
                        <span style={{fontWeight : '600'}}>{ orderJSON?.userModel?.user_City +', '+ orderJSON?.userModel?.user_State}</span>
                    </p>
                    <p style={{color : 'gray'}} >Address :   
                        <span style={{fontWeight : '600'}}>{ orderJSON?.userModel?.user_address1 +', '+ orderJSON?.userModel?.user_address2}</span>
                    </p>
                    <p style={{color : 'gray'}} >zip :   
                        <span style={{fontWeight : '600'}}>{ orderJSON?.userModel?.user_zip}</span>
                    </p>
                    <p style={{color : 'gray'}} >Phone :   
                        <span style={{fontWeight : '600'}}>{ orderJSON?.userModel?.user_phone_number}</span>
                    </p>
                </div>
                {
                    orderJSON?.productModelList?.map((product) => {
                        return(<div className='product-list' key={product.product_id}>
                            <img style={{height : '100px'}} src={product.product_img1}></img>
                            <div className='product-list-sub-container'>
                                <p >Id  #{product.product_id}</p>
                                <p >Name : {product.product_name}</p>
                                <p>Price : {product.product_real_price}</p>
                                <p>Category : {product.categoryModel.category_Name}</p>
                            </div>
                        </div>)
                    })
                }
                <div className='admin-order-base-container'>
                    <p style={{color : 'gray'}} >Order Id  :   
                        <span style={{fontWeight : '600'}}>#{orderJSON.orderId}</span>
                    </p>
                    <p style={{color : 'gray'}} >Total Amount  :   
                        <span style={{fontWeight : '600'}}>{ orderJSON.price}</span>
                    </p>
                    <p style={{color : 'gray'}} >Order status  :   
                        <span style={{fontWeight : '600'}}>{ orderJSON.orderStatusString}</span>
                    </p>
                    <p style={{color : 'gray'}} >Payment mode  :   
                        <span style={{fontWeight : '600'}}>{ orderJSON.paymentMode}</span>
                    </p>
                    <p style={{color : 'gray'}} >Coupon used  :   
                        <span style={{fontWeight : '600'}}>{ orderJSON.couponName != 'null' ? 'true' : 'false'}</span>
                    </p>
                    <p style={{color : 'gray'}} >Coupon used  :   
                        <span style={{fontWeight : '600'}}>{ orderJSON.couponName}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default OrderMail;
