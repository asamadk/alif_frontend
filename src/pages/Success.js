import React from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from "react-router-dom";
import "../styles/Success.css"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function Success(){
    const history = useHistory();

    const handleContineShoppingButton = () => {
        history.push('/home')
    }

    return(
        <div className="Success">
            <ShoppingCartIcon/>
            <h1>Thank You !</h1>
            <p>Your order is confirmed, confirmation mail is set to your email</p>
            <LoadingButton onClick={handleContineShoppingButton} variant="outlined">Continue Shopping</LoadingButton>
        </div>
    )
}

export default Success