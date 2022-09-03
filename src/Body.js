import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Products from "./pages/Shirts";
import Accessories from "./pages/Accessories";
import Sweatshirts from "./pages/Sweatshirts";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Wishlist from "./pages/wishlist";
import ProductDetails from "./pages/ProductDetails";
import Coupons from "./pages/Coupons";
import Success from "./pages/Success";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderMail from "./components/OrderMail";
import Address from "./pages/Address";
import * as Constants from './Helper/Constants';
import Logout from "./components/Logout";
import Status from "./pages/status";
import ResetPassword from "./pages/ResetPassword";
import PaymentOptions from "./pages/PaymentOptions";
import OrderDetails from "./pages/OrderDetail";
import TailorDetails from "./components/TailorDetails";

const Body = () => {
  return (
    <div class="body">
      <Switch>
        <Route exact path="/">
          {/* {localStorage.getItem(Constants.TOKEN) != null ? <HomePage /> : <Login/>} */}
          <HomePage/>
        </Route>
        <Route exact path="/alif_frontend">
          <HomePage/>
        </Route>
        <Route exact path="/home">
          <HomePage/>
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/status">
          <Status />
        </Route>
        <Route exact path="/reset">
          <ResetPassword/>
        </Route>
        <Route exact path="/paymentOptions">
          <PaymentOptions/>
        </Route>
        <Route exact path="/order/detail/:id">
          <OrderDetails/>
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/category/products/:id">
          <Products />
        </Route>
        <Route path="/accessories">
          <Accessories />
        </Route>
        <Route path="/sweatshirts">
          <Sweatshirts />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin/order/details/:orderid">
          <OrderMail/>
        </Route>
        <Route path="/admin/order/tailor/:orderid">
          <TailorDetails/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route exact path="/product/details/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/coupons/:cartId">
          <Coupons />
        </Route>
        <Route exact path="/coupons/">
          <Coupons />
        </Route>
        <Route exact path="/confirm">
          <Success />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/logout">
          <Logout  />
        </Route>
        <Route>
          <Address/>
        </Route>
      </Switch>
    </div>
  );
};

export default Body;
