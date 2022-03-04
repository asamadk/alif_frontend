import axios from "axios";
import React, { useState,useEffect } from "react";
import Products from "../components/Product";
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import "../styles/Shirts.css";



const Men = () => {
  let { id } = useParams();

  const [categories,setCategories] = useState([]);
  const [products,setProducts] = useState([]);
  const [show,setShow] = useState(false);
  const [errorMsg,setErrorMsg] = useState('');
  const [selectedOption, setSelectedOption] = useState('Select Category');


  useEffect(() => {
    if(id != undefined || id != null){
      axios.get(URL.GET_PRODUCTS_BY_CATEGORY+id)
        .then(res => {
          setProducts(res.data.responseWrapper);
          if(res.data.responseWrapper.length === 0){
            setShow(true);
            setErrorMsg('No products found')
          }else{
            setShow(false);
          }
        })
    }
    axios.get(URL.CATEGORIES)
      .then(res => {
        setCategories(res.data.responseWrapper);
      }).catch(err => {
        console.log(err);
      })

      axios.get(URL.GET_PRODUCTS)
        .then(res => {
          setProducts(res.data.responseWrapper);
        }).catch(err => {
          console.log(err);
        })
  },[])
  

  const handleCategoryChange = (id) => {
    axios.get(URL.GET_PRODUCTS_BY_CATEGORY+id)
      .then(res => {
          setProducts(res.data.responseWrapper);
          if(res.data.responseWrapper.length === 0){
            setShow(true);
            setErrorMsg('No products found')
          }else{
            setShow(false);
          }
      }).catch(err => {
        setShow(true);
          setErrorMsg('Something went wrong');
      })
    setSelectedOption(id)
  }

  const handleReset = () => {
      axios.get(URL.GET_PRODUCTS)
        .then(res => {
          setProducts(res.data.responseWrapper);
          if(res.data.responseWrapper.length === 0){
            setShow(true);
            setErrorMsg('No products found')
          }else{
            setShow(false);
          }
        }).catch(err => {
          setShow(true);
          setErrorMsg('Something went wrong');
        })
  }

  return (
    <div className="Product_Shirts">
      <h1>Products</h1>
      <div>
        <Collapse in={show}>
          <Alert severity="error">{errorMsg}</Alert>
        </Collapse>
      </div>
      <select value={selectedOption} onChange={(e) => handleCategoryChange(e.target.value)} className="Product__Shirts__Select">
        <option disabled>Select Category</option>
        {
          categories.map(cat => (
              <option key={cat.category_Id} value={cat.category_Id} >{cat.category_Name}</option>
          )
          )}
      </select>
      <button className="resetButton" onClick={handleReset}>reset</button>
      <div className="Product__Shirts__Container">
        { products.map(product => {
          
          return(
            
            // <a 
            // key={product.product_id} 
            // href={'/product/details/'+product.product_id}
            // >
              <Products 
              name={product.product_name} 
              btn={Constants.VIEW_MORE}
              unique={product.product_id}
              price={product.product_real_price}
            />
            // </a>  
            
          )
        })
      }
      </div>
      <div className="shirts_btn">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default Men;
