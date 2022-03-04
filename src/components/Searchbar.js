import "../styles/Searchbar.css";
import React, { useState } from "react";

function Searchbar() {
  const [input, setInput] = useState("");

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </div>
  );
}

export default Searchbar;
