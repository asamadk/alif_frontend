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
        // setTimeout(() => {
        //     setLoading(false);
        //     setOrderJSON(JSON.parse('{"userModel":{"user_id":141,"user_Fname":"Nafeesa ","user_Lname":"Abbassi ","email":"Nafeesaabbasi@gmail.com ","user_Password":"$2a$10$L6/TZzG.E1OsQBRHV/N1COgdHlJYgc.FobRRNkc3I.ayREqKyR9RC","user_City":"Banda","user_State":"Uttar Pradesh","user_zip":210001,"user_email_verified":true,"user_registration_Date":null,"user_verification_code":0,"user_phone_number":"9565749477","user_country":"India","user_address1":"Near v mart Jalal chashme wale ","user_address2":null,"resetPasswordToken":null,"user_block":false,"role":"ROLE_USER"},"productModelList":[{"product_id":10,"product_name":"Alif fancy blue abstract shirt","product_weight":20,"product_price":1999,"product_real_price":1399,"product_small_Desc":"{\\"weave\\":\\"double stitch\\",\\"mill\\":\\"Indian mill\\",\\"fabric shine\\":\\"2xp\\",\\"sizefit\\":\\"This is a multi-customizable shirt than can fit you the best way possible, you just need to go to get size section to tailor it for your needs\\",\\"washcare\\":\\"Machine washable | Hand washable | Avoid harsh cleaner | Dont bleach\\"}","product_long_Desc":"{\\"productQuote\\":\\"Fashions fade, style is eternal.\\",\\"composition\\":\\"100% cotton\\",\\"description\\":\\"Sourced from a mill known for its finesse and craftsmanship, this oxford fabric is strong and sturdy with a soft and rich feel. This customisable shirt can be designed with a Spread collar, single convertible cuff and a French placket.\\"}","product_img1":"https://i.postimg.cc/sgMLTqG4/SONY-ILCE-6300-6048x4024-000520.jpg","product_img2":"https://i.postimg.cc/mDYJQ91x/SONY-ILCE-6300-6048x4024-000516.jpg","product_img3":"https://i.postimg.cc/8PpQmZbZ/SONY-ILCE-6300-6048x4024-000515.jpg","product_img4":"https://i.postimg.cc/J0qwWXR3/SONY-ILCE-6300-6048x4024-000506.jpg","avaialable":true,"updateDate":1656108158943,"categoryModel":{"category_Id":4,"category_Name":"Stitched Shirts","category_image":"https://i.postimg.cc/dQ9g38Kr/SONY-ILCE-6300-6048x4024-000542.jpg"},"optionModel":[],"quantity":null},{"product_id":5,"product_name":"Blue and white Roman stripe","product_weight":20,"product_price":1999,"product_real_price":1399,"product_small_Desc":"{\\"weave\\":\\"double stitch\\",\\"mill\\":\\"indian mill\\",\\"fabric shine\\":\\"5xp\\",\\"sizefit\\":\\"This is a multi-customizable shirt than can fit you the best way possible, you just need to go to get size section to tailor it for your needs\\",\\"washcare\\":\\"Machine washable | Hand washable | Avoid harsh cleaner\\"}","product_long_Desc":"{\\"productQuote\\":\\"Nothing spells sophistication better than this luxurious blue roman stripe shirt.\\",\\"composition\\":\\"100% cotton\\",\\"description\\":\\"Sourced from a mill known for its finesse and craftsmanship, this oxford fabric is strong and sturdy with a soft and rich feel. This customisable shirt is designed with a Spread collar, single convertible cuff and a French placket.\\"}","product_img1":"https://i.postimg.cc/dQ9g38Kr/SONY-ILCE-6300-6048x4024-000542.jpg","product_img2":"https://i.postimg.cc/Gtzff1jq/SONY-ILCE-6300-6048x4024-000522.jpg","product_img3":"https://i.postimg.cc/zG4c67nZ/SONY-ILCE-6300-6048x4024-000545.jpg","product_img4":"https://i.postimg.cc/Gh57TKg8/SONY-ILCE-6300-6048x4024-000546.jpg","avaialable":true,"updateDate":1656105778590,"categoryModel":{"category_Id":4,"category_Name":"Stitched Shirts","category_image":"https://i.postimg.cc/dQ9g38Kr/SONY-ILCE-6300-6048x4024-000542.jpg"},"optionModel":[],"quantity":null}],"price":2798,"orderDate":1661520644495,"orderTrackingNumber":null,"orderStatus":null,"orderStatusString":"Placed","expectedArrivalDate":1662125449365,"razorpay_order_id":null,"couponName":"null","paymentMode":"COD","orderId":145}'));
        // },1000);
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
