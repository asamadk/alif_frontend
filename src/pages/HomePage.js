import "../styles/Homepage.css";
import Hero from "../components/Hero";
import React, { useState } from "react";
import ProductSlider from "../components/productsSlider";
import Category from "../components/Category";
import CircularProgress from '@mui/material/CircularProgress';
import * as Constants from '../Helper/Constants'
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as URL from '../Helper/endpoints'
import axios from "axios";

function HomePage() {

  const[categoryList,setcategoryList] = useState([]);
  const[showCategory,setShowCategory] = useState(false);
  const [catMessage,setCatMessage] = useState('');
  const [latestProductList,setlatestProductList] = useState([]);
  const [loading,setLoading] = React.useState(false);
  const [bannerImageIndex, setBannerImageIndex] = React.useState(0);

React.useEffect(() => {
  setLoading(true);
  axios.get(URL.CATEGORIES)
  .then((res) => {
    setLoading(false);
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


const handleBannerImageChangeNext = () => {
  if(bannerImageIndex === Constants.BANNER_IMAGES.length - 1){
    setBannerImageIndex(0)
  }else{
    setBannerImageIndex(bannerImageIndex+1);
  }
}



  return (
    <div className="home">
      {loading && (
          <CircularProgress
            size={34}
            sx={{
              color: '#e60023',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      <div className="home__hero">
        <Hero image={Constants.BANNER_IMAGES[bannerImageIndex]}/>
      </div>
      <div className="hero-image-next">
      <IconButton color="primary" aria-label="upload picture" component="label">
        <ArrowBackIosIcon/>
      </IconButton>
      <IconButton onClick={handleBannerImageChangeNext} color="primary" aria-label="upload picture" component="label">
        <ArrowForwardIosRoundedIcon />
      </IconButton>
      </div>
      {/* <h1>Categories</h1>

      <div className="categories">{
        categoryList.map(category => {
          return(
            
            <Category
              key={category.category_Id}
              unique={category.category_Id}
              title={category.category_Name}
              imageUrl={category.category_image}
              visitingUrl={"/category/products/"+category.category_Id}
            />
            
          )
        })
      }
      </div> */}
      <div className="home__products">
        <h1>New Arrivals</h1>
        <ProductSlider 
        type = {Constants.LATEST_PRODUCTS}
        />
      </div>

      <div className="home__hero">
        <Hero image="https://lh3.googleusercontent.com/d/1EGLiv9bQmFEvk1gMxYqLlSm6Z643tTgL=s1500?authuser=0"/>
      </div>

      <div className="home__products">
        <h1>Exclusive Products</h1>
        <ProductSlider 
        type = {Constants.EXCLUSIVE_PRODUCTS}
        />
      </div>

    </div>
  );
}

export default HomePage;
