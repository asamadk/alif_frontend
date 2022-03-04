import React from "react";
import Products from "../components/Product";
import "../styles/Sweatshirts.css";


const sweatshirt = () => {
  return (
    <div className="sweatshirt">
      <h1>sweatshirts</h1>
        <div className="Product__sweatshirt__Container">
          <Products btn="View More"/>
          <Products btn="View More"/>
          <Products btn="View More"/>
          <Products btn="View More"/>
          <Products btn="View More"/>
          <Products btn="View More"/>
        </div>
      <div className="sweatshirt_btn">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default sweatshirt;
