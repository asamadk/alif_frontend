import React from "react"
import "../styles/Orders.css"
import * as URL from '../Helper/endpoints'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";
import { timelineClasses } from "@mui/lab";

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
    const [size,setSize] = React.useState(3);
    const [page,setPage] = React.useState(0);

    React.useEffect(() => {
        setLoading(true);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
            setUserMail(jwt_decode(localStorage.getItem(Constants.TOKEN))?.sub);
            console.log('TOKEN',jwt_decode(localStorage.getItem(Constants.TOKEN))?.exp)
            let date = jwt_decode(localStorage.getItem(Constants.TOKEN))?.exp;
            if(date > new Date()){
                localStorage.removeItem(Constants.TOKEN);
                window.location.replace('/login');
            }
        }else{
            history.push('/login');
        }


        axios.get(URL.GET_ALL_ORDERS(page,size),{headers : { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` }})
        .then(res => {
            setLoading(false);
            if(res.data.responseCode == Constants.OK_200 && res.data.responseWrapper && res.data.responseWrapper.length > 0){
                setOrders(res.data.responseWrapper);
                console.log(res.data.responseWrapper);
            }else{
                //TODO : write for error managing
            }
        }).catch(err => {
            console.log(err.body)
            setLoading(false);
        })
    },[size,page])


    const handleOrderDetail = (orderId) => {
        console.log(orders)
        let singleORder = orders.filter(order => {
            return order.orderId === orderId
        })
        console.log(singleORder);
        if(singleORder.length > 0){
            history.push('/order/detail/'+orderId, { order : singleORder[0]});
        }
    }

    const handlePaginationChange = (value) => {
        setLoading(true);
        setPage(value);
        window.scrollTo(0,0);
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
                        <div className='check_flex'>
                            <CheckCircleOutlineIcon/>
                            <h2>{order.orderStatusString}</h2>
                        </div>
                        <p>On {new Date(order.orderDate).toDateString()}</p>
                        <div onClick={() => {handleOrderDetail(order.orderId)}} className="all_orders_container_single_inner">
                            <div>
                                {order.productModelList.map(product => {
                                return(
                                    <div className="Orders__Products">
                                        <div className="Orders__Products_image_container">
                                            <img src={product.product_img1}></img>
                                        </div>
                                        <div className="Orders__Products_name_size">
                                            <h3>{product.product_name} </h3>
                                            {/* <p>Size: M</p> */}
                                            <p className="product_desc">{JSON.parse(product.product_long_Desc).productQuote}</p>
                                        </div>
                                    </div>
                                )
                                })}
                            </div>
                        </div>
                    </div>
                )})}
                {orders.length > 0 && <div className="pagination-order">
                    <Pagination count={15} page={page+1} onChange={(e,val) => handlePaginationChange(val-1)} variant="outlined" shape="rounded" />
                </div>}
              </div>
            </div> 
        </>
    )
}

export default Orders