import "../styles/Category.css";

import React from "react";

function Category({ title, imageUrl, visitingUrl,unique }) {
  return (
    <div key = {unique} className="category">
      <a href={visitingUrl}>
        <img src={imageUrl} alt=""></img>
        <h2>{title}</h2>
      </a>
    </div>
  );
}

export default Category;
