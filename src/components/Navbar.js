import "../styles/Navbar.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import React, { useState } from "react";
import logo from "../assests/images/AlifLogo.png";
import Drawer from '@mui/material/Drawer';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as Constants from '../Helper/Constants';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import CallIcon from '@mui/icons-material/Call';
import InfoIcon from '@mui/icons-material/Info';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {

  const history = useHistory();

  const [logged,setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [showDetails,setShowDetails] = useState(false);
  const [leftDrawer, setLeftDrawer] = React.useState({
    left: false,
  });


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
    
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
        console.log('New Dimentions',getWindowDimensions());
      }
      window.addEventListener('resize',handleResize);
  }, [logged,open]);


  const logoutHandler = () => {
    localStorage.removeItem(Constants.TOKEN);
    window.location.replace('/login');
  }

  const handleLoginStatus = () => {
    setOpen(!open);
  }

  const handleMenuOpen = (value) => {
    setShowDetails(value);
    console.log(showDetails)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setLeftDrawer({ ...leftDrawer, [anchor]: open });
  };

  const handleDrawerNavigation = (index) => {
    handleMenuOpen(false);
    switch(index){
      case 0 : history.push('/home'); break;
      case 1 : history.push('/products');break;
      case 2 : history.push('/contact');break;
      case 3 : history.push('/about');break;
      case 4 : history.push('/wishlist');break;
      case 5 : history.push('/cart');break;
      case 6 : history.push('/profile');break;
      case 7 : history.push('/orders');break;
      case 8 : history.push('/address');break;
      case 9 : logoutHandler();break;
      case 10: history.push('/login');break;
      default: break;
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ width:  250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItemIcon></ListItemIcon>
        {['Home', 'Product', 'Contact Us', 'About','Wishlist', 'Cart', 'Profile', 'Orders', 'Address', 'Logout', 'Login'].map((text, index) => (
          <ListItem button onClick={() => handleDrawerNavigation(index)} key={text}>
            {index === 0 && <><ListItemIcon><HomeIcon/></ListItemIcon> <ListItemText primary={text} /></>}
            {index === 1 && <><ListItemIcon><CategoryIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 2 && <><ListItemIcon><CallIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 3 && <><ListItemIcon><InfoIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 4 && logged && <><ListItemIcon><FavoriteBorderIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 5 && logged && <><ListItemIcon><ShoppingBasketIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 6 && logged && <><ListItemIcon><AccountCircleIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 7 && logged && <><ListItemIcon><CheckCircleIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 8 && logged && <><ListItemIcon><AddLocationAltIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 9 && logged && <><ListItemIcon><LogoutIcon/></ListItemIcon><ListItemText primary={text} /></>}
            {index === 10 && !logged && <><ListItemIcon><LogoutIcon/></ListItemIcon><ListItemText primary={text} /></>}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
     <>
    <div class="navbar">
      <div className="navbar__logo">
        <Link to="/"><img src={logo} alt="" srcset="" /></Link>
      </div>

      <div className="navbar__links">
        {windowDimensions.width > 705 && <ul>
          <li><Link to="/home" >Home</Link></li>
          <li><Link to="/products">products</Link></li>
          <li><Link to="/contact">contact us</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>}
      </div>

      <div className="navbar__navOptions">
        {logged && windowDimensions.width > 705 &&  <Link to="/wishlist"><FavoriteBorderIcon /></Link>}
        {logged && windowDimensions.width > 705 && <Link to="/cart"><ShoppingBasketIcon /></Link>}
        {logged && windowDimensions.width > 705 && <div onClick={handleLoginStatus} className="navbar__user"><AccountCircleIcon /></div>}
          
        {open && logged &&
           <div className="user__dropdown">
              <Link to="/profile" onClick={handleLoginStatus}>Profile</Link>
              <Link to="/orders" onClick={handleLoginStatus}>Orders</Link>
              <Link to="/address" onClick={handleLoginStatus}>Address</Link>
              <Link to='' onClick={logoutHandler}>Logout</Link>
            </div>}
          {open && !logged && <div><Link to="/login">Login</Link></div>}
        </div>
      </div>
    
      {windowDimensions.width < 705 && ['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon style={{cursor: "pointer", left: 0, position : "absolute", marginLeft: "10px"}} onClick={handleMenuOpen}/>
          <Drawer anchor={anchor} open={showDetails} onClose={() => handleMenuOpen(false)}>
            <div className="appDrawerLogo"><Link to="/"><img src={logo} alt="" srcset="" /></Link></div>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}

export default Navbar;
