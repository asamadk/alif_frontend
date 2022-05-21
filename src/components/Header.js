import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import React, { useState } from "react";
import * as Constants from '../Helper/Constants';

const Header = () => {
 
  return (
    <div className="header">
      {/* <Topbar /> */}
      <Navbar />
      <Searchbar />
    </div>
  );
};

export default Header;
