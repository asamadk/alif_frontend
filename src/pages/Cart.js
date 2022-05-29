import axios from "axios";
import React from "react";
import * as URL from "../Helper/endpoints";
import * as Utils from "../Helper/Utils";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import * as Constants from "../Helper/Constants";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

import "../styles/Cart.css";

function Cart() {
  const history = useHistory();

  const [logged, setLogged] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [cart, setCart] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("Something went wrong");
  const [userDetails, setUserDetails] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [rerender, setRerender] = React.useState(false);
  const [couponText, setcouponText] = React.useState("");
  const [productData, setProductData] = React.useState([]);
  const [productIDInfoMap, setproductIDInfoMap] = React.useState(null);
  const [deliveredBy, setDeliveredBy] = React.useState("");

  React.useEffect(() => {
    if (Utils.isLoggedIn === false) {
      history.push("/login");
      return;
    }
    updateDeliveredByDate();
    setLogin();
    getCart();
  }, [cart.couponUsed, rerender]);

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  const updateDeliveredByDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    setDeliveredBy(date.toDateString());
  };

  const setLogin = () => {
    setLoading(true);
    setLogged(true);
    setToken(localStorage.getItem(Constants.TOKEN));
  };

  const getCart = () => {
    axios
      .get(URL.GET_CART, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}`,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.errorMap !== null) {
          // setErro);
          // setErrorMsg(res.data.errorMap.error)
        } else {
          setError(false);
          let clearedProductData = clearProductDataObject(
            res.data.responseWrapper
          );
          setProductData(clearedProductData);
          populateProductWithInformation(
            res.data.responseWrapper[0],
            clearedProductData
          );
          if (
            cart.productModelList != null &&
            cart.productModelList.length <= 0
          ) {
            setLoading(false);
            history.push("/status", { code: Constants.CART_EMPTY });
          }
        }
      })
      .catch((err) => {
        let responseStatus = err?.response?.data?.responseCode;
        if (
          responseStatus != null &&
          responseStatus == Constants.NOT_FOUND_404
        ) {
          history.push("/status", { code: Constants.CART_EMPTY });
          setLoading(false);
        } else if (
          responseStatus != null &&
          responseStatus == Constants.SERVER_ERROR_500
        ) {
          history.push("/status", { code: responseStatus });
        } else if (
          responseStatus != null &&
          responseStatus == Constants.UNAUTHORIZED_401
        ) {
          history.push("/status", { code: responseStatus });
        }
      });
  };

  const getCurrentUser = () => {
    axios
      .get(URL.GET_USER, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}`,
        },
      })
      .then((res) => {
        if (
          res.data.responseCode == Constants.OK_200 &&
          res.data.responseWrapper.length > 0
        ) {
          setUserDetails(res.data.responseWrapper[0]);
        }
      })
      .catch((err) => {});
  };

  const clearProductDataObject = (data) => {
    const result = data.filter((prData) => {
      return prData.shoppingCartId === undefined;
    });
    return result;
  };

  const populateProductWithInformation = (cart, info) => {
    let productsList = cart?.productModelList;
    if (productsList == null || productsList.lenght < 1) return;
    const productIdVsInfoMap = new Map();
    let count = 0;
    info.forEach((inf) => {
      productIdVsInfoMap.set(inf.productModel?.product_id + "" + count, inf);
      count++;
    });
    setproductIDInfoMap(productIdVsInfoMap);
    for (let i = 0; i < productsList.length; i++) {
      let inf = productIdVsInfoMap.get(productsList[i]?.product_id + "" + i);
      if (inf == null) {
        continue;
      }
      let sizeJSON = JSON.parse(inf.sizeJSON);
      if (sizeJSON.custom == true) {
        productsList[i].size = "Custom size";
      } else {
        productsList[i].size = sizeJSON.genericsize;
      }
    }
    cart.productModelList = productsList;
    setCart(cart);
  };

  const handleDeleteFromCart = (product_id, index) => {
    let productKeyInfo = productIDInfoMap.get(product_id + "" + index);
    if (productKeyInfo === null) {
      setError(true);
      setErrorMsg("Something went wrong while deleting product.");
      window.scrollTo(0, 0);
      setTimeout(() => {
        setError(false);
      });
    }

    axios
      .delete(
        URL.DELETE_PRODUCT_FROM_CART +
          cart.shoppingCartId +
          "/" +
          product_id +
          "/" +
          productKeyInfo.userProductInfoId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}`,
          },
        }
      )
      .then((res) => {
        window.scrollTo(0, 0);
        if (res.data.responseCode === Constants.OK_200) {
          setShow(true);
          setErrorMsg("Product Deleted");
          setTimeout(() => {
            setShow(false);
          }, 1000);
          if (
            cart.productModelList != null &&
            cart.productModelList.length <= 0
          ) {
            history.push("/status", { code: Constants.CART_EMPTY });
          } else {
            setRerender(!rerender);
          }
        }
      })
      .catch((err) => {});
  };

  const handleChangeAddress = () => {
    history.push("address");
  };

  const handleDeleteCoupon = () => {
    setLoading(true);
    if (cart.shoppingCartId) {
      axios
        .delete(URL.DELETE_COUPON + cart.shoppingCartId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}`,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res.data.responseCode === Constants.OK_200) {
            setShow(true);
            setErrorMsg("Coupon Deleted");
            cart.couponUsed = false;
            setTimeout(() => {
              setShow(false);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAddToWishlist = (product_id) => {
    if (logged) {
      handleDeleteFromCart(product_id);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post(URL.ADD_USER_WISHLIST + product_id)
        .then((res) => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 1000);
          setErrorMsg("Product added to wishlist");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push("/login");
    }
  };

  const handleCreateOrder = () => {
    if (logged) {
      let couponName = "null";
      if (cart.couponsModel && cart.couponsModel.couponName) {
        couponName = cart.couponsModel.couponName;
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post(URL.CREATE_ORDER_FROM_CART + "/" + couponName)
        .then((res) => {
          setShow(true);
          if (
            res.data.errorMap == null &&
            res.data.responseWrapper.length > 0
          ) {
            history.push("/paymentOptions", {
              orderModel: res.data.responseWrapper[0],
            });
          }
          setTimeout(() => {
            setShow(false);
          }, 1000);
        })
        .catch((err) => {});
    } else {
      history.push("login");
    }
  };

  const handleAddCouponToCart = async () => {
    setLoading(true);
    if (logged === false) {
      history.push("/login");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let couponAddResponse = await axios
      .post(
        `${URL.ADD_COUPON_TO_CART}?couponName=${couponText}&cartId=${cart?.shoppingCartId}`
      )
      .catch((err) => {
        setLoading(false);
        let error = JSON.parse(JSON.stringify(err));
        if (error.status == Constants.NOT_FOUND_404) {
          setError(true);
          setErrorMsg("Cannot find any coupon with that name");
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      });
    setModalOpen(false);
    setLoading(false);
    if (couponAddResponse?.data?.responseCode == Constants.OK_200) {
      window.scrollTo(0, 0);
      if (
        couponAddResponse?.data?.responseDesc ===
        "You have already used this coupon"
      ) {
        setError(true);
        console.log("IN IF");
      } else {
        setRerender(!rerender);
        setShow(true);
      }
      setErrorMsg(couponAddResponse?.data?.responseDesc);
      setTimeout(() => {
        setShow(false);
        setError(false);
      }, 3000);
    }
  };

  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    display: "flex",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "3px",
  };

  const buttonCss = {
    marginLeft: "10px",
    color: "black",
    border: "1px #B8B8B8 solid",
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            value={couponText}
            onChange={(e) => {
              setcouponText(e.target.value);
            }}
            label="Enter coupon code"
            sx={{ width: "295px" }}
            id="outlined-basic"
            variant="outlined"
          />
          <LoadingButton
            style={buttonCss}
            loading={loading}
            variant="outlined"
            onClick={handleAddCouponToCart}
          >
            Apply
          </LoadingButton>
        </Box>
      </Modal>
      {loading && (
        <CircularProgress
          size={34}
          sx={{
            color: "#e60023",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 1 }}>
          {errorMsg}
        </Alert>
      </Collapse>
      <Collapse in={show}>
        <Alert severity="success" sx={{ mb: 1 }}>
          {errorMsg}
        </Alert>
      </Collapse>
      <Collapse in={cart.length > 0 && cart.productModelList.length === 0}>
        <Alert severity="info" sx={{ mb: 1 }}>
          {"Cart is empty"}
        </Alert>
      </Collapse>
      {cart.length !== 0 && (
        <div className="cart">
          <div className="cart__left">
            <div className="cart__address">
              <h5>
                Deliver to
                <span className="cart__user">
                  {userDetails.user_Fname
                    ? ` ${userDetails.user_Fname} ${userDetails.user_Lname} `
                    : ""}{" "}
                </span>
                <p className="cart__userAddr">
                  {userDetails.user_address1
                    ? userDetails.user_address1.substring(0, 66)
                    : ""}
                </p>
                <p className="cart__userAddr">
                  {userDetails.user_address2
                    ? userDetails.user_address2.substring(0, 66)
                    : ""}
                </p>
              </h5>
              <LoadingButton onClick={handleChangeAddress} variant="outlined">
                Change Address
              </LoadingButton>
            </div>
            <div className="cart__items">
              <h4>
                My Shopping Bag (
                {cart.length !== 0 ? cart.productModelList.length : 0} Item)
              </h4>
              {cart.length !== 0 &&
                cart.productModelList.map((ct, index) => {
                  return (
                    <div key={index} className="cart__itemsContainer">
                      <div className="cart__item">
                        <div className="cart__itemLeft">
                          <img src={ct.product_img1} alt="" />
                        </div>
                        <div key={index} className="cart__itemCenter">
                          <div className="cart__itemDescription">
                            <h3>{ct.product_name}</h3>
                            <p>
                              {JSON.parse(
                                ct.product_long_Desc
                              ).productQuote.substring(0, 50) + "..."}
                            </p>
                            <span className="cart__itemSize">
                              Size : <b>{ct.size}</b>{" "}
                            </span>
                            <span className="cart__itemQuantity">
                              Quantity : 1
                            </span>
                            <p>
                              Delivered by:{" "}
                              <span>
                                <b>{deliveredBy}</b>
                              </span>
                            </p>
                            <div className="cart__itemPrice">
                              <h4> {"₹ " + ct.product_real_price}</h4>
                              {/* <h6>49% off</h6> */}
                            </div>
                          </div>
                          {/* <Box>
                            <IconButton aria-label="delete" size="small">
                              <RemoveIcon fontSize="small"/>
                            </IconButton>
                            <input value={2} style={{width : '20px', textAlign : 'center'}}></input>
                            <IconButton aria-label="delete" size="small">
                              <AddIcon fontSize="small"/>
                            </IconButton>
                          </Box> */}
                          <div className="cart__itemButtons">
                            <LoadingButton
                              onClick={() =>
                                handleDeleteFromCart(ct.product_id, index)
                              }
                              loading={loading}
                              variant="outlined"
                            >
                              Remove
                            </LoadingButton>
                            <LoadingButton
                              onClick={() => {
                                handleAddToWishlist(ct.product_id);
                              }}
                              variant="outlined"
                            >
                              Move to wishlist
                            </LoadingButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="cart__right">
            {cart.couponUsed && (
              <div className="cart__couponDiscount">
                <p>{`Coupon ${
                  cart.couponsModel ? cart.couponsModel.couponName : ""
                } with discount of ${
                  cart.couponsModel ? cart.couponsModel.couponDiscount : ""
                }%`}</p>
                <a onClick={handleDeleteCoupon}>
                  <CancelIcon />
                </a>
              </div>
            )}
            {!cart.couponUsed && (
              <div className="cart__applyCoupan">
                <h4>Apply Coupons</h4>
                {/* <Link to={`/coupons/${cart.shoppingCartId}`}> */}
                {/* <button>Apply</button> */}
                <LoadingButton
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  variant="outlined"
                >
                  Apply
                </LoadingButton>
                {/* </Link> */}
              </div>
            )}
            <div className="divider"></div>
            <div className="cart__productDetails">
              <h4>Product Details</h4>
              <div className="cart__totalMRP">
                <h4>Total MRP</h4>
                <p>₹ {cart.totalAmountBeforeDiscount}</p>
              </div>
              <div className="cart__discountMRP">
                <h4>Discount on MRP</h4>
                <p>
                  ₹{" "}
                  {(cart.totalAmountBeforeDiscount - cart.total)
                    .toString()
                    .substring(0, 5)}
                </p>
              </div>
              <div className="cart__coupanDiscount">
                <h4>Coupon Discount</h4>
                <p>
                  {" "}
                  ₹{" "}
                  {cart.couponUsed
                    ? (cart.totalAmountBeforeDiscount - cart.total)
                        .toString()
                        .substring(0, 5)
                    : 0}
                </p>
              </div>
              <div className="cart__convinienceFee">
                <h4>Delivery Fee</h4>
                <p>Free</p>
              </div>
              <div className="divider"></div>
              <div className="cart__totalAmount">
                <h4>Total Amount</h4>
                <p>₹ {cart.total}</p>
              </div>
              <LoadingButton onClick={handleCreateOrder} variant="outlined">
                Place Order
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
