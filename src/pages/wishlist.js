import React, { useEffect,useState } from "react";
import "../styles/wishlist.css";
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import { useHistory } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Product from "../components/Product";
import "../styles/Shirts.css";

const Wishlist = () => {
  const [logged,setLogged] = React.useState(false);
  const [token,setToken] = React.useState('');
  const [categories,setCategories] = useState([]);
  const [loading,setLoading] = React.useState(false);
  const [products,setProducts] = useState([]);
  const [show,setShow] = useState(true);
  const [errorMsg,setErrorMsg] = useState('Wishlist is empty');
  const [wishlistId,setWishlistId] = useState(0);


  useEffect(() => {
    setLoading(true);
    if(localStorage.getItem(Constants.TOKEN) != null){
      setLogged(true);
      setToken(localStorage.getItem(Constants.TOKEN));
    }

    axios.get(URL.GET_USER_WISHLIST, { headers: { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
    .then(res => {
      setLoading(false);
      console.log(res.data.responseWrapper[0]);
      if(res.data.responseWrapper != null){
        if(res.data.responseWrapper[0].productModelList){
          setWishlistId(res.data.responseWrapper[0].wishlistId);
        setProducts(res.data.responseWrapper[0].productModelList)
        }
      }else{
        setProducts([])
      }
      setShow(false)
    }).catch(err => {
      console.log(err)
      
    })
  },[]);

  const sendDataToWIshList = (data) => {
    console.log('WIshlist Data',data);
    console.log('Products',products);
    setProducts(products.filter(product => {
      return product.product_id !== data;
    })); 
    console.log('Products',products);
  }

  return (
    <div className="wishlist">
      {sendDataToWIshList}
      {loading && (<CircularProgress size={34}
            sx={{
              color: '#e60023',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
      }}/>)}
      <h2>Wishlist</h2>
      <p>{products.length !== 0 ? products.length : 0} items</p>
      <div className="Product__Shirts__Container">
      {
          products.map(product => {
          return(
            <Product
            image = {product.product_img1}
            name={product.product_name} 
            btn={Constants.DELETE_FROM_WISHLIST}
            unique={product.product_id}
            price={product.product_real_price}
            wishlistId = {wishlistId}
            sendDataToWIshList = {sendDataToWIshList}
            />
            )
          })
        }
        </div>
    </div>
  );
}

export default Wishlist;
