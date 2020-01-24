import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DailyStatistics from "./Statistics/DailyStatistics";
import MonthlyStatistics from "./Statistics/MonthlyStatistics";

import YearlyStat from "./Statistics/yearlyStat";

const Statistics = () => {
  return (
    <div id="content">
      <Router>
        <nav className="navbar " style={{ backgroundColor: "#2c3b41" }}>
          <h4 class="navbar-brand" style={{ color: "white" }}>
            Sales Statistics
          </h4>
          <Link
            className="nav-item nav-link"
            style={{ color: "white" }}
            to="/Statistics/DailyStatistics"
          >
            Daily Statistics
          </Link>
          <Link
            className="nav-item nav-link"
            style={{ color: "white" }}
            to="/Statistics/MonthlyStatistics"
          >
            Monthly Statistics
          </Link>
          <Link
            className="nav-item nav-link"
            style={{ color: "white" }}
            to="/Statistics/YearlyStatistics"
          >
            Yearly Statistics
          </Link>
          <Link className="nav-item nav-link" style={{ color: "white" }}></Link>
        </nav>
        <Route path="/Statistics/YearlyStatistics">
          <YearlyStat />
        </Route>
        <Route path="/Statistics/DailyStatistics">
          <DailyStatistics />
        </Route>
        <Route path="/Statistics/MonthlyStatistics">
          <MonthlyStatistics />
        </Route>
      </Router>
    </div>
  );
};

export default Statistics;
