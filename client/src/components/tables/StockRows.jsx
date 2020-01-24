import React from "react";

const StockRows = props => {
  //adding a method here
  return (
    <tr>
      <th scope="row">{props.index}</th>
      <td scope="row">{props.Pname.name[0].name}</td>
      <td scope="row">{props.Pname.quantity[0].quantityAvailable}</td>
      <td scope="row">{props.Pname.quantity[0].description}</td>
      <td scope="row">{props.Pname.quantity[0].createdAt}</td>
    </tr>
  );
};

export default StockRows;
