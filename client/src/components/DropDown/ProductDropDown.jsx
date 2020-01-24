import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const ProductDropDown = props => {
  return (
    <Dropdown.Item
      onClick={e => {
        props.change(props.pName.name, props.pName._id);
      }}
    >
      {props.pName.name}
    </Dropdown.Item>
  );
};

export default ProductDropDown;
