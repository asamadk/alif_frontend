import axios from 'axios';
import React from 'react';
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
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

    const handleDropdownSelect = (event) => {
        let state = event.target.value
        if(state != null){
            console.log('state :: ', state);
            setState(state);
        }
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
                {/* <h3>{`${user.user_Fname} ${user.user_Lname}`}</h3> */}
                
                <InputLabel id="demo-simple-select-label">Address 1</InputLabel>
                <TextField value={address1} onChange={(e) => {setAddress1(e.target.value)}} sx={{width : '295px'}} id="outlined-basic" variant="outlined" />
                
                <InputLabel id="demo-simple-select-label">Address 2</InputLabel>
                <TextField value={address2} onChange={(e) => {setAddress2(e.target.value)}} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select value={city} onChange={(e) => {setCity(e.target.value)}} sx={{width : '295px'}} label="city" labelId="demo-simple-select-label" id="demo-simple-select">
                    {Constants.GEOGRAPHY.states.map(st => {
                        return(st.state === state && st.districts.map(district => {
                            return(<MenuItem value={district}>{district}</MenuItem>)
                        }))
                    })}
                </Select>

                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select value={state} onChange={(e) => {setState(e.target.value)}} sx={{width : '295px'}} labelId="demo-simple-select-label" id="demo-simple-select">
                    {Constants.GEOGRAPHY.states.map(state => {
                        return(<MenuItem value={state.state}>{state.state}</MenuItem>)
                    })}
                </Select>

                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <TextField value={country} onChange={(e) => {setCountry(e.target.value)}} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />

                <InputLabel id="demo-simple-select-label">Pincode</InputLabel>
                <TextField value={zip} onChange={(e) => {setZip(e.target.value)}} sx={{width : '295px'}} id="outlined-basic"  variant="outlined" />
                
                <LoadingButton
                onClick={handleChangeAddress}
                style={{color : 'black', border : '1px #B8B8B8 solid', marginTop : '10px'}} 
                loading = {loading} 
                loadingPosition="start" 
                startIcon={<SaveIcon />} 
                variant="outlined">
                    Save
                </LoadingButton>
            </div>
        </div>
    )
}

export default Address
