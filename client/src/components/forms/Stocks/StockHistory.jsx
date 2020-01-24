import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const StockHistory = () => {
  const [heading, setheading] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const headings = [
    { title: "Product Name", field: "name[0].name" },
    { title: "Quantity Available", field: "quantity.quantityAvailable" },
    { title: "Description", field: "quantity.description" },
    { title: "Date", field: "quantity.createdAt" }
  ];
  const loadTableData = () => {
    setheading(headings);
    //load product data from the date base from axios
    axios
      .get("/api/stocks/getAllStockHistory")
      .then(res => {
        setTableData(res.data);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };

  React.useEffect(() => {
    loadTableData();
  }, []);

  return (
    <div id="content">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Stock History</h1>
      </div>
      <br />
      <MaterialTable title="Stock History" columns={heading} data={tableData} />
    </div>
  );
};

export default StockHistory;
