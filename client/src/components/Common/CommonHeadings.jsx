import React from "react";
import Product from "../Popups/Product";

const headings = props => {
  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">{props.name}</h1>
      <Product />
    </div>
  );
};

export default headings;
