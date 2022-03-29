import axios from "axios";
import React, { useState } from "react"
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import "../styles/Profile.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Profile(){

    let history = useHistory();

    const [logged,setLogged] = React.useState(false);
    const [token,setToken] = React.useState('');
    const [user,setUser] = React.useState({});
    const [loading,setLoading] = React.useState(false);
    const [isDisabled,setIsDisabled] = React.useState(true);
    const [name,setName] = React.useState('');
    const [contact,setContact] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [city,setCity] = React.useState('');
    const [lastName,setLastName] = React.useState('');
    const [rerender,setRerender] = React.useState(false);
    const [show,setShow] = React.useState(false);
    const [showchangePassword,setShowChangePassword] = React.useState(false);
    const [currentPassword,setCurrentPassword] = React.useState('');
    const [newPassword,setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errMesg,setErrMesg] = React.useState('');
    const [severity,setSeverity] = React.useState('error');

    React.useEffect(() => {
        setLoading(true);
        if(localStorage.getItem(Constants.TOKEN) != null){
            setLogged(true);
            setToken(localStorage.getItem(Constants.TOKEN));
          }

          axios.get(URL.GET_USER,{ headers: { Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}` } })
          .then(res => {
              setLoading(false);
            if(res.data.responseWrapper.length > 0){
                console.log(res.data.responseWrapper[0])
                setUser(res.data.responseWrapper[0]);
                setName(res.data.responseWrapper[0].user_Fname);
                setLastName(res.data.responseWrapper[0].user_Lname);
                setContact(res.data.responseWrapper[0].user_phone_number);
                setEmail(res.data.responseWrapper[0].email);
                setCity(res.data.responseWrapper[0].user_City);
            }
          }).catch(err => {
              
          })
    },[rerender])

    const handleEditPRofile = () => {
        if(isDisabled){
            setLoading(true);
            setIsDisabled(false);
            setTimeout(() => {
                setLoading(false);   
            },500);
        }else{
            setLoading(true);
            const data = {
                user_Fname : name,
                user_Lname : lastName,
                email : user.email,
                user_City : city,
                user_phone_number : contact,
                user_State : user.user_State,
                user_address1 : user.user_address1,
                user_address2 : user.user_address2,
                user_country : user.user_country,
                user_zip : user.user_zip
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.put(URL.UPDATE_CURRENT_USER+user.user_id,data)
        .then(res => {
            setRerender(true);
            setIsDisabled(!isDisabled);
            setLoading(false);
            setShow(true);
            setErrMesg('Successfully changed profile');
            setSeverity('success');
            setTimeout(() => {
                setShow(false);

            },1500);
        }).catch(err => {

        })
            console.log('SAve mode')
        }
    }

    const handleChangePassword = () => {
        if(showchangePassword){
            if(currentPassword === '' || newPassword === '' || confirmPassword === ''){
                setShow(true);
                setErrMesg('Please fill all the details');
                setSeverity('error');
                setTimeout(() => {
                    setShow(false);
                },2000)
            }else if(newPassword !== confirmPassword){
                setShow(true);
                setErrMesg('Password do not match');
                setSeverity('error');
                setTimeout(() => {
                    setShow(false);
                },2000)
            }else if(currentPassword === newPassword){
                setShow(true);
                setErrMesg('New password cannot be same as old password');
                setSeverity('error');
                setTimeout(() => {
                    setShow(false);
                },2000)
            }else{
                const passwordModel = {
                    currentPassword : currentPassword,
                    newPassword : newPassword
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                axios.post(URL.CHANGE_CURRENT_PASSWORD,passwordModel)
                .then(res => {
                    console.log('Password',res.data);
                    if(res.data.responseCode == Constants.OK_200){
                        setShow(true);
                        setErrMesg('Password changed succesfully, You will be redirected to login page!');
                        setSeverity('success');
                        setTimeout(() => {
                            setShow(false);
                        },2000);
                        setTimeout(() => {
                            localStorage.removeItem(Constants.TOKEN);
                            window.location.replace('/login');
                        },3000);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }else{
            setShowChangePassword(true);
        }
        
    }
    return(
        <div className="Profile">
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
                <Alert severity={severity}>{errMesg}</Alert>
            </Collapse>
            { showchangePassword ? 
                <>
                    <h1>Change Password</h1>
                    <br></br>
                    <label>Current password</label>
                    <input type="password" value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value)}}></input>
                    <label>New password</label>
                    <input type="password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}></input>
                    <label>Confirm New password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}></input>
                </>
            :
                <>
                    <h1>Profile</h1>
                    <label>First Name</label>
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} disabled={isDisabled}></input>
                    <label>Last Name</label>
                    <input value={lastName} onChange={(e)=>{setLastName(e.target.value)}} disabled={isDisabled}></input>
                    <label>Contact</label>
                    <input value={contact} onChange={(e)=>{setContact(e.target.value)}} disabled={isDisabled}></input>
                    <label>Email</label>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} disabled></input>
                    <label>City</label>
                    <input value={city} onChange={(e)=>{setCity(e.target.value)}} disabled={isDisabled}></input>
                </>
            }
            {
            showchangePassword ? 
            <button onClick={() => {setShowChangePassword(false)}}>Cancel</button> 
            : 
            <button onClick={handleEditPRofile}>{isDisabled ? 'Edit profile' : 'Save'}</button>
            }
            {
            isDisabled ? 
            <button onClick={handleChangePassword}>Change password</button> 
            : 
            <button onClick={() => setIsDisabled(true)}>Cancel</button>
            }

        </div>
    )
}

export default Profile