import React from "react"
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
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

    const handleWishlistProduct = (id) => {
        console.log('AHFS',id);
        if(logged){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.post(URL.ADD_USER_WISHLIST+id)
            .then(res => {
                setAddedToCart(true);
                setTimeout(() => {
                    setAddedToCart(false);
                },1500);
                setErrorMsg('Product added to wishlist');
            }).catch(err => {
                console.log(err);
            })
        }else{
            history.push('/login');
        }
    }

    const handleOpenProduct = (id) => {
        history.push('/product/details/'+props.unique);
    }

    return(
        <div key={props.unique} className="product">
            <Collapse in={addedToCart}>
                <Alert severity="success">{errorMsg}</Alert>
            </Collapse>
            <img onClick={() => handleOpenProduct(props.unique)} src="https://picsum.photos/300/500" alt=""></img>
            <div className="product_price_and_icon">
                <h2>{'₹ '+props.price}</h2>
                <div className="heart_icon" onClick={() => handleWishlistProduct(props.unique)}>
                    {props.btn !== Constants.DELETE_FROM_WISHLIST && <FavoriteBorderIcon style={{cursor:'pointer'}} on/>}
                    {props.btn === Constants.DELETE_FROM_WISHLIST && <DeleteOutlineOutlinedIcon style={{cursor:'pointer'}} on/>}
                </div>
            </div>
            <p>{props.name}</p>
            {/* <div className="product__size">
            <button>M</button>
            <button>S</button>
            <button>L</button>
            </div> */}
            
            {/* <div className="addtocart">
                <button onClick={handleCart}>Add to Cart</button>
                {
                    Constants.VIEW_MORE === props.btn ? 
                    <a key={props.unique} href={'/product/details/'+props.unique}>
                        <button>{props.btn}</button>
                    </a> : 
                        <button onClick={handleButton}>{button}</button>
                }
                
                
            </div> */}
        </div>
    )
}

export default Product