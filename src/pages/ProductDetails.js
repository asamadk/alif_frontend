import React ,{useState,useEffect} from 'react';
import "../styles/ProductDetails.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import * as URL from '../Helper/endpoints'
import Product from '../components/Product';


function ProductDetails(){
    let { id } = useParams();    
    const history = useHistory();    

    const [product,setProductDetails] = useState(null);
    const [show,setShow] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
    const [logged,setLogged] = useState(false);
    const [token,setToken] = useState('');
    const [addedToCart,setAddedToCart] = useState(false);
    const [loading,setLoading] = React.useState(false);


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
                    <div className='ProductDetails__size_container'>
                    <a href="">Create your size in just 30 seconds.</a>
                    <button>Get size</button>
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
                <div className='divider'></div>
                <div className='product_garantee'>
                    <h1>We Guarantee A Great Fit</h1>
                    <p>94% of customers love their fit the first time. Enjoy shopping risk free with our lifetime alterations, remakes or refunds until you’re completely satisfied.</p>
                </div>
                <div className="ProductDetails__Description_S_add">
                        <button onClick={handleCart}>Add to cart</button>
                        <button onClick={handleWishlist}>Add to wishlist</button>
                    </div>
                </div>
            </div>
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