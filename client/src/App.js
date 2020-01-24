import React from "react";
import "./App.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import SideBar from "./components/SideBar";

function App(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={SideBar} />
          <Route exact path="/category/insertNew" component={SideBar} />
          <Route exact path="/product/insertNew" component={SideBar} />
          <Route exact path="/product/UpdatePrices" component={SideBar} />
          <Route exact path="/Invoices/NewInvoice" component={SideBar} />
          <Route exact path="/Stock/InsertNew" component={SideBar} />
          <Route exact path="/Stock/UpdateStock" component={SideBar} />
          <Route exact path="/Stock/StockHistory" component={SideBar} />
          <Route exact path="/Accounts/Customers" component={SideBar} />
          <Route exact path="/Accounts/AccountHistory" component={SideBar} />
          <Route exact path="/Statistics" component={SideBar} />
          <Route
            exact
            path="/product/UpdatePrices/sellPrice"
            component={SideBar}
          />
          <Route
            exact
            path="/product/UpdatePrices/puchasePrice"
            component={SideBar}
          />
          <Route
            exact
            path="/product/UpdatePrices/priceHistory"
            component={SideBar}
          />
          <Route exact path="/Statistics/DailyStatistics" component={SideBar} />
          <Route
            exact
            path="/Statistics/MonthlyStatistics"
            component={SideBar}
          />
          <Route
            exact
            path="/Statistics/YearlyStatistics"
            component={SideBar}
          />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
