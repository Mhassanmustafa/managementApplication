import React from "react";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import SideBar from "./SideBar";
import axiosInstance from "../utility/axiosInstance";

const Dashboard = props => {
  let label = [];
  let tableValue = [];
  let colour = [];
  let salesData = [];
  let date = [];

  const [chartlabel, setchartlabel] = React.useState([]);
  const [chartdata, setchartdata] = React.useState([]);
  const [chartColor, setChartcolor] = React.useState([]);
  const [chartsalesData, setchartsalesdata] = React.useState([]);
  const [chartdate, setchartdate] = React.useState([]);

  let generateRandomColor = () => {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const data1 = {
    labels: chartdate,
    datasets: [
      {
        label: "daily sales",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: chartsalesData
      }
    ]
  };

  const data = {
    labels: chartlabel,
    datasets: [
      {
        data: chartdata,
        backgroundColor: chartColor,
        hoverBackgroundColor: chartColor
      }
    ]
  };

  const [ShowToggle, setShowToggle] = React.useState(false);

  const [dailySales, setdailySales] = React.useState(0);
  const [monthlySales, setmonthlySales] = React.useState(0);
  const [yearlySales, setyearlySales] = React.useState(0);

  const loadData = () => {
    axios
      .get("/api/stats/getSales")
      .then(res => {
        setdailySales(res.data);
      })
      .catch(e => {
        console.log("eror in server");
      });

    axios
      .get("/api/stats/getMSales")
      .then(res => {
        setmonthlySales(res.data);
      })
      .catch(e => {
        console.log("eror in server");
      });

    axios
      .get("/api/stats/getySales")
      .then(res => {
        setyearlySales(res.data);
      })
      .catch(e => {
        console.log("eror in server");
      });

    axios
      .get("/api/stocks/getAllStocks")
      .then(res => {
        let result = res.data;

        result.map(value => {
          label.push(value.name[0].name);
          tableValue.push(value.quantity[0].quantityAvailable);
          colour.push(generateRandomColor());
        });
        setchartlabel(label);
        setchartdata(tableValue);
        setChartcolor(colour);
      })
      .catch(e => {
        console.log(e);
      });

    axios
      .get("/api/stats/dailysales")
      .then(res => {
        let result = res.data;

        result.map(value => {
          date.push(value.entry[0].date);
          salesData.push(value.totalAmount);
        });

        setchartdate(date);
        setchartsalesdata(salesData);
      })
      .catch(e => {
        console.log("there is some eror present");
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div id="content">
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={() => setShowToggle(!ShowToggle)}
        >
          <i className="fa fa-bars" />
        </button>
        {/* Topbar Search */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form>
        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              padding: "0.5rem 2rem",
              color: "silver",
              display: "inline-block"
            }}
          >
            <img
              className="img-profile rounded-circle"
              src="./images/image.jpg"
              style={{ maxWidth: "45px" }}
            />
          </a>
          {/* Dropdown - User Information */}
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
              Profile
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
              Settings
            </a>
            <div className="dropdown-divider" />
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Logout
            </a>
          </div>
        </li>
      </nav>
      <div className="container-fluid">
        {/*heading of dashBoard*/}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <a
            href="#"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50" /> Generate
            Report
          </a>
        </div>
        <div className="row">
          {/* sales (daily) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div
                      className="text-xs font-weight-bold text-primary text-uppercase mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      Sales (Daily)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <CurrencyFormat
                        value={dailySales}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rs "}
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <i
                      className="fas fa-calendar fa-2x text-gray-300"
                      style={{ color: "#007bff" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* sales (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div
                      className="text-xs font-weight-bold text-success text-uppercase mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      Sales (Monthly)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <CurrencyFormat
                        value={monthlySales}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rs "}
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <i
                      className="fas fa-calendar fa-2x text-gray-300"
                      style={{ color: "#28a745" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* sales (anually) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div
                      className="text-xs font-weight-bold text-warning text-uppercase mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      Sales (Anualy)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <CurrencyFormat
                        value={yearlySales}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rs "}
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <i
                      className="fas fa-calendar fa-2x text-gray-300"
                      style={{ color: "#ffc107" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings (daily) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div
                      className="text-xs font-weight-bold text-info text-uppercase mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      Earnings (Daily)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $215,000
                    </div>
                  </div>
                  <div className="col-auto">
                    <i
                      className="fas fa-dollar-sign fa-2x text-gray-300"
                      style={{ color: "#17a2b8" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col ">
            <Bar
              data={data1}
              width={90}
              height={70}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
          <div className="col ">
            <Pie data={data} width={80} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
