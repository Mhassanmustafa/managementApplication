import React from "react";
import ProductTable from "../../Common/tables/ProductTable";
import axios from "axios";
import MaterialTable from "material-table";

const PriceHistory = () => {
  const [heading, setheading] = React.useState([]);

  const [product, setproduct] = React.useState([]);
  const headings = [
    { title: "Name", field: "name" },
    { title: "Sell Price", field: "prices.sellPrice" },
    { title: "Bought Price", field: "prices.boughtPrice" },
    { title: "Date", field: "prices.createdAt" }
  ];

  const loadData = () => {
    setheading(headings);
    //load product data from the date base from axios
    axios
      .get("/api/products/getPriceHistory")
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

export default PriceHistory;
