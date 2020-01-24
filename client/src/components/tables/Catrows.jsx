import React from "react";
import axios from "axios";
import axiosInstance from "./../../utility/axiosInstance";

const Catrows = props => {
  const handleDelete = name => {
    axiosInstance.delete("/api/products/deleteCategory/" + name).then(res => {
      console.log("deleted");
      props.onDeleted(props.name.name);
    });
  };
  return (
    <tr>
      <th scope="row">{props.index}</th>
      <td>{props.name.name}</td>
      <div>
        <button
          className=" d-flex justify-content-center btn btn-primary"
          style={{ marginTop: "5px" }}
          onClick={e => handleDelete(props.name.name)}
        >
          Remove Category
        </button>
      </div>
    </tr>
  );
};

export default Catrows;
