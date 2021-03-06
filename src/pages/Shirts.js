import axios from "axios";
import React, { useState,useEffect } from "react";
import Products from "../components/Product";
import * as Constants from '../Helper/Constants'
import * as URL from '../Helper/endpoints'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
import "../styles/Shirts.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const Men = () => {
  let { id } = useParams();
  const history = useHistory();

  const [categories,setCategories] = useState([]);
  const [products,setProducts] = useState([]);
  const [show,setShow] = useState(false);
  const [errorMsg,setErrorMsg] = useState('');
  const [selectedOption, setSelectedOption] = useState('Select Category');
  const [loading,setLoading] = React.useState(false);
  const [searchedProduct,setSearchedProduct] = React.useState(false);
  const [searchTerm,setSearchTerm] = React.useState('');
  const [rerender,setRerender] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    if(id != undefined || id != null){
      axios.get(URL.GET_PRODUCTS_BY_CATEGORY+id)
        .then(res => {
          setLoading(false);
          setProducts(res.data.responseWrapper);
          if(res.data.responseWrapper.length === 0){
            setShow(true);
            setErrorMsg('No products found')
          }else{
            setShow(false);
          }
        })
        return;
    }
    axios.get(URL.CATEGORIES)
      .then(res => {
        setCategories(res.data.responseWrapper);
      }).catch(err => {
        console.log(err);
      })

      const productSearchData = history.location.state?.data;
      const searchTearm = history.location.state?.searchTerm;
      if(searchTearm != null){
        setSearchTerm(searchTearm);
      }
      if(productSearchData != null){
        // console.log('IN USE EFFECT',productSearchData);
        if(productSearchData.responseWrapper != null){
          setSearchedProduct(true);
          setLoading(false);
          setProducts(productSearchData.responseWrapper);
          setRerender(!rerender);
        }
      }else{
        axios.get(URL.GET_PRODUCTS)
        .then(res => {
          setLoading(false);
          setProducts(res.data.responseWrapper);
        }).catch(err => {
          console.log(err);
        })
      }
  },[rerender])
  

  const handleCategoryChange = (id) => {
    setLoading(true);
    axios.get(URL.GET_PRODUCTS_BY_CATEGORY+id)
      .then(res => {
        setLoading(false);
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
    setLoading(true);
    setSearchedProduct(false);
      axios.get(URL.GET_PRODUCTS)
        .then(res => {
          setLoading(false)
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
      <Collapse in={searchedProduct}>
          <Alert severity="success">{'Searched For '+searchTerm}</Alert>
        </Collapse>
      <div className="Product__Shirts__Container">
        { products.map(product => {
          return(
              <Products 
              name={product.product_name} 
              btn={Constants.VIEW_MORE}
              unique={product.product_id}
              price={product.product_real_price}
            />
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
