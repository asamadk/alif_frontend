import React, { useEffect } from "react";
import "../styles/wishlist.css";

function wishlist() {

  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      <p>6 items</p>
      <div className="wishlist_row">
        <div className="wishlist_col">
          <img src="https://picsum.photos/300/400"></img>
          <h2>$1200</h2>
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <div className="addtocart">
            <button>Add to Cart</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="wishlist_col">
          <img src="https://picsum.photos/300/400"></img>
          <h2>$1200</h2>
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <div className="wishlistcart">
            <button>Add to Cart</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="wishlist_col">
          <img src="https://picsum.photos/300/400"></img>
          <h2>$1200</h2>
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <div className="addtocart">
            <button>Add to Cart</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="wishlist_col">
          <img src="https://picsum.photos/300/400"></img>
          <h2>$1200</h2>
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <div className="addtocart">
            <button>Add to Cart</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="wishlist_col">
          <img src="https://picsum.photos/300/400"></img>
          <h2>$1200</h2>
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <div className="addtocart">
            <button>Add to Cart</button>
            <button>Delete</button>
          </div>
        </div>
        <div className="wishlist_col">
          <img src="https://picsum.photos/300/400"></img>
          <h2>$1200</h2>
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <div className="addtocart">
            <button>Add to Cart</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default wishlist;
