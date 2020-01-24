import React from "react";

const CateNames = props => {
  const headr = props.head;
  return <th scope="col">{headr.name}</th>;
};

export default CateNames;
