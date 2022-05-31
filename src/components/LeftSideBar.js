import React from 'react'
import { Link } from "react-router-dom";

function LeftSideBar() {
  return (
    <div className="sidebar">
                <h1>Overview</h1>
                <div className='divider_small'></div>
                <h1>ORDERS</h1>
                <h1><Link to={'/orders'} >orders and return</Link></h1>
                <div className='divider_small'></div>
                <h1>CREDITS</h1>
                <h1>coupons</h1>
                <div className='divider_small'></div>
                <h1>ACCOUNT</h1>
                <h1><Link to={'/profile'} >Profile</Link></h1>
                <h1><Link to={'/address'} >Addresses</Link></h1>
                <h1><Link to={'/contact'} >Alif insider</Link></h1>
                </div>
  )
}

export default LeftSideBar