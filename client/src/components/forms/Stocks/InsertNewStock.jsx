import React from "react";
import Popup from "reactjs-popup";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import StockRows from "../../tables/StockRows";
import axiosInstance from "./../../../utility/axiosInstance";
const InsertNewStock = () => {
  const [product, setproduct] = React.useState([]);
  const [name, Setname] = React.useState("");
  const [flag, setFlag] = React.useState();
  const [quantity, SetQuantity] = React.useState(0);
  const [desciption, setDesciption] = React.useState(
    "new Stock added in data base"
  );
  const [tableData, setTableData] = React.useState([]);

  const [heading, setheading] = React.useState([]);
  let header = [
    { name: "Sr.no" },
    { name: "Product Name" },
    { name: "Quantity available" },
    { name: "Desciption" },
    { name: "Date" }
  ];

  const loadData = () => {
    setheading(header);
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

  const loadTableData = () => {
    axios
      .get("/api/products/getAllProducts")
      .then(res => {
        setproduct(res.data);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };

  const handleaddNewStock = () => {
    let description = desciption;
    axiosInstance
      .post("/api/stocks/insertNewStock", {
        name,
        quantity,
        description
      })
      .then(res => {
        console.log("data inserted successfully");
        alert("data added in data base");
      })
      .catch(e => {
        alert(
          "the stock is available of this product please update the existing stock "
        );
      });
  };
  React.useEffect(() => {
    loadData();
    loadTableData();
  }, []);
  return (
    <div id="content">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Add new Stock</h1>
        <div>
          <Popup
            trigger={
              <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50" /> Insert New
                Stock
              </button>
            }
            modal
          >
            {close => (
              <div className="pop">
                <a className="close1" onClick={close}>
                  &times;
                </a>
                <div className="header1">
                  <h1 className="h3 mb-0 text-gray-800">Insert New Stock</h1>
                </div>
                <div className="content1">
                  <br />
                  <form>
                    <div style={{ paddingRight: "10px" }}>
                      <Autocomplete
                        id="combo-box-demo"
                        options={product}
                        getOptionLabel={option => option._id}
                        size="small"
                        onChange={(event, value) => {
                          if (value == null) {
                            console.log("flag");
                            alert(
                              "product name is required to update the stock"
                            );
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
                            required
                          />
                        )}
                      />
                    </div>

                    <div className="" style={{ paddingTop: "7px" }}>
                      <TextField
                        label="New Quantity"
                        variant="outlined"
                        //value={phoneno}
                        // onChange={e => {
                        //   setphoneno(e.target.value);
                        // }}
                        onChange={e => {
                          let quant;
                          if (!/^-?\d+\.?\d*$/.test(e.target.value)) {
                            setFlag(true);
                            quant = 0;
                          } else {
                            setFlag(false);
                            SetQuantity(e.target.value);
                            quant = e.target.value;
                            console.log(!quant);
                            if (quant.length <= 0) {
                              SetQuantity(0);
                            }
                          }
                        }}
                        size="small"
                        error={flag}
                      />
                    </div>

                    <div className="" style={{ paddingTop: "7px" }}>
                      <TextField
                        label="Discription"
                        variant="outlined"
                        onChange={e => {
                          if (e.target.value.length <= 0) {
                            setDesciption("new Stock added in data base");
                          } else {
                            setDesciption(e.target.value);
                          }
                        }}
                        fullWidth
                        size="small"
                      />
                    </div>
                  </form>
                </div>
                <div className="actions1">
                  <button
                    className="button1 btn btn-primary"
                    onClick={() => {
                      close();
                      handleaddNewStock();
                      window.location.reload(false);
                    }}
                  >
                    Add new Stock
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>

      <div>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              {heading.map((data, index) => {
                return <th scope="col">{data.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <StockRows key={index} index={(index = index + 1)} Pname={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsertNewStock;
