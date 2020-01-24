import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import { browserHistory } from "react-router";
import Dashboard from "./Dashboard";

const Login = props => {
  const [email, setemail] = React.useState();
  const [password, setpassword] = React.useState();

  return (
    <div>
      <div className="container">
        <Router>
          <div className="row w-100 mt-3 mb-sm-5"></div>
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col-md-4 bg-light p-4 pb-5 p-md-5 border rounded shadow m-4 m-md-0">
              <h3 className="text-center mb-4 font-weight-normal">Login</h3>

              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={e => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e => {
                    setpassword(e.target.value);
                  }}
                />
              </div>
              <br />
              <Button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={e => {
                  axios
                    .post("/api/users/login", {
                      email,
                      password
                    })
                    .then(res => {
                      localStorage.setItem("x-auth-token", res.data);
                      props.history.push("/dashboard");
                    })
                    .catch(e => {
                      alert("Invalid email or password.");
                    });
                }}
              >
                Login
              </Button>
              <br />
            </div>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default Login;
