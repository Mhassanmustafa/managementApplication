import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import axios from "axios";
import MaterialTable from "material-table";
import Popup from "reactjs-popup";
import axiosInstance from "./../../../utility/axiosInstance";

const NewInvoice = () => {
  const [product, setproduct] = React.useState([]);
  const [price, SetPrice] = React.useState("");
  const [flag, setFlag] = React.useState(""); //eror flag if user enter the alphabets in number field
  const [disflag, setdisFlag] = React.useState(""); //eror flag if user enter the alphabets in number field
  const [quantity, setQuantity] = React.useState();
  const [totalAmount, setTotalAmount] = React.useState();
  const [phoneno, setphoneno] = React.useState("");
  const [custName, setCustname] = React.useState();
  const [Subtotal, setSubtotal] = React.useState();
  const [tempData, SetTempData] = React.useState([]);
  const [productName, setProductName] = React.useState("");
  const [netAmount, setNetAmount] = React.useState();
  const [discount, setDiscount] = React.useState(0);
  const [aflag, setaFlag] = React.useState();
  const [debiti, setDebit] = React.useState();

  const loadData = () => {
    //load product data from the date base from axios
    axios
      .get("/api/products/getAllProducts")
      .then(res => {
        let data = JSON.parse(localStorage.getItem("CustomerInfo"));
        if (data == null) {
          console.log("flag");
        } else {
          setCustname(data.name);
          setphoneno(data.phoneno);
        }
        setproduct(res.data);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };
  const loadTableData = () => {
    //load product data from the date base from axios
    axios
      .get("/api/temps/getAlltemp")
      .then(res => {
        SetTempData(res.data);
        let data = res.data;
        let sub = 0;
        for (let i = 0; i < data.length; i++) {
          sub = sub + data[i].amount;
        }
        setSubtotal(sub);
        setNetAmount(sub);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };

  React.useEffect(() => {
    loadTableData();
    loadData();
  }, []);

  const additemps = () => {
    let name = productName._id;
    let unitPrice = price;
    let amount = totalAmount;
    axiosInstance
      .post("/api/temps/newTemp", {
        name,
        unitPrice,
        quantity,
        amount
      })
      .then(res => {
        // alert("added");
        console.log(res.data);
      })
      .catch(e => {
        console.log("eror");
        alert("product is already present please change the name");
      });
  };

  const handleDeletedEvent = name => {
    loadData();
  };

  const handlePrintevent = () => {};
  const addnewCustomerinDatabase = () => {
    let name = custName;
    console.log(name);
    let phoneNo = phoneno;
    axiosInstance
      .post("/api/customers/addNewCustomer", {
        name,
        phoneNo
      })
      .then(res => {
        // alert("added");
        console.log("data inserted");
        //  localStorage.removeItem("CustomerInfo");
        setaFlag(true);
      })
      .catch(e => {
        console.log("eror");
        console.log(e);
        //here icn manage  to get a customer from t he data base
      });
  };

  const insertOrder = () => {
    let name1 = custName;

    axiosInstance
      .post("/api/orders/addNewOrder", {
        name1
      })
      .then(res => {
        console.log("order data inserted");
        console.log(res);
        if (res.data == "Order successfully inserted") {
          for (let i = 0; i < tempData.length; i++) {
            let object = {
              name: tempData[i].name,
              unitPrice: tempData[i].unitPrice,
              quantity: tempData[i].quantity,
              amount: tempData[i].amount
            };
            axiosInstance
              .put("/api/orders/updateCusomerOrder/" + custName, {
                object
              })
              .then(result => {
                let currentQuantity = 0;
                let newQuantity = 0;
                console.log("i am here");
                axios
                  .get("/api/stocks/getProductStock/" + tempData[i].name)
                  .then(result => {
                    currentQuantity = result.data;
                    newQuantity = currentQuantity - tempData[i].quantity;
                    console.log(newQuantity);
                    let quantityobject = {};
                    axiosInstance
                      .put("/api/stocks/updateStocks/" + tempData[i].name, {
                        quantityAvailable: newQuantity,
                        description: "quantity sell and remaining quantity"
                      })
                      .then(result => {
                        console.log("come here");
                        console.log("quantity updated successfully");
                      });
                  });
              });
          }
        }
      })
      .catch(e => {
        console.log("eror");
        console.log(e);
        //here icn manage  to get a customer from t he data base
      });
  };

  const insertLedgerData = value => {
    let name = custName;
    let credit = netAmount;
    let debit = value;
    let balance = debit - credit - discount;
    console.log(balance);
    console.log(debit);

    let description = "customer bill added";
    axiosInstance
      .post("/api/ledgers/insertNewLedger", {
        name,
        credit,
        debit,
        balance,
        description
      })
      .then(result => {
        //console.log("data inserted success fully");
        console.log(result);
        if (result.data == "ledger successfully inserted") {
        }
      });
  };

  const getTempDeleted = () => {
    console.log("flag is here");
    axiosInstance.delete("/api/temps/alltemp").then(result => {
      console.log(result.data);
    });
  };

  const [state, setState] = React.useState({
    columns: [
      { title: "Product Name", field: "name" },
      { title: "Unit Price", field: "unitPrice" },
      { title: "Quantity", field: "quantity", type: "numeric" },
      {
        title: "Total amount",
        field: "amount"
      }
    ],
    data: tempData
  });
  return (
    <div id="content">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create New Invoice</h1>
      </div>
      <form className="container">
        <div
          className="row justify-content-end"
          style={{ marginBottom: "9px" }}
        >
          <div className="col-md-3">
            <TextField
              label="Customer Name"
              variant="outlined"
              style={{ width: 250 }}
              size="small"
              value={custName}
              onChange={e => {
                setCustname(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <div
          className="row justify-content-end"
          style={{ marginBottom: "10px" }}
        >
          <div className="col-md-3">
            <TextField
              label="Phone no"
              variant="outlined"
              style={{ width: 250 }}
              value={phoneno}
              onChange={e => {
                setphoneno(e.target.value);
              }}
              size="small"
            />
          </div>
        </div>

        <div className="row ">
          <div style={{ paddingRight: "10px" }}>
            <Autocomplete
              id="combo-box-demo"
              options={product}
              getOptionLabel={option => option._id}
              style={{ width: 300 }}
              size="small"
              onChange={(event, value) => {
                if (value == null) {
                  console.log("flag");
                } else {
                  setProductName(value);

                  SetPrice(value.prices[0].sellPrice);
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
                    setProductName("");
                    SetPrice(0);
                  }}
                  required
                />
              )}
            />
          </div>
          <div style={{ paddingRight: "10px" }}>
            <TextField
              label="Price"
              variant="outlined"
              size="small"
              style={{ width: "120px" }}
              value={price}
              disabled={true}
            />
          </div>

          <div style={{ paddingRight: "10px" }}>
            <TextField
              label="Quantity"
              variant="outlined"
              size="small"
              style={{ width: "120px" }}
              onChange={e => {
                let quant;
                if (!/^-?\d+\.?\d*$/.test(e.target.value)) {
                  setFlag(true);
                  quant = 0;
                } else {
                  setFlag(false);
                  setQuantity(e.target.value);
                  quant = e.target.value;
                  console.log(!quant);
                  if (quant.length <= 0) {
                    quant = 0;
                  }
                }
                let amount = price * quant;
                setTotalAmount(amount);
              }}
              error={flag}
              required
            />
          </div>
          <div style={{ paddingRight: "10px" }}>
            <TextField
              label=""
              variant="outlined"
              size="small"
              style={{ width: "160px" }}
              value={totalAmount}
              disabled={true}
            />
          </div>
          <div style={{ paddingRight: "10px" }}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                if (productName.length <= 0 || quantity == null) {
                  alert("product name and quantity required");
                } else {
                  additemps();
                  let info = { name: custName, phoneno: phoneno };
                  localStorage.setItem("CustomerInfo", JSON.stringify(info));
                  addnewCustomerinDatabase();
                  window.location.reload(false);
                }
              }}
            >
              <i class="fas fa-plus"> Add</i>
            </button>
          </div>
        </div>
      </form>
      <br />

      <MaterialTable
        title="Products"
        columns={state.columns}
        data={tempData}
        editable={{
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                axiosInstance
                  .delete("/api/temps/temp/" + oldData.name)
                  .then(res => {
                    window.location.reload(false);
                  })
                  .catch(e => {
                    console.log("Sever is not listenning");
                  });
              }, 600);
            })
        }}
      />
      <br />
      <form>
        <div
          className="row justify-content-end"
          style={{ paddingRight: "30px" }}
        >
          <div className="">
            <label id="invoiceLable">Subtotal</label>
            <TextField
              label=""
              variant="outlined"
              style={{ width: 250 }}
              size="small"
              disabled={true}
              value={Subtotal}
            />
          </div>
        </div>
        {/* to be continue from here */}
        <div
          className="row justify-content-end"
          style={{ paddingRight: "30px" }}
        >
          <div className="" style={{ paddingTop: "12px" }}>
            <TextField
              label="Discount"
              variant="outlined"
              style={{ width: 250 }}
              onChange={e => {
                let quant;
                if (!/^-?\d+\.?\d*$/.test(e.target.value)) {
                  setdisFlag(true);
                  quant = 0;
                } else {
                  setdisFlag(false);
                  setDiscount(e.target.value);
                  quant = e.target.value;
                  console.log(!quant);
                  if (quant.length <= 0) {
                    quant = 0;
                  }
                }
                let amount = Subtotal - quant;
                setNetAmount(amount);
              }}
              error={disflag}
              size="small"
            />
          </div>
        </div>
        <div
          className="row justify-content-end"
          style={{ paddingRight: "30px" }}
        >
          <div className="" style={{ paddingTop: "12px" }}>
            <label id="invoiceLable">Net Amount</label>
            <TextField
              label=""
              variant="outlined"
              style={{ width: 250 }}
              size="small"
              value={netAmount}
              disabled={true}
            />
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ paddingRight: "30px" }}
        >
          <div className="" style={{ paddingTop: "15px" }}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                let value = prompt("enter value");
                console.log(value);
                setDebit(value);

                // addnewCustomerinDatabase();
                insertOrder();
                insertLedgerData(value);
                getTempDeleted();
                localStorage.removeItem("CustomerInfo");
                window.location.reload(false);

                //pop up and pdf viewer remaining  to add after a while
              }}
            >
              <i class="fas fa-print" style={{ paddingRight: "8px" }}></i>
              Print invoice
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;
