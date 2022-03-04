import "../styles/Hero.css";
import React from "react";

function Hero(props) {
  return (
    <div className="hero">
      <img src={props.image} alt="" />
      {/* TODO dynamic image slider implementation */}
    </div>
  );
}

export default Hero;
