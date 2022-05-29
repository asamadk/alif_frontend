import React ,{useState,useEffect} from 'react';
import "../styles/ProductDetails.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import * as URL from '../Helper/endpoints'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import Product from '../components/Product';


function ProductDetails(){
    let { id } = useParams();    
    const history = useHistory();    

    const [product,setProductDetails] = useState(null);
    const [collapse,setCollapse] = useState(false);
    const [show,setShow] = useState(false);
    const [showDetails,setShowDetails] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
    const [logged,setLogged] = useState(false);
    const [token,setToken] = useState('');
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
          
        axios.get(URL.GET_SINGLE_PRODUCT+id)
            .then(res => {
                if(res.data.responseCode == Constants.OK_200 &&  res.data.responseWrapper != 0){
                    setProductDetails(res.data.responseWrapper[0]);
                    setShow(false);
                    setErrorMsg('');
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
            console.log('Token','Bearer '+token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            // { Headers: { Authorization: `Bearer ${token}`} 
            axios.post(URL.ADD_PRODUCT_TO_CART+id)
                .then(res => {
                    setAddedToCart(true);
                    setTimeout(() => {
                        setAddedToCart(false);
                    },1500);
                    setErrorMsg('Product added to cart')
                }).catch(err => {
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

    const handleMenuOpen = (value) => {
        setShowDetails(value)
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setLeftDrawer({ ...leftDrawer, [anchor]: open });
      };

      //chutiya hiba
    const list = (anchor) => (
        <Box
          sx={{ width:  600 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <h1>Your size</h1>
            {/* <div className='custom_size_nav'>
                <h3>I'm New</h3>
                <h3>I've Shopped Before</h3>
            </div> */}
            <div className='divider'></div> 
            <div className='product_elm_name'>
                <p>Select Body Type</p>
                
            </div>
            <div className='product_elm_images'>
                <div className='image_box'>
                    <img src='/Athletic.svg'></img>
                    <p>Athletic</p>
                </div>
                <div className='image_box'>
                    <img src='/Average.svg'></img>
                    <p>Slight Belly</p>
                </div>
                <div className='image_box'>
                    <img src='/Healthy.svg'></img>
                    <p>Significant Belly</p>
                </div>
            </div>
            <div className='product_elm_name'>
                <p>Select Shirt Size</p>
                
            </div>
            <div className="ProductDetails__Description_S_size_num">
                        <button>36</button>
                        <button>38</button>
                        <button>40</button>
                        <button>42</button>
                        <button>44</button>
            </div>
            <div className='product_elm_name'>
                <p>Select Shoulder Type</p>
                
            </div>
            <div className='product_elm_images'>
                <div className='image_box'>
                    <img src='/not-sloping.svg'></img>
                    <p>Average</p>
                </div>
                <div className='image_box'>
                    <img src='/sloping.svg'></img>
                    <p>Sloping</p>
                </div>
            </div>
            <div className='product_elm_name'>
                <p>Select Height</p>
                
            </div>
            <div className="ProductDetails__Description_S_size_num">
                        <button>36</button>
                        <button>38</button>
                        <button>40</button>
                        <button>42</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
                        <button>44</button>
            </div>
            <div className='product_elm_name'>
                <p>Select Preferred Fit</p>
                
            </div>
            <div className='product_elm_images'>
                <div className='image_box'>
                    <img src='/super-slim.svg'></img>
                    <p>Super Slim</p>
                </div>
                <div className='image_box'>
                    <img src='/structured.svg'></img>
                    <p>Structured</p>
                </div>
                <div className='image_box'>
                    <img src='/relaxed.svg'></img>
                    <p>Relaxed</p>
                </div>
            </div>
                <div className='submit_Button_custom_size'>
                    <button>Submit</button>
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
                <div className="ProductDetails__Image_Main">
                    <img src="https://picsum.photos/400/500" alt='' ></img>
                    <img src="https://picsum.photos/400/500" alt=''></img>
                    <img src="https://picsum.photos/400/500" alt=''></img>
                    <img src="https://picsum.photos/400/500" alt=''></img>
                </div>
                </div>
                <div className="desc">
                <div className="ProductDetails__Description_S">
                    <h1>{product?.product_name}</h1>
                    {/* create get size options api */}
                    <h3>{'Rs '+product?.product_real_price}</h3>
                    <div className='divider'></div>
                    <div className="ProductDetails__Description_S_size">
                        <button>S</button>
                        <button>M</button>
                        <button>L</button>
                    </div>
                    <div className="ProductDetails__Description_S_add">
                        <button onClick={handleCart}>Add to cart</button>
                        <button onClick={handleWishlist}>Add to wishlist</button>
                    </div>
                    <div className='ProductDetails__size_container'>
                    <a href="">Create your size in just 30 seconds.</a>
                    <button onClick={() => {handleMenuOpen(true)}} >Get size</button>
                    </div>
                    {/* <div className='divider'></div> */}

                    {/* <div className="ProductDetails__Description_S_add">
                        <button onClick={handleCart}>Add to cart</button>
                        <button onClick={handleWishlist}>Add to wishlist</button>
                    </div> */}
                </div>  
                {/* <div className="ProductDetails__Description_L">
                    <h3>Product Details</h3>
                    <p>{product?.product_long_Desc}</p>
                </div> */}
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
                    <div className='product-dropdown-sub-container'>
                        <h1>Product Description</h1>
                        <div className='product-dropdown-icon-container'>
                            <AddIcon/>
                        </div>
                    </div>
                    { collapse && <div className='product-dropdown-collapsable-container'>
                        <p>
                        Sourced from a mill known for its finesse and craftsmanship, this oxford fabric is strong and sturdy with a soft and rich feel. This customisable shirt is designed with a Spread collar, single convertible cuff and a French placket.
                        </p>
                    </div>}
                    <div className='product-dropdown-sub-container'>
                        <h1>Size & Fit</h1>
                        <div className='product-dropdown-icon-container'>
                            <AddIcon/>
                        </div>
                    </div>
                    { collapse && <div className='product-dropdown-collapsable-container'>
                        <p>
                        Sourced from a mill known for its finesse and craftsmanship, this oxford fabric is strong and sturdy with a soft and rich feel. This customisable shirt is designed with a Spread collar, single convertible cuff and a French placket.
                        </p>
                    </div>}
                    <div className='product-dropdown-sub-container'>
                        <h1>Alternates</h1>
                        <div className='product-dropdown-icon-container'>
                            <AddIcon/>
                        </div>
                    </div>
                    { collapse && <div className='product-dropdown-collapsable-container'>
                        <p>
                        Sourced from a mill known for its finesse and craftsmanship, this oxford fabric is strong and sturdy with a soft and rich feel. This customisable shirt is designed with a Spread collar, single convertible cuff and a French placket.
                        </p>
                    </div>}
                    <div className='product-dropdown-sub-container'>
                        <h1>Wash Care</h1>
                        <div className='product-dropdown-icon-container'>
                            <AddIcon/>
                        </div>
                    </div>
                    { collapse && <div className='product-dropdown-collapsable-container'>
                        <p>
                        Sourced from a mill known for its finesse and craftsmanship, this oxford fabric is strong and sturdy with a soft and rich feel. This customisable shirt is designed with a Spread collar, single convertible cuff and a French placket.
                        </p>
                    </div>}
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