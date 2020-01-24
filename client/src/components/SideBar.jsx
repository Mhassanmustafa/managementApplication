import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InsertCategory from "./forms/InsertCategory";
import Dashboard from "./Dashboard";
import InsertProduct from "./forms/InsertProduct";
import UpdatePrice from "./forms/UpdatePrice";
import NewInvoice from "./forms/Invoices/NewInvoice";
import ViewOrder from "./forms/Invoices/ViewOrder";
import InsertNewStock from "./forms/Stocks/InsertNewStock";
import UpdateStock from "./forms/Stocks/UpdateStock";
import StockHistory from "./forms/Stocks/StockHistory";
import CustomerAccounts from "./forms/Accounts/CustomerAccounts";
import AccountHistory from "./forms/Accounts/AccountHistory";
import Statistics from "./forms/Statistics";
import Login from "./Login";
import { Button } from "react-bootstrap";
import Pagefour from "./Common/Pagefour";

const SideBar = props => {
  if (
    localStorage.getItem("x-auth-token") != null ||
    localStorage.getItem("x-auth-token") != undefined
  ) {
    const toggle = function(e) {
      //togle the next sibbling or sub menu
      e.target.nextSibling.classList.toggle("show");
    };

    return (
      <div className="wrapper">
        <Router>
          <nav id="sidebar" className="u">
            <div className="sidebar-header">
              <h3
                style={{
                  paddingLeft: "54px",
                  paddingTop: "9px",
                  paddingBottom: "8px",
                  fontSize: "1.2em"
                }}
              >
                Admin Panel
              </h3>
            </div>

            <ul className="list-unstyled components color">
              <br />
              <br />
              <li className="header">Main Navigation</li>
              <li>
                <Link to="/dashboard" style={{ paddingLeft: "20px" }}>
                  <i className="fas fa-tachometer-alt" /> DashBoard
                </Link>
              </li>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle "
                  onClick={e => toggle(e)}
                  style={{ paddingLeft: "20px" }}
                >
                  <i
                    className="fas fa-receipt"
                    style={{ marginRight: "7px" }}
                  />
                  Invoices
                </Link>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      aria-current="page"
                      to="/Invoices/NewInvoice"
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "3px" }}> New Invoice</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      aria-current="page"
                      style={{ paddingLeft: "20px" }}
                      to="/Invoices/viewOrders"
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>View Order</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                  onClick={e => toggle(e)}
                  style={{ paddingLeft: "20px" }}
                >
                  <i
                    className="fab fa-product-hunt"
                    style={{ marginRight: "5px" }}
                  />
                  Product Management
                </Link>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                  <li>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to="/product/insertNew"
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>
                        Add new Products
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to="/product/UpdatePrices"
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>Update Prices</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/insertNew"
                      style={{ paddingLeft: "20px" }}
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>Category</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  onClick={e => toggle(e)}
                  className="dropdown-toggle"
                  style={{ paddingLeft: "20px" }}
                >
                  <i
                    className="fas fa-warehouse"
                    style={{ marginRight: "5px" }}
                  />
                  Stock Management
                </Link>
                <ul className="collapse list-unstyled" id="stockSubMenu">
                  <li>
                    <Link style={{ paddingLeft: "20px" }} to="/Stock/InsertNew">
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>Add Items</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to="/Stock/UpdateStock"
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>
                        Update Quantity
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to="/Stock/StockHistory"
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>Stock History</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  onClick={e => toggle(e)}
                  className="dropdown-toggle"
                  style={{ paddingLeft: "20px" }}
                >
                  <i className="fas fa-user" style={{ marginRight: "7px" }} />
                  Account Management
                </Link>
                <ul className="collapse list-unstyled" id="accountSubmenu">
                  <li>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to="/Accounts/Customers"
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>Accounts</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ paddingLeft: "20px" }}
                      to="/Accounts/AccountHistory"
                    >
                      <i className="far fa-circle" />
                      <span style={{ paddingLeft: "7px" }}>
                        Account History
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link style={{ paddingLeft: "20px" }} to="/Statistics">
                  <i
                    className="fas fa-chart-line"
                    style={{ marginRight: "6px" }}
                  />
                  Statistics
                </Link>
              </li>
              <li>
                <Link style={{ paddingLeft: "20px" }}>
                  <i className="fas fa-cog" style={{ marginRight: "6px" }} />
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  style={{ paddingLeft: "20px" }}
                  to="/login"
                  onClick={e => {
                    localStorage.removeItem("x-auth-token");

                    props.history.push("/login");
                  }}
                >
                  <i
                    className="fas fa-sign-out-alt"
                    style={{ marginRight: "6px" }}
                  />
                  Logout
                </Link>
              </li>
              <br />
              <br />
              <hr />
            </ul>
          </nav>
          <Switch>
            <Route path="/category/insertNew">
              <InsertCategory />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/product/insertNew">
              <InsertProduct />
            </Route>
            <Route path="/product/UpdatePrices">
              <UpdatePrice />
            </Route>
            <Route path="/Invoices/NewInvoice">
              <NewInvoice />
            </Route>
            <Route path="/Invoices/viewOrders">
              <ViewOrder />
            </Route>
            <Route path="/Stock/InsertNew">
              <InsertNewStock />
            </Route>
            <Route path="/Stock/UpdateStock">
              <UpdateStock />
            </Route>
            <Route path="/Stock/StockHistory">
              <StockHistory />
            </Route>
            <Route path="/Accounts/Customers">
              <CustomerAccounts />
            </Route>
            <Route path="/Accounts/AccountHistory">
              <AccountHistory />
            </Route>
            <Route path="/Statistics">
              <Statistics />
            </Route>
          </Switch>

          {/* <Switch>
          <Route path="/login" component={Login} />
        </Switch> */}
        </Router>
      </div>
    );
  } else {
    return <Pagefour />;
  }
};

export default SideBar;
