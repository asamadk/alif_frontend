import React ,{useState,useEffect} from 'react';
import "../styles/ProductDetails.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as Constants from '../Helper/Constants'
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as URL from '../Helper/endpoints'


function ProductDetails(){
    let { id } = useParams();    
    const history = useHistory();    

    const [product,setProductDetails] = useState(null);
    const [show,setShow] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
    const [logged,setLogged] = useState(false);
    const [token,setToken] = useState('');
    const [addedToCart,setAddedToCart] = useState(false);

    console.log('Logged status',logged)
    useEffect(() => {
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
                    setErrorMsg('Product added to cart')
                }).catch(err => {
                    console.log(err); 
                })
        }else{
            history.push('/login');
        }
    }
    return (
        <div className="ProductDetails">
            <Collapse in={show}>
                <Alert severity="error">{errorMsg}</Alert>
            </Collapse>
            <Collapse in={addedToCart}>
                <Alert severity="success">{errorMsg}</Alert>
            </Collapse>
            <div className="ProductDetails__Product">
                <div className="image">
                <div className="ProductDetails__Image_Main">
                    <img src="https://picsum.photos/300/400" alt='' ></img>
                </div>
                <div className="ProductDetails__Image_Sec">
                    <img src="https://picsum.photos/200/200" alt=''></img>
                    <img src="https://picsum.photos/200/200" alt=''></img>
                    <img src="https://picsum.photos/200/200" alt=''></img>
                </div>
                </div>
                <div className="desc">
                <div className="ProductDetails__Description_S">
                    <h1>{product?.product_name}</h1>
                    {/* create get size options api */}
                    <h3>{'Rs '+product?.product_real_price}</h3>
                    <div className="ProductDetails__Description_S_size">
                        <button>S</button>
                        <button>M</button>
                        <button>L</button>
                    </div>
                    <div className="ProductDetails__Description_S_add">
                        <button onClick={handleCart}>Add to cart</button>
                        <button>Add to wishlist</button>
                    </div>
                    <a href="">Size chart</a>
                </div>  
                <div className="ProductDetails__Description_L">
                    <h3>Product Details</h3>
                    <p>{product?.product_long_Desc}</p>
                </div>
                </div>
                
            </div>
            <h3>Simillar products</h3>
           <div className="ProductDetails__Similar">
                {/* <h1>Simillar products</h1> */}
                <div className="ProductDetails__Similar_Products">
                    <img src="https://picsum.photos/300/400"></img>
                    <h2>$1200</h2>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <div className="addtocart">
                    <button>Add to Cart</button>
                    </div>
                </div>
                <div className="ProductDetails__Similar_Products">
                    <img src="https://picsum.photos/300/400"></img>
                    <h2>$1200</h2>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <div className="addtocart">
                    <button>Add to Cart</button>
                    </div>
                </div>
                <div className="ProductDetails__Similar_Products">
                    <img src="https://picsum.photos/300/400"></img>
                    <h2>$1200</h2>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <div className="addtocart">
                    <button>Add to Cart</button>
                    </div>
                </div>
                <div className="ProductDetails__Similar_Products">
                    <img src="https://picsum.photos/300/400"></img>
                    <h2>$1200</h2>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <div className="addtocart">
                    <button>Add to Cart</button>
                    </div>
                </div>
                <div className="ProductDetails__Similar_Products">
                    <img src="https://picsum.photos/300/400"></img>
                    <h2>$1200</h2>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <div className="addtocart">
                    <button>Add to Cart</button>
                    </div>
                </div>
                <div className="ProductDetails__Similar_Products">
                    <img src="https://picsum.photos/300/400"></img>
                    <h2>$1200</h2>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <div className="addtocart">
                    <button>Add to Cart</button>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ProductDetails