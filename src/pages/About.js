// import React from "react";
import React ,{useState,useEffect} from 'react';
import * as Constants from '../Helper/Constants'
import Collapsable from '../components/Collapsable'
import "../styles/Faq.css";

const About = () => {
  return (
    <>
    <div>
      <h1>FAQs</h1>
    </div>
    <div className='faq-main-container'>
        
        <div className='faq-sub-container'>
        {Constants.FAQs.map(f => {
          return(
            <Collapsable question ={f.question} answer = {f.answer}/>
        )})}
        </div>
      </div>
  </>
  );
};

export default About;
