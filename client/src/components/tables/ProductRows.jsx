import React from "react";
import _ from "lodash";
import axios from "axios";
import axiosInstance from "./../../utility/axiosInstance";
const ProductsRows = props => {
  //get the sell price from the object array
  function getSellPrice() {
    let object = props.Pname.prices;
    let head = _.head(object);
    return head.sellPrice;
  }
  //get the bought price from the object array
  function getBoughtPrice() {
    let object = props.Pname.prices;
    let head = _.head(object);
    return head.boughtPrice;
  }
  //get the data from the object array
  function getDate() {
    let object = props.Pname.prices;
    let head = _.head(object);
    return head.createdAt;
  }
  const handleDelete = name => {
    axiosInstance.delete("/api/products/deleteProduct/" + name).then(res => {
      console.log("deleted");
      props.onDeleted(props.Pname._id);
    });
  };
  return (
    <tr>
      <th scope="row">{props.index}</th>
      <td scope="row">{props.Pname._id}</td>
      <td scope="row">{getSellPrice()}</td>
      <td scope="row">{getBoughtPrice()}</td>
      <td scope="row">{getDate()}</td>
      <button
        className=" d-flex justify-content-center btn btn-primary"
        style={{ marginTop: "5px" }}
        onClick={e => handleDelete(props.Pname._id)}
      >
        Remove Product
      </button>
    </tr>
  );
};

export default ProductsRows;
