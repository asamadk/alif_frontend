import React from "react"
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import "../styles/Product.css"

function Product(props){
    //image,size will be dynamic
    const history = useHistory();

    const [logged,setLogged] = React.useState(false);
    const [token,setToken] = React.useState('');
    const [addedToCart,setAddedToCart] = React.useState(false);
    const [errorMsg,setErrorMsg] = React.useState('');
    const [button,setButton] = React.useState('');
    const [rerender,setRerender] = React.useState(false);

    React.useEffect(() => {
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
          }
          if(props.btn === Constants.DELETE_FROM_WISHLIST){
            setButton('Delete');
        }
    },[]);
    const handleCart = () => {
        if(logged){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.post(URL.ADD_PRODUCT_TO_CART+props.unique)
                .then(res => {
                    setAddedToCart(true);
                    setTimeout(()=>{
                        setAddedToCart(false);
                    },1000);
                    setErrorMsg('Product added to cart')
                }).catch(err => {
                    console.log(err); 
                })
        }else{
            history.push('/login');
        }
    }

    const handleButton = () => {
        if(props.btn === Constants.DELETE_FROM_WISHLIST && props.unique && props.wishlistId){
            axios.delete(`${URL.DELETE_FROM_WISHLIST}${props.unique}/${props.wishlistId}`,{headers : { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` }})
            .then(res => {
                console.log(res.data);
                if(res.data.responseCode === Constants.OK_200 && res.data.responseWrapper && res.data.responseWrapper.length > 0){
                    setAddedToCart(true);
                    setTimeout(() => {
                        setAddedToCart(false);
                        // window.location.reload();
                    },1500)
                    setErrorMsg('Product removed from wishlist')
                }
            }).catch(err => {

            })
        }
    }

    return(
        <div key={props.unique} className="product">
            <Collapse in={addedToCart}>
                <Alert severity="success">{errorMsg}</Alert>
            </Collapse>
            <img src="https://picsum.photos/300/400" alt=""></img>
            <h2>{'Rs '+props.price}</h2>
            <p>{props.name}</p>
            <div className="product__size">
            <button>M</button>
            <button>S</button>
            <button>L</button>
            </div>
            
            <div className="addtocart">
                <button onClick={handleCart}>Add to Cart</button>
                {
                    Constants.VIEW_MORE === props.btn ? 
                    <a key={props.unique} href={'/product/details/'+props.unique}>
                        <button>{props.btn}</button>
                    </a> : 
                        <button onClick={handleButton}>{button}</button>
                }
                
                
            </div>
        </div>
    )
}

export default Product