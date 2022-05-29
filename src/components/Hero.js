import "../styles/Hero.css";

import React from "react";

function Hero(props) {
  return (
    <div style={{width : '100%'}} className="hero">
      <img src={props.image} alt="" />
    </div>
  );
}

export default Hero;
