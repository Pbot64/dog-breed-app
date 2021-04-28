import React from "react";

const Search = ({ inputValue, breedFilterOnChange }) => {
  return (
    <>
      <label htmlFor="search">Search by name</label>
      <input type="text" value={inputValue} onChange={breedFilterOnChange} />
    </>
  );
};

export { Search };
