import "../styles/Hero.css";

import React from "react";

function Hero(props) {
  return (
    <div className="hero">
      <img src={props.image} alt="" />
    </div>
  );
}

export default Hero;
