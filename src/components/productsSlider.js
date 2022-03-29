import React from "react"
import "../styles/ProductSlider.css";
import * as Constants from '../Helper/Constants'
import Product from "./Product";
import * as URL from '../Helper/endpoints'
import axios from "axios";

function ProductSlider(props){

    const [sliderType , setSliderType] = React.useState(props.type);
    const [productList,setProductList] = React.useState([]);
    React.useEffect(() => {
        if(props.type === Constants.LATEST_PRODUCTS){
            axios.get(URL.GET_PRODUCTS_LATEST)
            .then((res) => {
                if(res.data.responseWrapper != null && res.data.responseWrapper.length > 0){
                console.log('PRODUCT ',res.data.responseWrapper);
                setProductList(res.data.responseWrapper);
            }}).catch(err => console.log(err));
        }else if(props.type === Constants.EXCLUSIVE_PRODUCTS){
            axios.get(URL.GET_PRODUCTS_LIMIT_4)
            .then((res) => {
                if(res.data.responseWrapper != null && res.data.responseWrapper.length > 0){
                console.log('PRODUCT ',res.data.responseWrapper);
                setProductList(res.data.responseWrapper);
            }}).catch(err => console.log(err));
        }
    },[]);
    console.log('HERE',productList)
    return(
        <div className="ProductSlider">
            {
                productList.map(product => {
                    return(
                        <Product 
                        price = {product.product_real_price}
                        name={product.product_name}
                        unique={product.product_id}
                        btn={Constants.VIEW_MORE}
                        />
                    )
                })
            }
            {/* <Product btn={Constants.VIEW_MORE}/>
            <Product btn="view more"/>
            <Product btn="view more"/>
            <Product btn="view more"/>
            <Product btn="view more"/> */}


        </div>
    )
}

export default ProductSlider