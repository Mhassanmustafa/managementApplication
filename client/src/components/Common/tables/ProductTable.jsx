import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const ProductTable = () => {
  const [heading, setheading] = React.useState([]);

  const [product, setproduct] = React.useState([]);
  const headings = [
    { title: "Name", field: "_id" },
    { title: "Sell Price", field: "prices[0].sellPrice" },
    { title: "Bought Price", field: "prices[0].boughtPrice" },
    { title: "Date", field: "prices[0].createdAt" }
  ];

  const loadData = () => {
    setheading(headings);
    //load product data from the date base from axios
    axios
      .get("/api/products/getAllProducts")
      .then(res => {
        setproduct(res.data);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <br />
      <MaterialTable title="Product Details" columns={heading} data={product} />
    </div>
  );
};

export default ProductTable;
