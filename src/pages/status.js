import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as Constants from '../Helper/Constants'
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import "../styles/Status.css";

const Status = () => {
    const history = useHistory();
    const [statusCode,setStatusCode] = useState('');
    const [statusDesc,setStatusDesc] = useState('Something went wrong');
    const [buttonMssg, setButtonMssg] = useState('Home');


    React.useEffect(() => {
        const errorCode = history.location.state?.code;
        console.log("Status",errorCode);
        setStatusCode(errorCode);
        if(errorCode == Constants.NOT_FOUND_404){
            setStatusDesc(Constants.NOT_FOUND_404_WORD);
        }else if(errorCode == Constants.SERVER_ERROR_500){
            setStatusDesc(Constants.SERVER_ERROR_500_WORD);
        }else if(errorCode == Constants.UNAUTHORIZED_401){
            setStatusDesc(Constants.UNAUTHORIZED_401_WORD);
        }else if(errorCode === Constants.CART_EMPTY){
            setStatusCode('Cart is empty');
            setStatusDesc('There is nothing in your cart lets add some items');
            setButtonMssg('Add items from wishlist');
        }
    },[])

    const handleHomeClick = () => {
        if(buttonMssg === 'Home'){
            history.push('/home');
        }else if(buttonMssg === 'Add items from wishlist'){
            history.push('/wishlist');
        }
    }
    return(
        <div className="status-main-container">
            <div className="status-main-container-error-code">
                {/* <ErrorOutlineIcon/> */}
                <h1>{statusCode}</h1>
            </div>        
        <p>{statusDesc}</p>
        <div className="status-button-home">
        <LoadingButton onClick={handleHomeClick}>{buttonMssg}</LoadingButton>
        </div>
        </div>
    )
}

export default Status;