import React from "react";
import ProductTable from "../../Common/tables/ProductTable";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import axios from "axios";
import axiosInstance from "./../../../utility/axiosInstance";

const UpdatePurchasePrice = () => {
  const [product, setproduct] = React.useState([]);
  const [flag, setFlag] = React.useState(""); //eror flag if user enter the alphabets in number field
  const [boughtPrice, setNewPrice] = React.useState("");

  const [pname, setpname] = React.useState("");

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
  }, []);

  //get the price of the product by its name by axios request
  const updateSellPrice = name => {
    if (name === undefined || boughtPrice.length <= 0) {
      alert(
        "there is no prouct of this name is present please try again or price field is empty"
      );
    } else {
      axiosInstance
        .put("/api/products/updatePurchasePrices/" + name, {
          boughtPrice
        })
        .then(result => {
          alert("prices updated successfully");
        })
        .catch(e => {
          alert("there is no prouct of this name is present please try again");
        });
    }
  };

  return (
    <div>
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
              onChange={(event, value) => setpname(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Product"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={e => {
                    setpname(e.target.value);
                  }}
                />
              )}
            />
          </div>
          <div className="col-md-2">
            <TextField
              label="New Puchase Price"
              variant="outlined"
              size="small"
              onChange={e => {
                if (!/^-?\d+\.?\d*$/.test(e.target.value)) {
                  setFlag(true);
                } else {
                  setFlag(false);
                  setNewPrice(e.target.value);
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
                updateSellPrice(pname._id);
                window.location.reload(false);
              }}
            >
              Update price
            </button>
          </div>
        </div>
      </form>

      <ProductTable />
    </div>
  );
};

export default UpdatePurchasePrice;
