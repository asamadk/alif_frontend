import "../styles/Homepage.css";
import Hero from "../components/Hero";
import React, { useState } from "react";
import ProductSlider from "../components/productsSlider";
import Category from "../components/Category";
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import axios from "axios";

function HomePage() {

  const[categoryList,setcategoryList] = useState([]);
  const[showCategory,setShowCategory] = useState(false);
  const [catMessage,setCatMessage] = useState('');

React.useEffect(() => {
  axios.get(URL.CATEGORIES)
  .then((res) => {
    setcategoryList(res.data.responseWrapper);
    if(res.data.responseCode == Constants.OK_200 &&  res.data.responseWrapper != 0){
      setcategoryList(res.data.responseWrapper);
      setShowCategory(false);
      setCatMessage('');
  }else if(res.data.responseCode != Constants.OK_200){
      setShowCategory(true);
      setCatMessage(res.data.responseDesc);
  }else{
      setShowCategory(true);
      setCatMessage('No product found');
  }
  }).catch(err => {
    setShowCategory(true);
    setCatMessage('No category found')
  })
},[])

  return (
    <div className="home">
      <div className="home__hero">
        <Hero image="https://picsum.photos/1800/1000"/>
      </div>
      <h1>Categories</h1>

      <div className="categories">{
        categoryList.map(category => {
          return(
            
            <Category
            key={category.category_Id}
              unique={category.category_Id}
              title={category.category_Name}
              imageUrl="https://picsum.photos/250/250"
              visitingUrl={"/category/products/"+category.category_Id}
            />
            
          )
        })
      }
{/*         
        <Category
          title="New Arrivals"
          imageUrl="https://picsum.photos/250/250"
          visitingUrl="https://www.google.com"
        />
        <Category
          title="Sweater"
          imageUrl="https://picsum.photos/250/250"
          visitingUrl="https://www.google.com"
        />
        <Category
          title="70% off products"
          imageUrl="https://picsum.photos/250/250"
          visitingUrl="https://www.google.com"
        />
        <Category
          title="sweatshirt"
          imageUrl="https://picsum.photos/250/250"
          visitingUrl="https://www.google.com"
        />
        <Category
          title="Printed Shirts"
          imageUrl="https://picsum.photos/250/250"
          visitingUrl="https://www.google.com"
        /> */}
      </div>
      <div className="home__products">
        <h1>Latest Products</h1>
        <ProductSlider />
      </div>

      <div className="home__hero">
        <Hero image="https://picsum.photos/800/300"/>
      </div>

      <div className="home__products">
        <h1>Exclusive Products</h1>
        <ProductSlider />
      </div>

    </div>
  );
}

export default HomePage;
