import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import Joi from "joi";
import { useAlert } from "react-alert";
import axiosInstance from "../../utility/axiosInstance";

const Category = props => {
  const [name, setName] = React.useState("");
  const [validated, setValidated] = React.useState(false);

  function validateCategory(category) {
    const schema = {
      name: Joi.string()
        .min(2)
        .max(50)
        .required()
    };

    return Joi.validate(category, schema);
  }
  const [show, setShow] = React.useState("hidden");

  const handleSubmit = event => {
    if (validateCategory({ name: name }).error || name == []) {
      alert("Check your category name first");
    } else {
      setValidated(true);
      axiosInstance
        .post("/api/products/addNewCategory", {
          name
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log("server is not working");
          alert(
            "there is already a category with the same name in data base name must be unique"
          );
        });
    }

    //setValidated(true);
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-plus fa-sm text-white-50" /> Insert new
            Category
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
              <h1 className="h3 mb-0 text-gray-800">Insert New Category</h1>
            </div>
            <div className="content1">
              <br />
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                      placeholder="Category Name"
                      onChange={e => {
                        setName(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      please check your category name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
            <div className="actions1">
              <button
                className="button1 btn btn-primary"
                onClick={() => {
                  handleSubmit();
                  close();
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

export default Category;
