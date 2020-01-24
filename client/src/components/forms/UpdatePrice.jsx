import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";
import UpdateSellPrice from "./UpdatePrice/UpdateSellPrice";
import UpdatePurchasePrice from "./UpdatePrice/UpdatePurchasePrice";
import PriceHistory from "./UpdatePrice/PriceHistory";

const UpdatePrice = () => {
  return (
    <div id="content">
      <Router>
        <nav className="navbar " style={{ backgroundColor: "#2c3b41" }}>
          <h4 class="navbar-brand" style={{ color: "white" }}>
            Update Product Prices
          </h4>
          <Link
            className="nav-item nav-link"
            style={{ color: "white" }}
            to="/product/UpdatePrices/sellPrice"
          >
            Update sell Price
          </Link>
          <Link
            className="nav-item nav-link"
            style={{ color: "white" }}
            to="/product/UpdatePrices/puchasePrice"
          >
            Update purchase price
          </Link>
          <Link
            className="nav-item nav-link"
            style={{ color: "white" }}
            to="/product/UpdatePrices/priceHistory"
          >
            Price History
          </Link>
          <Link className="nav-item nav-link" style={{ color: "white" }}></Link>
        </nav>
        <Route path="/product/UpdatePrices/sellPrice">
          <UpdateSellPrice />
        </Route>
        <Route path="/product/UpdatePrices/puchasePrice">
          <UpdatePurchasePrice />
        </Route>
        <Route path="/product/UpdatePrices/priceHistory">
          <PriceHistory />
        </Route>
      </Router>
    </div>
  );
};

export default UpdatePrice;
