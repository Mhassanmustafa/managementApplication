import React from "react";
import { Link } from "react-router-dom";

const Pagefour = props => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      id="main"
      style={{ height: "100vh" }}
    >
      <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">
        404
      </h1>
      <div className="inline-block align-middle">
        <h2 className="font-weight-normal lead" id="desc">
          The page you requested was not found. it may be a server issue or user
          is not log in. please log in again
        </h2>
        <Link className="btn btn-primary" to="/login">
          Go back to Login
        </Link>
      </div>
    </div>
  );
};

export default Pagefour;
