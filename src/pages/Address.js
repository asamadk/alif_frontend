import axios from 'axios';
import React from 'react';
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import "../styles/Address.css";

const Address = () => {

    const [logged,setLogged] = React.useState(false);
    const [token,setToken] = React.useState('');
    const [user,setUser] = React.useState({});
    const [address1,setAddress1] = React.useState('');
    const [address2,setAddress2] = React.useState('');
    const [city,setCity] = React.useState('');
    const [state,setState] = React.useState('');
    const [country,setCountry] = React.useState('');
    const [zip,setZip] = React.useState(0);
    const [loading,setLoading] = React.useState(false);
    const [show,setShow] = React.useState(false);
    const [rerender,setRerender] = React.useState(false);

    React.useEffect(() => {
        console.log('RERENDER');
        setLoading(true);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
          }

          axios.get(URL.GET_USER,{ headers: { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
          .then(res => {
              setLoading(false);
            if(res.data.responseWrapper.length > 0){
                setUser(res.data.responseWrapper[0]);
                setAddress1(res.data.responseWrapper[0].user_address1);
                setAddress2(res.data.responseWrapper[0].user_address2);
                setCity(res.data.responseWrapper[0].user_City);
                setState(res.data.responseWrapper[0].user_State);
                setCountry(res.data.responseWrapper[0].user_country);
                setZip(res.data.responseWrapper[0].user_zip);
            }
          }).catch(err => {
              
          })
          
    },[rerender])

    const handleChangeAddress = () => {
        setLoading(true);
        const data = {
            user_Fname : user.user_Fname,
            user_Lname : user.user_Lname,
            email : user.email,
            user_Password : user.user_Password,
            user_City : city,
            user_State : state,
            user_zip : zip,
            user_phone_number : user.user_phone_number,
            user_country : country,
            user_address1 : address1,
            user_address2 : address2
        }

        console.log('Address',user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.put(URL.UPDATE_CURRENT_USER+user.user_id,data)
        .then(res => {
            setRerender(true);
            console.log(res.data);
            setLoading(false);
            setShow(true);
            setTimeout(() => {
                setShow(false);

            },1500);
        }).catch(err => {

        })
    }

    return (
        <div className="Address">
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
        <Collapse in={show}>
                <Alert severity="success">Successfully changed address</Alert>
            </Collapse>
        {/* user.user_address1 */}
            <h1>Addresss</h1>
            <div className="Address__Container">
                <h3>{`${user.user_Fname} ${user.user_Lname}`}</h3>
                <label>Address 1</label>
                <input value={address1} onChange={(e) => {setAddress1(e.target.value)}}></input>
                <label>Address 2</label>
                <input value={address2} onChange={(e) => {setAddress2(e.target.value)}}></input>
                <label>City</label>
                <input value={city} onChange={(e) => {setCity(e.target.value)}}></input>
                <label>State</label>
                <input value={state} onChange={(e) => {setState(e.target.value)}}></input>
                <label>Country</label>
                <input value={country} onChange={(e) => {setCountry(e.target.value)}} ></input>
                <label>Pincode</label>
                <input value={zip} onChange={(e) => {setZip(e.target.value)}} ></input>
                {/* <input value={user.user_phone_number}></input> */}
                <button onClick={handleChangeAddress}>save</button>

            </div>
        </div>
    )
}

export default Address
