import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import axios from "axios";
import MaterialTable from "material-table";
import axiosInstance from "./../../../utility/axiosInstance";

const UpdateStock = () => {
  const [product, setproduct] = React.useState([]);
  const [flag, setFlag] = React.useState();
  const [heading, setheading] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [quantity, setQuantity] = React.useState(0);
  const [description, setDescription] = React.useState("new stock is added");
  const [name, Setname] = React.useState();

  const headings = [
    { title: "Product Name", field: "name[0].name" },
    { title: "Quantity Available", field: "quantity[0].quantityAvailable" },
    { title: "Description", field: "quantity[0].description" },
    { title: "Date", field: "quantity[0].createdAt" }
  ];
  const loadTableData = () => {
    setheading(headings);
    //load product data from the date base from axios
    axios
      .get("/api/stocks/getAllStocks")
      .then(res => {
        setTableData(res.data);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };
  const loadData = () => {
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
    loadTableData();
  }, []);

  return (
    <div id="content">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Update Stocks</h1>
      </div>
      <br />
      <form>
        <div className="form-row">
          <div>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={product}
              getOptionLabel={option => option._id}
              style={{ width: 300 }}
              size="small"
              onChange={(event, value) => {
                if (value == null) {
                  console.log("flag");
                  alert("product name is required to update the stock");
                } else {
                  Setname(value);
                  console.log(name);
                }
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Product"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={e => {
                    Setname(e.target.value);
                    console.log(name);
                  }}
                />
              )}
            />
          </div>
          <div className="col-md-2">
            <TextField
              label="Quantity"
              variant="outlined"
              size="small"
              onChange={e => {
                if (!/^-?\d+\.?\d*$/.test(e.target.value)) {
                  setFlag(true);
                } else {
                  setFlag(false);
                  setQuantity(e.target.value);
                }
              }}
              required
              error={flag}
            />
          </div>
          <div className="col-md-2">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                let previousQuantity = 0;
                let newQuantity = 0;

                axios
                  .get("/api/stocks/getProductStock/" + name._id)
                  .then(result => {
                    previousQuantity = result.data;
                    newQuantity =
                      parseInt(quantity) + parseInt(previousQuantity);
                    let quantityAvailable = newQuantity;
                    axiosInstance
                      .put("/api/stocks/updateStocks/" + name._id, {
                        quantityAvailable,
                        description
                      })
                      .then(res => {
                        alert("data added successfully");
                      });
                  });
                window.location.reload(false);
              }}
            >
              Add new Stock
            </button>
          </div>
        </div>
      </form>
      <br />
      <MaterialTable title="Stock Details" columns={heading} data={tableData} />
    </div>
  );
};

export default UpdateStock;
