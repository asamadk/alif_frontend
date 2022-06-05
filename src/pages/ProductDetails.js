import React ,{useState,useEffect} from 'react';
import "../styles/ProductDetails.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import * as URL from '../Helper/endpoints'
import LoadingButton from '@mui/lab/LoadingButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import Product from '../components/Product';


function ProductDetails(){
    let { id } = useParams();    
    const history = useHistory();    


    const [responseJSON,setresponseJSON] = useState({});
    const [cartButtonLoad, setcartButtonLoad] = useState(false);
    const [wishlistButtonLoad,setwishlistButtonLoad] = useState(false);
    const [product,setProductDetails] = useState(null);
    const [collapse,setCollapse] = useState(false);
    const [show,setShow] = useState(false);
    const [showDetails,setShowDetails] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
    const [logged,setLogged] = useState(false);
    const [token,setToken] = useState('');
    const [rerender,setRerender] = useState(false);
    const [addedToCart,setAddedToCart] = useState(false);
    const [loading,setLoading] = React.useState(false);
    const [leftDrawer, setLeftDrawer] = React.useState({
        left: false,
        right: false,
      });

    useEffect(() => {
        setLoading(true);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
          }
          window.addEventListener('resize',setRerender(!rerender));
        axios.get(URL.GET_SINGLE_PRODUCT+id)
            .then(res => {
                if(res.data.responseCode == Constants.OK_200 &&  res.data.responseWrapper != 0){
                    setProductDetails(res.data.responseWrapper[0]);
                    setShow(false);
                    setErrorMsg('');
                    console.log('Single product',res.data.responseWrapper[0])
                }else if(res.data.responseCode != Constants.OK_200){
                    setShow(true);
                    setErrorMsg(res.data.responseDesc);
                }else{
                    setShow(true);
                    setErrorMsg('No product found');
                }
                setLoading(false);
            }).catch(err => {
                setShow(true);
                setErrorMsg('No product found');
            })
    },[]);

    const handleCart = () => {
        if(logged){
            setcartButtonLoad(true);
            console.log('Token','Bearer '+token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            // { Headers: { Authorization: `Bearer ${token}`} 
            axios.post(URL.ADD_PRODUCT_TO_CART+id)
                .then(res => {
                    setAddedToCart(true);
                    setcartButtonLoad(false);
                    setTimeout(() => {
                        setAddedToCart(false);
                    },1500);
                    setErrorMsg('Product added to cart')
                }).catch(err => {
                    setcartButtonLoad(false);
                    console.log(err); 
                })
        }else{
            history.push('/login');
        }
    }

    const handleCollpaseUncollapse = () => {
        setCollapse(!collapse);
    }

    const handleWishlist = () => {
        if(logged){
            setwishlistButtonLoad(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.post(URL.ADD_USER_WISHLIST+id)
            .then(res => {
                setwishlistButtonLoad(false);
                setAddedToCart(true);
                setTimeout(() => {
                    setAddedToCart(false);
                },1500);
                setErrorMsg('Product added to wishlist');
            }).catch(err => {
                setwishlistButtonLoad(false);
                console.log(err);
            })
        }else{
            history.push('/login');
        }
    }

    const handlePopulateResponse = (event,type,id) => {

        if(type === 'bodyType'){
            responseJSON.custom = true;
            responseJSON.bodyType = event.target.id
            if(id != null){
                Constants.BODY_TYPE.forEach(type => {
                    if(id === type.id){
                        type.class = type.class + ' image_box-selected';
                    }else{
                        type.class = 'image_box';
                    }
                })
            }
        }else if(type === 'ncSize'){
            responseJSON.size = event.target.value;
            responseJSON.custom = false;
        }else if(type === 'shirtSize'){
            responseJSON.custom = true;
            responseJSON.shirtSize = id;
            if(id != null){
                Constants.SHIRT_SIZE.forEach(shirtSize => {
                    if(shirtSize.size == id){
                        shirtSize.class = 'highlight-cirlce';
                    }else{
                        shirtSize.class = 'unhighlight-cirlce';
                    }
                })
            }
        }else if(type === 'shoulder'){
            responseJSON.shoulder = event.target.id
            responseJSON.custom = true;
            if(id != null){
                Constants.SHOULDER_TYPE.forEach(shoulder => {
                    if(shoulder.id === id){
                        shoulder.class = shoulder.class + ' image_box-selected';
                    }else{
                        shoulder.class = 'image_box';
                    }
                })
            }
        }else if(type === 'height'){
            if(id === null)return;
            responseJSON.custom = true;
            responseJSON.height = id;
            Constants.HEIGHT.forEach(height => {
                if(height.value === id){
                    height.class = 'highlight-cirlce';
                }else{
                    height.class = 'unhighlight-cirlce';
                }
            })
        }else if(type === 'fit'){
            if(id === null)return;
            responseJSON.custom = true;
            responseJSON.preferredFit = id;
            Constants.PREFERRED_FIT.forEach(fit => {
                if(fit.id === id){
                    fit.class = fit.class + ' image_box-selected';
                }else{
                    fit.class = 'image_box';
                }
            })
            }
        else if(type === 'genericsize'){
            console.log('hiba fatima phateechar hai')
            if(id === null)return;
            responseJSON.custom = true;
            responseJSON.genericsize = id;
            Constants.GENERIC_SIZE.forEach(size => {
                if(size.id === id){
                    size.class = 'highlight-cirlce';
                }else{
                    size.class = 'unhighlight-cirlce';
                }
            })
        }
        console.log(responseJSON);
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }

    const handleMenuOpen = (value) => {
        console.log('WINDOW DIMENTIONS',getWindowDimensions());
        if(getWindowDimensions().width < 750){
            setShow(true);
            setErrorMsg('Please open the website in desktop or laptop to create custom size');
            setTimeout(() => {
                setShow(false);
            },5000)
            return;
        }
        setShowDetails(value)
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setLeftDrawer({ ...leftDrawer, [anchor]: open });
      };

    const handleExpandCollapse = (event) => {
        let id = event.target.id;
        if(id != null){
            console.log(id);
            Constants.PRODUCT_DROPDOWN.forEach(product => {
                if(id === product.id){
                    product.collapse = !product.collapse;
                }
            })
        }
    }


    const list = (anchor) => (
        <Box
          sx={{ width:  600 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <h1>Your size</h1>
            <div className='product_elm_name'>
                <p>Select Body Type</p>
                
            </div>
            <div className='product_elm_images'>
                {Constants.BODY_TYPE.map(body => {
                    return(
                        <div id={body.id} onClick={(event) => handlePopulateResponse(event,'bodyType',body.id)} className={body.class}>
                            <img id={body.id} src={body.img} alt={body.name}></img>
                            <p id={body.id}>{body.name}</p>
                        </div>        
                    )})
                }
            </div>
            <div className='product_elm_name'>
                <p>Select Shirt Size</p>
                
            </div>
            <div className="ProductDetails__Description_S_size_num">
                {Constants.SHIRT_SIZE.map(size => {
                    return(
                        // {size.class}
                    <button className={size.class} value={size.size} onClick={(event) => handlePopulateResponse(event,'shirtSize',size.size)} >
                        {size.size}
                    </button>)
                })}
            </div>
            <div className='product_elm_name'>
                <p>Select Shoulder Type</p>
                
            </div>
            <div className='product_elm_images'>
                {
                    Constants.SHOULDER_TYPE.map(shoulder => {
                        return(
                        <div id={shoulder.id} className={shoulder.class} onClick={(event) => handlePopulateResponse(event,'shoulder',shoulder.id)} >
                            <img id={shoulder.id} src={shoulder.img} alt={shoulder.name}></img>
                            <p id={shoulder.id} >{shoulder.name}</p>
                        </div>
                        )
                    })
                }
            </div>
            <div className='product_elm_name'>
                <p>Select Height</p>
                
            </div>
            <div className="ProductDetails__Description_S_size_num">
                {Constants.HEIGHT.map(height => {
                    return(
                    <button onClick={(event) => handlePopulateResponse(event,'height',height.value)} className={height.class} >
                        {height.value}
                    </button>
                    )
                })}
            </div>
            <div className='product_elm_name'>
                <p>Select Preferred Fit</p>
                
            </div>
            <div className='product_elm_images'>
                {Constants.PREFERRED_FIT.map(fit => {
                    return(
                        <div id={fit.id} className={fit.class} onClick={(event) => handlePopulateResponse(event,'fit',fit.id)} >
                            <img id={fit.id} src={fit.img}></img>
                            <p id={fit.id} >{fit.name}</p>
                        </div>            
                        )
                    })
                }
            </div>
                <div className='submit_Button_custom_size'>
                    {/* <button>Submit</button> */}
                    <LoadingButton variant="outlined">Submit</LoadingButton>
                </div>
          <List>
          </List>
        </Box>
      );

    return (
        <div className="ProductDetails">
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
            <Collapse in={show}>
                <Alert severity="error">{errorMsg}</Alert>
            </Collapse>
            <Collapse in={addedToCart}>
                <Alert severity="success">{errorMsg}</Alert>
            </Collapse>
            <div className="ProductDetails__Product">
                <div className="image">
                {window.innerWidth > 500 && 
                <div className="ProductDetails__Image_Main">
                    <img src="https://picsum.photos/400/500" alt='' ></img>
                    <img src="https://picsum.photos/400/500" alt=''></img> 
                    <img src="https://picsum.photos/400/500" alt=''></img>
                    <img src="https://picsum.photos/400/500" alt=''></img>
                </div>
                }
                {window.innerWidth < 500 && 
                <div className="ProductDetails__Image_Main">
                    <img src="https://picsum.photos/400/500" alt='' ></img>
                    {/* create function to side image */}
                </div>
                }
                <IconButton aria-label="add to shopping cart">
                        <ArrowBackIosNewOutlinedIcon/>
                </IconButton>
                <IconButton aria-label="add to shopping cart">
                        <ArrowForwardIosOutlinedIcon/>
                </IconButton>
                
                </div>
                <div className="desc">
                <div className="ProductDetails__Description_S">
                    <h1>{product?.product_name}</h1>
                    <h3>{'Rs '+product?.product_real_price}</h3>
                    <div className='divider'></div>
                    <div className="ProductDetails__Description_S_size">
                    {Constants.GENERIC_SIZE.map(gsize => {
                    return(
                        // {size.class}
                    <button className={gsize.class} value={gsize.size} onClick={(event) => handlePopulateResponse(event,'genericsize',gsize.size)} >
                        {gsize.size}
                    </button>)
                    })}
                    </div>
                    <div className="ProductDetails__Description_S_add">
                        <LoadingButton onClick={handleCart} loading={cartButtonLoad} variant="outlined">
                            Add to Cart
                        </LoadingButton>
                        <LoadingButton onClick={handleWishlist} loading={wishlistButtonLoad} variant="outlined">
                            Add to wishlist
                        </LoadingButton>
                    </div>
                    <div className='ProductDetails__size_container'>
                    <a>Create your size in just 30 seconds.</a>
                    <LoadingButton onClick={() => {handleMenuOpen(true)}} variant="outlined">
                            Get size
                    </LoadingButton>
                    </div>
                </div>  
                <div className='checks'>
                    {Constants.checkMarks.map(checkMark => {return(<li>{checkMark.bullet}</li>)})}
                </div>
                <div className='about_product'>
                    <h1>Nothing spells sophistication better than this luxurious white shirt.</h1>
                </div>
                {/* <div className='divider'></div> */}
                <div className='composition_all_container'>
                    <div className='composition_sub_container'>
                        <label>Composition</label>
                        <p>100% Egyptian Cotton</p>
                    </div>
                    <div className='composition_sub_container'>
                        <label>Weave</label>
                        <p>oxford</p>
                    </div>
                    <div className='composition_sub_container'>
                        <label>mill</label>
                        <p>100% Egyptian Cotton</p>
                    </div>
                    <div className='composition_sub_container'>
                        <label>Streach</label>
                        <p>100% Egyptian Cotton</p>
                    </div>
                    <div className='composition_sub_container'>
                        <label>Fabric Shine</label>
                        <p>100% Egyptian Cotton</p>
                    </div>
                </div>
                <div className='product-dropdown' onClick={handleCollpaseUncollapse}>
                    {Constants.PRODUCT_DROPDOWN.map(collapsePro => {
                        return(
                        <div onClick={handleExpandCollapse} id={collapsePro.id} key={collapsePro.id} className='product-dropdown-sub-container'>
                            <h1 id={collapsePro.id} >{collapsePro.heading}</h1>
                                <div id={collapsePro.id} className='product-dropdown-icon-container'>{collapsePro.collapse ?  '+' : 'x'}</div>
                                {!collapsePro.collapse && 
                                <div id={collapsePro.id} className='product-dropdown-collapsable-container'>
                                <p id={collapsePro.id}>{collapsePro.details}</p>
                                </div>}
                        </div>)})}
                </div>
                <div className='product_garantee'>
                    <h1>We Guarantee A Great Fit</h1>
                    <p>94% of customers love their fit the first time. Enjoy shopping risk free with our lifetime alterations, remakes or refunds until you’re completely satisfied.</p>
                </div>
                
                </div>
            </div>
            {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
                <Drawer anchor={anchor} open={showDetails} onClose={() => handleMenuOpen(false)}>
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
            ))}

            <h3>Similar products</h3>
           <div className="ProductDetails__Similar">
                <Product
                name={'Name'} 
                btn={Constants.VIEW_MORE}
                unique={'AFS'}
                price={'PRice'}
                />
                <Product
                name={'Name'} 
                btn={Constants.VIEW_MORE}
                unique={'AFS'}
                price={'PRice'}
                />
                <Product
                name={'Name'} 
                btn={Constants.VIEW_MORE}
                unique={'AFS'}
                price={'PRice'}
                />
                <Product
                name={'Name'} 
                btn={Constants.VIEW_MORE}
                unique={'AFS'}
                price={'PRice'}
                />
                <Product
                name={'Name'} 
                btn={Constants.VIEW_MORE}
                unique={'AFS'}
                price={'PRice'}
                />
                <Product
                name={'Name'} 
                btn={Constants.VIEW_MORE}
                unique={'AFS'}
                price={'PRice'}
                />
           </div>
        </div>
    )
}

export default ProductDetails