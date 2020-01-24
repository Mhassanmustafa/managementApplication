var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var productApi = require("./routes/api/product");
var customerApi = require("./routes/api/customer");
var orderApi = require("./routes/api/orders");
var stockApi = require("./routes/api/stock");
var ledgerApi = require("./routes/api/ledger");
var tempApi = require("./routes/api/temp");
var statisticApi = require("./routes/api/statistics");
var userApi = require("./routes/api/users");
var cors = require("cors");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//enable cors
app.options("*", cors());
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client/build")));

//api addresses
app.use("/api/products", productApi);
app.use("/api/customers", customerApi);
app.use("/api/orders", orderApi);
app.use("/api/stocks", stockApi);
app.use("/api/ledgers", ledgerApi);
app.use("/api/temps", tempApi);
app.use("/api/stats", statisticApi);
app.use("/api/users", userApi);

//connection with mongo db server

mongoose
  .connect(
    "mongodb+srv://user:admin@cluster0-hvjto.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then(() => console.log("successfully connected"))
  .catch(err => console.log("could not connect" + err));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
