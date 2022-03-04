import axios from "axios";
import React, { useRef } from "react";
import * as URL from '../Helper/endpoints'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as Constants from '../Helper/Constants'
import { useHistory } from "react-router-dom";


import "../styles/Cart.css";
function Cart() {
  const history = useHistory();
      
  const [logged,setLogged] = React.useState(false);
  const [token,setToken] = React.useState('');
  const [cart,setCart] = React.useState([]);
  const [error,setError] = React.useState(false);
  const [productDelete,setProductDelete] = React.useState(false);
  const [errorMsg,setErrorMsg] = React.useState('Something went wrong');
  const [userDetails,setUserDetails] = React.useState({});
  const [showCoupon,setShowCoupon] = React.useState(false);

  const couponName = useRef('');

  React.useEffect(() => {

    if(localStorage.getItem(Constants.TOKEN) != null){
      setLogged(true);
      setToken(localStorage.getItem(Constants.TOKEN));
    }
    // console.log("TOKEN "+)
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(URL.GET_CART, { headers: { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
      .then(res => {
        
        if(res.data.errorMap !== null){
          // setErro);
          // setErrorMsg(res.data.errorMap.error)
        }else{
          setError(false)
          setCart(res.data.responseWrapper[0])
        }
      }).catch(err => {
        setError(true);
        setErrorMsg(err.error)
      })

  },[cart.productModelList])


  React.useEffect(() => {
    axios.get(URL.GET_USER,{ headers: { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
      .then((res) => {
        console.log(cart)
          console.log('User',res.data.responseWrapper[0])
          if(res.data.responseCode == Constants.OK_200 && res.data.responseWrapper.length > 0){
            setUserDetails(res.data.responseWrapper[0]);
          }
      }).catch(err => {

      })
      
  },[])

  const handleDeleteFromCart = (product_id) => {
    axios.delete(URL.DELETE_PRODUCT_FROM_CART+cart.shoppingCartId+'/'+product_id,{headers :{ Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
    .then(res => {
      console.log(res.data);
      console.log(res.data.responseCode);
      if(res.data.responseCode == Constants.OK_200){
        console.log('HERE')
        setProductDelete(true);
      }
    }).catch(err => {

    })
  }

  const handleChangeAddress = () => {
    history.push('profile')
  }


  const handleAddCouponToCart = () => {
    console.log(couponName.current.value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(Constants.TOKEN)}`
    axios.post(`${URL.ADD_COUPON_TO_CART}?couponName=${couponName.current.value}&cartId=${cart.shoppingCartId}`)
    .then(res => {
      console.log(res.data)
    }).catch(err => {

    })
  }

  
  return (
    <>
    <Collapse in={error}>
          <Alert severity="error" sx={{ mb: 1 }}>{errorMsg}</Alert>
    </Collapse>
    <Collapse in={productDelete}>
          <Alert severity="success" sx={{ mb: 1 }}>{'Product Deleted Successfully'}</Alert>
    </Collapse>
    <div className="cart">
      
      <div className="cart__left">
        <div className="cart__address">
          <h5>
            Deliver to
            <span className="cart__user"> 
            {
              userDetails.user_Fname ? 
              ` ${userDetails.user_Fname} ${userDetails.user_Lname} `: ''
            } </span>
            <p className="cart__userAddr">
              {userDetails.user_address1 ? userDetails.user_address1 : ''}
            </p>
          </h5>
          <button className="cart__btnChangeAddr" onClick={handleChangeAddress}>Change Address</button>
        </div>
        {/* <div className="cart__offers">
          <h5>Available Offers</h5>
          <p>
            10% Discount on RBL Bank Credit cards and Debit Cards on a minimum
            spend of 2500 TCA
          </p>
          <button className="cart__btnShowMoreOffers">Show more</button>
        </div> */}
        <div className="cart__items">
          <h4>My Shopping Bag ({cart.length != 0 ? cart.productModelList.length : 0} Item)</h4>
              
              {
                cart.length !== 0 ? cart.productModelList.map(ct => {
                  return(
                    <div className="cart__itemsContainer">
                    <div className="cart__item">
                    <div className="cart__itemLeft">
                      <img src="https://picsum.photos/150/250" alt="" />
                    </div>
                    <div key={ct.product_id} className="cart__itemCenter">
                      <div className="cart__itemDescription">
                      <h3>{ct.product_name}</h3>
                  <p>
                    {ct.product_small_Desc.substring(0,50)}
                  </p>
                  <span className="cart__itemSize">Size : S </span>
                  <span className="cart__itemQuantity">Quantity : 1</span>
                  <p>
                    Delivered by:{" "}
                    <span style={{ color: "black" }}>25 July</span>
                  </p>
                  <div className="cart__itemPrice">
                    <h4> {ct.product_real_price}</h4>
                    <h6>49% off</h6>
                  </div>
                </div>
                <div className="cart__itemButtons">
                  <button onClick={() => handleDeleteFromCart(ct.product_id)}>Remove</button>
                  <button>Move to Wishlist</button>
                </div>
              </div>
            </div>
              </div>
              )})
              : ''
            }
        </div>
      </div>
      <div className="cart__right">
        <div className="cart__applyCoupan">
          {showCoupon === true ? 
          <>
          <input ref={couponName} placeholder="Enter coupon name"></input>
          <button onClick={handleAddCouponToCart}>Apply</button>
          </> : 
          <>
          <h4>Apply Coupons</h4>
          <button onClick={() => {setShowCoupon(true)}}>Apply</button>
          </>}
        </div>
        <hr />
        <div className="cart__productDetails">
          <h4>Product Details</h4>
          <div className="cart__totalMRP">
            <h4>Total MRP</h4>
            <p>Rs. {cart.totalAmountBeforeDiscount}</p>
          </div>
          <div className="cart__discountMRP">
            <h4>Discount on MRP</h4>
            <p>Rs {cart.totalAmountBeforeDiscount - cart.total}</p>
          </div>
          <div className="cart__coupanDiscount">
            <h4>Coupan Discount</h4>
              <p> {cart.couponUsed ? cart.totalAmountBeforeDiscount - cart.total : 0}</p>
          </div>
          <div className="cart__convinienceFee">
            <h4>Convinience Fee</h4>
            <p>Free</p>
          </div>
          <hr />
          <div className="cart__totalAmount">
            <h4>Total Amount</h4>
            <p>Rs. {cart.total}</p>
          </div>
          <button>Place Order</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Cart;
