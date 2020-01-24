import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const CustomerAccounts = () => {
  const [heading, setheading] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const headings = [
    { title: "Id", field: "_id" },
    { title: "Customer Name", field: "name" },
    { title: "phone Number", field: "phoneNo" },
    { title: "Email", field: "email" },
    { title: "Created at", field: "createdAt" }
  ];
  const loadTableData = () => {
    setheading(headings);
    //load product data from the date base from axios
    axios
      .get("/api/customers/getAllCustomers")
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
        <h1 className="h3 mb-0 text-gray-800">Customer Info</h1>
      </div>
      <MaterialTable title="Customer Info" columns={heading} data={tableData} />
    </div>
  );
};

export default CustomerAccounts;
