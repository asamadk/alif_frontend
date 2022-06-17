// import React from "react";
import React ,{useState,useEffect} from 'react';
import * as Constants from '../Helper/Constants'
import Collapse from '@mui/material/Collapse';
import "../styles/Faq.css";

const About = () => {

  
  const [collapse,setCollapse] = useState(false);

  const handleExpandCollapse = (event) => {
    let id = event.target.id;
    if(id != null){
        console.log(id);
        Constants.PRODUCT_DROPDOWN.forEach(product => {
            if(id === product.id){
                product.collapse = !product.collapse;
            }
        })
    }
  }
  
  const handleCollpaseUncollapse = () => {
    setCollapse(!collapse);
  }

  return (
    <>
    <div>
      <h1>Faq page</h1>
    </div>
    <div className='product-dropdown' onClick={handleCollpaseUncollapse}>
                    {Constants.PRODUCT_DROPDOWN.map(collapsePro => {
                        return(
                        <div onClick={handleExpandCollapse} id={collapsePro.id} key={collapsePro.id} className='Faq_dropdown'>
                            <h1 id={collapsePro.id} >{collapsePro.heading}</h1>
                                <div id={collapsePro.id} className='Faq_icons'>{collapsePro.collapse ?  '+' : 'x'}</div>
                                {!collapsePro.collapse && 
                                <div id={collapsePro.id} className='Faq_collapsable'>
                                <p id={collapsePro.id}>{collapsePro.details}</p>
                                </div>}
                        </div>)})}
                </div>
  </>
  );
};

export default About;
