import "../styles/Searchbar.css";
import React, { useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import * as Constants from '../Helper/Constants';
import * as URL from '../Helper/endpoints'

function Searchbar() {
  const history = useHistory();
  const [input, setInput] = useState("");

console.log('Location',history.location)
  const handleSearch = (event) => {
    // setInput(event.target.value);
    if(event.key === 'Enter'){
      axios.get(URL.SEARCH_PRODUCT+input)
      .then(res => {
        if(res.status == Constants.OK_200){
          const searchName = input;
          setInput('');
          history.push('/products',{data : res.data,searchTerm : input});
        }
      }).catch(err => {
        setInput('');
        history.push('/status',{code : err.response.status})
      })
    }
  }

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={input}
        onChange={(e) => {setInput(e.target.value)}}
        onKeyPress={(event) => handleSearch(event)}
      />
    </div>
  );
}

export default Searchbar;
