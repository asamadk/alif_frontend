import React from "react"
import "../styles/Orders.css"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import * as URL from '../Helper/endpoints'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as Constants from '../Helper/Constants'
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useHistory } from "react-router-dom";

function Orders(){

    let history = useHistory();

    const [loading,setLoading] = React.useState(false);
    const [logged,setLogged] = React.useState(false);
    const [token,setToken] = React.useState('');
    const [customSeveiry,setCustomSeveiry] = React.useState('success');
    const [show,setShow] = React.useState(false);
    const [Msg, setMsg] = React.useState('');
    const [orders,setOrders] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
        }else{
            history.push('/login');
        }


        axios.get(URL.GET_ALL_ORDERS,{headers : { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` }})
        .then(res => {
            setLoading(false);
            console.log(res.data);
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

    return(
        <div className="Orders">
            {loading && (
            <CircularProgress
            size={34}
                sx={{
                    color: '#e60023',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                }}
            />
            )}
            <Collapse in={show}>
                <Alert severity={customSeveiry} sx={{ mb: 1 }}>{Msg}</Alert>
            </Collapse>
            <h1>Orders</h1>
            {
                orders.map(order => {
                    return(
                <div key={order.orderId} className="Orders__SingleOrder">
                    <CheckCircleIcon/> Delivered
                    <p>On {new Date(order.orderDate).toDateString()}</p>
                    <button onClick={() => {handleOrderDetail(order.orderId)}}>details</button>
                    {/* <button onClick={handleOrderDetail}>Details</button> */}
                    {order.productModelList.map(product => {
                        return(
                            <div className="Orders__Products">
                            <img src="https://picsum.photos/200/200"></img>
                            <div className="Orders__Products_name_size">
                                <h3>{product.product_name} </h3>
                                <p>Size: M</p>
                                <p className="product_desc">{product.product_small_Desc}</p>
                            </div>
                                {/* <button>M</button> */}
                            </div>
                        )
                    })}
                </div>
                    )
                })
            }
        </div>
    )
}

export default Orders