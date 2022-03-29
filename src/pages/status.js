import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as Constants from '../Helper/Constants'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import "../styles/Status.css";

const Status = () => {
    const history = useHistory();
    const [statusCode,setStatusCode] = useState('');
    const [statusDesc,setStatusDesc] = useState('Something went wrong');


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
        }
    },[])

    const handleHomeClick = () => {
        history.push('/home');
    }
    return(
        <div className="status-main-container">
            <div className="status-main-container-error-code">
                <ErrorOutlineIcon/>
                <h1>{statusCode}</h1>
            </div>        
        <h1>{statusDesc}</h1>
        <div className="status-button-home">
        <button onClick={handleHomeClick}>Home</button>
        </div>
        </div>
    )
}

export default Status;