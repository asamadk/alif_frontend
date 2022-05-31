import React from "react"
import "../styles/Orders.css"
import * as URL from '../Helper/endpoints'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";

function Orders(){

    let history = useHistory();

    const [loading,setLoading] = React.useState(false);
    const [logged,setLogged] = React.useState(false);
    const [token,setToken] = React.useState('');
    const [customSeveiry,setCustomSeveiry] = React.useState('success');
    const [show,setShow] = React.useState(false);
    const [Msg, setMsg] = React.useState('');
    const [userMail,setUserMail] = React.useState('Email');
    const [orders,setOrders] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
            setUserMail(jwt_decode(localStorage.getItem(Constants.TOKEN))?.sub);
        }else{
            history.push('/login');
        }


        axios.get(URL.GET_ALL_ORDERS,{headers : { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` }})
        .then(res => {
            setLoading(false);
            if(res.data.responseCode == Constants.OK_200 && res.data.responseWrapper && res.data.responseWrapper.length > 0){
                setOrders(res.data.responseWrapper);
                console.log(res.data.responseWrapper);
            }else{
                //TODO : write for error managing
            }
        }).catch(err => {
            setLoading(false);
        })
    },[])


    const handleOrderDetail = (orderId) => {
        history.push('/order/detail/'+orderId);
    }

    const loadingCss = {
        color: '#e60023',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
    }

    return(
        <>
            {loading && (<CircularProgress size={34} sx={loadingCss}/>)}

            <Collapse in={show}><Alert severity={customSeveiry} sx={{ mb: 1 }}>{Msg}</Alert></Collapse>
        <div className="order_details_account">
              <h3>Account</h3>
              <p>{userMail}</p>
            <div className='divider'></div>
            </div>
            <div className="sidebar_and_orders">
            <LeftSideBar/>
              <div className="all_orders_container_order">
                {orders.map(order => {
                return(
                    <div key={order.orderId} className="all_orders_container_single">
                        <h2>Delivered</h2>
                        <p>On {new Date(order.orderDate).toDateString()}</p>
                        <div onClick={() => {handleOrderDetail(order.orderId)}} className="all_orders_container_single_inner">
                            <div>
                                {order.productModelList.map(product => {
                                return(
                                    <div className="Orders__Products">
                                        <div className="Orders__Products_image_container">
                                            <img src="https://picsum.photos/70/75"></img>
                                        </div>
                                        <div className="Orders__Products_name_size">
                                            <h3>{product.product_name} </h3>
                                            <p>Size: M</p>
                                            <p className="product_desc">{product.product_small_Desc}</p>
                                        </div>
                                    </div>
                                )
                                })}
                            </div>
                        </div>
                    </div>
                )})}
              </div>
            </div> 
        </>
    )
}

export default Orders