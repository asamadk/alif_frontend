import React from "react"
import * as Constants from '../Helper/Constants'
import "../styles/Product.css"

function Product(props){
    //image,size will be dynamic
    return(
        <div key={props.unique} className="product">
            
            <img src="https://picsum.photos/300/400" alt=""></img>
            <h2>{'Rs '+props.price}</h2>
            <p>{props.name}</p>
            <div className="product__size">
            <button>M</button>
            <button>S</button>
            <button>L</button>
            </div>
            
            <div className="addtocart">
                <button>Add to Cart</button>
                {
                    Constants.VIEW_MORE === props.btn ? 
                    <a key={props.unique} href={'/product/details/'+props.unique}>
                        <button>{props.btn}</button>
                    </a> : 
                        <button>{props.btn}</button>
                }
                
            </div>
        </div>
    )
}

export default Product