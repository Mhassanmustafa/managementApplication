import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

const ViewOrder = () => {
  const [order, setOrder] = React.useState([]);

  const loadData = () => {
    //load product data from the date base from axios
    axios
      .get("/api/orders/getAllOrdersList")
      .then(res => {
        setOrder(res.data);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);
  const [state, setState] = React.useState({
    columns: [
      { title: "Order Id", field: "_id" },
      { title: "Customer Name", field: "Names[0].name" },
      { title: "Product Name", field: "orderList.name" },
      { title: "Unit Price", field: "orderList.unitPrice" },
      { title: "Quantity", field: "orderList.quantity", type: "numeric" },
      {
        title: "Total amount",
        field: "orderList.amount"
      },
      {
        title: "Date",
        field: "createdAt"
      }
    ],
    data: order
  });

  return (
    <div id="content">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">View Orders</h1>
      </div>
      <MaterialTable
        title="Orders Details"
        columns={state.columns}
        data={order}
      />
    </div>
  );
};

export default ViewOrder;
