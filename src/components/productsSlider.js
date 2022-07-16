import React from "react"
import "../styles/ProductSlider.css";
import * as Constants from '../Helper/Constants'
import Product from "./Product";
import * as URL from '../Helper/endpoints'
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import axios from "axios";

function ProductSlider(props){

    const [sliderType , setSliderType] = React.useState(props.type);
    const [productList,setProductList] = React.useState([]);
    React.useEffect(() => {
        if(props.type === Constants.LATEST_PRODUCTS){
            populateLatestProducts();
        }else if(props.type === Constants.EXCLUSIVE_PRODUCTS){
            populateExclusivePRoducts();
        }
    },[]);

    const populateLatestProducts = async () => {
        let productResponse = await axios.get(URL.GET_PRODUCTS_LATEST)
        .catch(err => console.log(err));
        if(productResponse?.data?.responseWrapper != null && productResponse?.data?.responseWrapper?.length > 0){
            setProductList(productResponse.data.responseWrapper);
        }
    }

    const populateExclusivePRoducts = async () => {
        let productResponse = await axios.get(URL.GET_PRODUCTS_LIMIT_4).
        catch(err => console.log(err));
        if(productResponse?.data?.responseWrapper != null && productResponse?.data?.responseWrapper?.length > 0){
            setProductList(productResponse.data.responseWrapper);
        }
    }

    return(
        <>
            <div className="ProductSlider">
            {productList.map(product => {
                return(<Product 
                    image = {product.product_img1}
                    price = {product.product_real_price}
                    name={product.product_name}
                    unique={product.product_id}
                    btn={Constants.VIEW_MORE}
                />
            )})}
            </div>
        </>
    )
}

export default ProductSlider