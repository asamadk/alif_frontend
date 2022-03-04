import React from "react"
import "../styles/Success.css"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function Success(){
    return(
        <div className="Success">
            <ShoppingCartIcon/>
            <h1>Thank You !</h1>
            <p>Your order is confirmed, confirmation mail is set to your email</p>
            <button>Continue Shopping</button>
        </div>
    )
}

export default Success