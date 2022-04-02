import "../styles/Navbar.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import React, { useState } from "react";
import logo from "../assests/images/Vector.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import * as Constants from '../Helper/Constants';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {

  const history = useHistory();

  const [logged,setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [showDetails,setShowDetails] = useState(false);


  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  React.useEffect(() => {
    if(localStorage.getItem(Constants.TOKEN) != null){
        setLogged(true);
      }
      console.log('Dimention',getWindowDimensions());
      //reload every time we login
    
    
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
        console.log('New Dimentions',getWindowDimensions());
      }
      window.addEventListener('resize',handleResize);
  }, [logged,open]);

  const logoutHandler = () => {
    localStorage.removeItem(Constants.TOKEN);
    window.location.replace('/login');
    // history.push('/login')
  }

  const handleLoginStatus = () => {
    setOpen(!open);
  }

  const handleMenuOpen = () => {
    console.log('OPEN');
    setShowDetails(!showDetails);
  }

  return (
     <>
    <div class="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src={logo} alt="" srcset="" />
        </Link>
      </div>
      <div className="navbar__links">
        {
          windowDimensions.width > 600 ?
        <ul>
        <li>
            <Link to="/home" >Home</Link>
          </li>
          <li>
            <Link to="/products">products</Link>
          </li>
          <li>
            <Link to="/contact">contact us</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        :
        ''
        }
      </div>

      <div className="navbar__navOptions">
        {
          windowDimensions.width < 600 ? 
          <MenuIcon style={{cursor: "pointer", left: 0, position : "absolute", marginLeft: "10px"}} onClick={handleMenuOpen}/> : ''
        }
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
        {
          showDetails ? 
      <div className="settings-detail-dialog">
        <ul>
        <li>
            <Link to="/home" onClick={handleMenuOpen}>Home</Link>
          </li>
          <li>
            <Link to="/products" onClick={handleMenuOpen}>products</Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleMenuOpen}>contact us</Link>
          </li>
          <li>
            <Link to="/about" onClick={handleMenuOpen}>About</Link>
          </li>
        </ul>
      </div> : ''
        }
    </div>
    </>
  );
}

export default Navbar;
