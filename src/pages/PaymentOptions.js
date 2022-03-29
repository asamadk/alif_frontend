import React, { useRef } from "react";
import * as URL from '../Helper/endpoints'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import * as Constants from '../Helper/Constants'
import CircularProgress from '@mui/material/CircularProgress';
import { Prompt } from 'react-router'
import axios from "axios";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import { Link, useHistory } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';


import '../styles/PaymentOptions.css'


function PaymentOptions(){

    const cardNumber = useRef(null);
    const cvv = useRef(null);
    const expiryDate = useRef(null);
    const upi = useRef(null);

    const history = useHistory();

    const [orderModel,setOrderModel] = React.useState({});
    const [logged,setLogged] = React.useState(false);
    const [token,setToken] = React.useState('');
    const [error,setError] = React.useState(false);
    const [show,setShow] = React.useState(false);
    const [errorMsg,setErrorMsg] = React.useState('Something went wrong');
    const [loading,setLoading] = React.useState(false);
    const [paytmToken,setpaytmToken] = React.useState('');
    const [sevierity,setServierity] = React.useState('error');
    const [paymentOptionsList, setPaymentOptionsList] = React.useState([]);
    const [paymentOptionSelect , setpaymentOptionSelect ] = React.useState('');

    React.useEffect(() => {
        
        if(history.location.state?.orderModel == null){
            history.push('/status',{code : '404'});
        }else{
            setOrderModel(history.location.state?.orderModel);
        }

        setLoading(true);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
        }

          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(Constants.TOKEN)}`
          axios.post(URL.INIT_PAYMENT,history.location.state?.orderModel)
          .then(res => {
              if(res.data.responseWrapper && res.data.responseWrapper.length > 0){
                  let paymentData = JSON.parse(res.data.responseWrapper[0]);
                  if(paymentData != null && paymentData.body.resultInfo.resultStatus === 'S'){
                      let token = paymentData.body.txnToken;
                      setpaytmToken(token);
                      axios.post(URL.GET_PAYMENT_OPTIONS+token,history.location.state?.orderModel)
                      .then(response => {
                        console.log('Payment options ', response.data);
                        if(response.data.body != null && response.data.body.resultInfo.resultStatus == 'S' && response.data.body.merchantPayOption != null && response.data.body.merchantPayOption.paymentModes != null ){
                          setPaymentOptionsList(response.data.body.merchantPayOption.paymentModes);
                          console.log('Payment options 2', response.data);
                        }
                        setLoading(false);
                      }).catch(err => {
                        setLoading(false);
                      })
                  }
                  console.log(paymentData);
              }
          }).catch(err => {
            setLoading(false);
            console.log(err.response)
          })
    },[]);

    const handlePaymentSelection = () => {
        console.log('Payment Option ',paymentOptionSelect);
      if(paymentOptionSelect === Constants.NET_BANKING){
        setError(true);
        setTimeout(() => {
          setError(false);
        },5000);
        setErrorMsg('Currently we are not supporting Net Banking services');
        setServierity("info")
      }else if(paymentOptionSelect !== Constants.NET_BANKING && paymentOptionSelect !== Constants.PAYTM_BALANCE){
        setShow(true);
      }else if(paymentOptionSelect === Constants.PAYTM_BALANCE){
          handlePaymentProcessing();
      }
        //gettin mode here work on this
    }

    const handlePaymentProcessing = () => {
      setLoading(true);
      console.log('PAYMENT PROCESSING',paymentOptionSelect);
      let info = ''
      if(paymentOptionSelect === Constants.CREDIT_CARD_PAYMENT || paymentOptionSelect === Constants.DEBIT_CARD_PAYMENT){
        let date = expiryDate.current?.value;
        let splitDate =  date.split('-');
        date =  splitDate[1]+splitDate[0];
        info =  cardNumber.current?.value +'x'+cvv.current?.value+'x'+date
      }else if(paymentOptionSelect === Constants.UPI_PAYMENT){
        info = upi.current?.value;
      }else if(paymentOptionSelect === Constants.PAYTM_BALANCE){
        info = 'Balance'
      }
      console.log('INFO',info);
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(Constants.TOKEN)}`
      axios.post(URL.PROCESS_PAYMENT+paytmToken+`&info=${info}&mode=${paymentOptionSelect}`,orderModel)
      .then(res => {
        setLoading(false);
        console.log('PROCESSING RESPONSE',res.data)
        if(res.data.body.resultInfo.resultStatus === 'F'){
          setErrorMsg(res.data.body.resultInfo.resultMsg+', Please do not proceed you will be redirected to home page');
          setTimeout(() => {
            history.push('/home')
          },5000)
          setError(true);
          setTimeout(() => {
            setError(false);
          },3000);
          setServierity('error');

        }else if(res.data.body.resultInfo.resultStatus === 'S'){

        }
      }).catch(err => {
        // console.log('ERROR PROCESSING PAYMENT',err.response.data)
        setLoading(false);
      })


    }

    return(
        <div className="payment-mode-container">
          <Dialog onClose={() => {setShow(false)}} open={show}>
          <DialogTitle>Enter your details below</DialogTitle>
          {
            paymentOptionSelect === Constants.CREDIT_CARD_PAYMENT || paymentOptionSelect === Constants.DEBIT_CARD_PAYMENT ? 
            <div>
              <input className="dialog-detail-input" type="number" placeholder="card number" ref={cardNumber}></input>
              <input className="dialog-detail-input" type="text" placeholder="cvv" ref={cvv}></input>
              <input className="dialog-detail-input" type="month" placeholder="expiry date" ref={expiryDate} name="expiry date"></input>
            </div>
            
            : 
            <input className="dialog-detail-input" type="text" placeholder="UPI" ref={upi}></input>
          }
          <button className="dialog-detail-button" onClick={handlePaymentProcessing}>Proceed</button>
          </Dialog>
          
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

      <Prompt
        when={true}
        message='Payment under process, are you sure you want to leave?'
      />

        <Collapse in={error}>
            <Alert severity={sevierity} sx={{ mb: 1 }}>{errorMsg}</Alert>
        </Collapse>

        <h1>Select Payment Option</h1>
        {
          paymentOptionsList.map(payment => {
            return(
              <div className="payment-mode-list" key={payment.priority} >
                <p>{payment.displayName}</p>
                <input type="radio" id="html" name="fav_language" value={payment.paymentMode} onClick = {(e) => {setpaymentOptionSelect(e.target.value)}}></input>
              </div>
            )
          })
        }
          <div className="payment-mode-list">
                <p>Cash on delivery</p>
                <input type="radio" id="html" name="fav_language" value={'COD'} onClick = {(e) => {setpaymentOptionSelect(e.target.value)}}></input>
              </div>
        {
          paymentOptionsList.length > 0 ?
        <div className="payment-detais-class">
          <p>Amount to be paid : Rs {orderModel.price}</p>
          <button onClick={handlePaymentSelection}>Pay now</button> 
        </div> : ''
        }
        </div>
    );
}

export default PaymentOptions;