import axios from "axios";
import React, { useRef } from "react";
import * as URL from '../Helper/endpoints'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as Constants from '../Helper/Constants'
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';


import "../styles/Cart.css";
function Cart() {
  const history = useHistory();
      
  const [logged,setLogged] = React.useState(false);
  const [token,setToken] = React.useState('');
  const [cart,setCart] = React.useState([]);
  const [error,setError] = React.useState(false);
  const [show,setShow] = React.useState(false);
  const [errorMsg,setErrorMsg] = React.useState('Something went wrong');
  const [userDetails,setUserDetails] = React.useState({});
  const [loading,setLoading] = React.useState(false);
  const [rerender,setRerender] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    if(localStorage.getItem(Constants.TOKEN) != null){
      setLogged(true);
      setToken(localStorage.getItem(Constants.TOKEN));
    }
    axios.get(URL.GET_CART, { headers: { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
      .then(res => {
        setLoading(false);
        // if(res.data.responseWrapper.productModelList.length < 0){
        //   setError(true);
        //   setErrorMsg('Your cart is empty');
        // }
        if(res.data.errorMap !== null){
          // setErro);
          // setErrorMsg(res.data.errorMap.error)
        }else{
          setError(false)
          setCart(res.data.responseWrapper[0])
        }
      }).catch(err => {
        // setLoading(false);
        // setError(true);
        // console.log(err.response.data)
        let responseStatus = err.response.data.responseCode;
        if(responseStatus != null && responseStatus == Constants.NOT_FOUND_404){
            history.push('/status',{code : responseStatus})
        }else if(responseStatus != null && responseStatus == Constants.SERVER_ERROR_500){
          history.push('/status',{code : responseStatus})
        }else if(responseStatus != null && responseStatus == Constants.UNAUTHORIZED_401){
          history.push('/status',{code : responseStatus})
        }
      })

  }, [cart.couponUsed,rerender]);


  React.useEffect(() => {
    axios.get(URL.GET_USER,{ headers: { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
      .then((res) => {
          if(res.data.responseCode == Constants.OK_200 && res.data.responseWrapper.length > 0){
            setUserDetails(res.data.responseWrapper[0]);
          }
      }).catch(err => {})
      
  },[])

  const handleDeleteFromCart = (product_id) => {
    axios.delete(URL.DELETE_PRODUCT_FROM_CART+cart.shoppingCartId+'/'+product_id,{headers :{ Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
    .then(res => {
      if(res.data.responseCode === Constants.OK_200){
        setRerender(!rerender);
        setShow(true);
        setErrorMsg('Product Deleted')
        setTimeout(()=>{
          setShow(false);
        },1000);
      }
    }).catch(err => {

    })
  }

  const handleChangeAddress = () => {
    history.push('address')
  }

  const handleDeleteCoupon = () => {
    setLoading(true);
    if(cart.shoppingCartId){
      axios.delete(URL.DELETE_COUPON+cart.shoppingCartId,{headers : { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` }})
      .then(res => {
        setLoading(false)
        if(res.data.responseCode === Constants.OK_200){
          setShow(true);
          setErrorMsg('Coupon Deleted')
          cart.couponUsed = false;
          setTimeout(()=>{
            setShow(false);
          },1000);
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const handleAddToWishlist = (product_id) => {
    if(logged){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.post(URL.ADD_USER_WISHLIST+product_id)
      .then(res => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          },1000);
          setErrorMsg('Product added to wishlist');
      }).catch(err => {
          console.log(err);
      })
  }else{
      history.push('/login');
  }
  }

  const handleCreateOrder = () => {
    if(logged){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.post(URL.CREATE_ORDER_FROM_CART)
        .then(res => {
        setShow(true);
        if(res.data.errorMap == null && res.data.responseWrapper.length > 0){
          history.push('/paymentOptions',{orderModel : res.data.responseWrapper[0]});
          // setErrorMsg(res.data.responseDesc);
          // setRerender(!rerender);
        }
        setTimeout(() => {
          setShow(false);
        },1000);
      }).catch(err => {

      });
    }else{
      history.push('login');
    }
  }

  
  return (
    <>
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
    <Collapse in={error}>
          <Alert severity="error" sx={{ mb: 1 }}>{errorMsg}</Alert>
    </Collapse>
    <Collapse in={show}>
          <Alert severity="success" sx={{ mb: 1 }}>{errorMsg}</Alert>
    </Collapse>
    <Collapse in={cart.length > 0 && cart.productModelList.length === 0}>
          <Alert severity="info" sx={{ mb: 1 }}>{'Cart is empty'}</Alert>
    </Collapse> 
    {
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
              {userDetails.user_address1 ? userDetails.user_address1.substring(0,66) : ''}
            </p>
            <p className="cart__userAddr">
              {userDetails.user_address2 ? userDetails.user_address2.substring(0,66) : ''}
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
          <h4>My Shopping Bag ({ cart.length !== 0 ? cart.productModelList.length : 0} Item)</h4>
              {
                cart.length !== 0 ? cart.productModelList.map(ct => {
                  return(
                    <div key={ct.product_id} className="cart__itemsContainer">
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
                  <button onClick={() => {handleAddToWishlist(ct.product_id)}}>Move to Wishlist</button>
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
          { cart.couponUsed ? 
          <div className="cart__couponDiscount">
            <p>{`Coupon ${cart.couponsModel ? cart.couponsModel.couponName : ''} with discount of ${cart.couponsModel ? cart.couponsModel.couponDiscount : ''}%`}</p>
            <a onClick={handleDeleteCoupon}><CancelIcon/></a>
          </div> 
          :

          <div className="cart__applyCoupan">
            <h4>Apply Coupons</h4>
            <Link to={`/coupons/${cart.shoppingCartId}`}>
              <button>Apply</button>
            </Link>
          </div>
          }
        <div className="divider"></div>
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
            <h4>Coupon Discount</h4>
              <p> {cart.couponUsed ? cart.totalAmountBeforeDiscount - cart.total : 0}</p>
          </div>
          <div className="cart__convinienceFee">
            <h4>Convinience Fee</h4>
            <p>Free</p>
          </div>
          <div className="divider"></div>
          <div className="cart__totalAmount">
            <h4>Total Amount</h4>
            <p>Rs. {cart.total}</p>
          </div>
          <button onClick={handleCreateOrder}>Place Order</button>
        </div>
      </div>
    </div>
  }
    </>
  );
}

export default Cart;
