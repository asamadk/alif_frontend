import "../styles/Navbar.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import React, { useState } from "react";
import logo from "../assests/images/Vector.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import * as Constants from '../Helper/Constants';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {

  const history = useHistory();

  const [logged,setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  
  React.useEffect(() => {
    if(localStorage.getItem(Constants.TOKEN) != null){
        setLogged(true);
      }
  }, []);
  
  //reload every time we login
  const logoutHandler = () => {
    localStorage.removeItem(Constants.TOKEN);
    window.location.reload();
  }

  const handleLoginStatus = () => {
    setOpen(!open); 
  }

  return (
    <div class="navbar">
      {/* logo */}
      <div className="navbar__logo">
        <Link to="/">
          <img src={logo} alt="" srcset="" />
        </Link>
      </div>
      <div className="navbar__links">
        <ul>
        <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">products</Link>
          </li>
          {/* <li>
            <Link to="/sweatshirts">Sweatshirts</Link>
          </li> */}
          <li>
            <Link to="/accessories">Accessories</Link>
          </li>
          <li>
            <Link to="/contact">contact us</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>

      <div className="navbar__navOptions">
        {
          logged ?
        <Link to="/wishlist">
          <FavoriteBorderIcon />
        </Link> : 
        <Link to={'/login'}/>
        }
        {logged ?
        <Link to="/cart">
          <ShoppingBasketIcon />
        </Link> : 
        <Link to='/login'/>
        }
        <div onClick={handleLoginStatus} className="navbar__user">
          <AccountCircleIcon />
          {
           open ?  
           <div className="user__dropdown">
             {
               logged ?
              <div>
              <Link to="/profile">Profile</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/coupons">Coupons</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/address">Address</Link>
              <Link to='' onClick={logoutHandler}>Logout</Link>
              </div>  : 
              <div>
                <Link to="/login">Login</Link>
              </div>
             }
             
          </div>
           :
          <div></div>
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
