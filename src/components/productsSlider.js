import React from "react"
import "../styles/ProductSlider.css";
import Product from "./Product";

function ProductSlider(){
    return(
        <div className="ProductSlider">
            <Product btn="view more"/>
            <Product btn="view more"/>
            <Product btn="view more"/>
            <Product btn="view more"/>
            <Product btn="view more"/>


        </div>
    )
}

export default ProductSlider