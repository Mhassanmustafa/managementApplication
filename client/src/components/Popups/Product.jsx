import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Select from "react-select";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import ProductDropDown from "../DropDown/ProductDropDown";
import Dropdown from "react-bootstrap/Dropdown";
import axiosInstance from "../../utility/axiosInstance";

const Product = () => {
  //handle form showing operation
  const [catnames, setcatnames] = React.useState();
  const [dropname, setdropname] = React.useState("Select Category");
  //handle form post operations
  const [name, setName] = React.useState("");
  const [catId, setcatid] = React.useState("");
  const [sellPrices, setsellPrice] = React.useState("");
  const [purchasePrices, setboughtPrice] = React.useState("");

  const handleFormSubmit = e => {
    let regex = new RegExp(/[^0-9]/, "g");
    if (name.length <= 0 || sellPrices.match(regex) || catId.length <= 0) {
      if (sellPrices.match(regex) || purchasePrices.match(regex)) {
        alert("prices must be a number");
      } else if (catId.length <= 0) {
        alert("category name is required");
      } else {
        alert("name is required try again");
      }
    } else {
      axiosInstance
        .post("/api/products/addNewProduct", {
          name,
          catId,
          sellPrices,
          purchasePrices
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log("eror");
          alert("product is already present please change the name");
        });
    }
  };
  const loadData = () => {
    //load category name from the date base from axios
    axios
      .get("/api/products/getCatNames")
      .then(res => {
        setcatnames(res.data);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  function handleName(name, id) {
    setdropname(name);
    setcatid(id);
  }

  return (
    <div>
      <Popup
        trigger={
          <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-plus fa-sm text-white-50" /> Insert new Product
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
              <h1 className="h3 mb-0 text-gray-800">Insert New Product</h1>
            </div>
            <div className="content1">
              <br />
              <Form noValidate>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    className="form-group col-md-12"
                    controlId="validationCustom01"
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="Product Name"
                      onChange={e => setName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      please check your category name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    className="form-group col-md-12"
                    controlId="validationCustom01"
                  >
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {dropname}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {catnames.map((data, index) => {
                          return (
                            <ProductDropDown
                              pName={data}
                              index={index}
                              change={handleName}
                            />
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="form-group col-md-12"
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          required
                          type="text"
                          placeholder="Sell Price"
                          onChange={e => setsellPrice(e.target.value)}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="form-group col-md-12"
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          required
                          type="text"
                          placeholder="Bought Price"
                          onChange={e => setboughtPrice(e.target.value)}
                        />
                      </Form.Group>
                    </Form.Row>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
            <div className="actions1">
              <button
                className="button1 btn btn-primary"
                onClick={() => {
                  close();
                  handleFormSubmit();
                  window.location.reload(false);
                }}
              >
                Add Category
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Product;
