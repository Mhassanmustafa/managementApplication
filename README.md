# [pos-ap](https://pos-ap.herokuapp.com)

A management app for our semester project

# Try

[https://pos-ap.herokuapp.com](https://pos-ap.herokuapp.com)

![ScreenShot](https://i.postimg.cc/QCZNqL5Y/1.png)

![ScreenShot](https://i.postimg.cc/pTfMRmhk/2.png)


# Functionalties
- user log in
- manage products details
- manage products stocks
- manage accounts details
- manage orders details
- manage statistics
- create bills
- manage ledger
- dashboard

# Api Routes
Following are the api rotes

### user

| Method | Path                        | Description                                           |
| ------ | --------------------------- | ----------------------------------------------------- |
| POST   | /api/users/login            | user can log in the application by giving email and password |

### Customer

| Method | Path                        | Description                                           |
| ------ | --------------------------- | ----------------------------------------------------- |
| POST   | /api/customers/addNewCustomer           |create a new user in database |
| GET   | /api/customers/getCustomerId/:name           |get customer id by its name |
| GET   | /api/customers/getAllCustomers           |get the list of all customers from the data base |
| GET   | /api/customers/getAllInfo           |get information of all customers in the data base |

### Orders

| Method | Path                        | Description                                           |
| ------ | --------------------------- | ----------------------------------------------------- |
| POST   | /api/orders/addNewOrder           |create a new order in the data base |
| GET   | /api/orders/getAllOrders           |get all the orders from the data base |
| GET   | /api/orders/getOrder/:id           |get the specific order by giving id |
| PUT   | /api/orders/updateCusomerOrder/:name           |update a specific order |
| DELETE   | /api/orders/deleteCustomerOrder/:id           |delete a customer order by giving its id |
| GET   | /api/orders/getAllOrdersList           |get order history  |

### Stocks

| Method | Path                        | Description                                           |
| ------ | --------------------------- | ----------------------------------------------------- |
| POST   | /api/stocks/insertNewStock          |insert new stock of product in the data base |
| GET   | /api/stocks/getProductStock/:name           |get latest quantity of product |
| GET   | /api/stocks/getStockHistory/:id          |get quantity history of specfic product |
| PUT   | /api/stocks/updateStocks/:name           |update quantity of the product |
| DELETE   | /api/stocks/deleteProduct/:id           |delete a product stock completely |
| GET   | /api/stocks/getAllStocks          |get all stocks details  |
| GET   | /api/stocks/getAllStockHistory          |get all stocks history  |

### Ledger

| Method | Path                        | Description                                           |
| ------ | --------------------------- | ----------------------------------------------------- |
| POST   | /api/ledgers/insertNewLedger          |insert new ledger data in the data base |
| GET   | /api/ledgers/getAllLedger          |get all ledger data |
| GET   | /api/ledgers/getCustomerLedger/:id          |get ledger data by customer id |
| DELETE   | /api/ledgers/deleteLedger/:id           |delete a ledger by customer id |
| GET   | /api/ledgers/getCustLedgerO/:id         |get ledger data against order id  |

### Statistics

| Method | Path                        | Description                                           |
| ------ | --------------------------- | ----------------------------------------------------- |
| GET   | /api/stats/dailysales          |get all daily sales from ledger |
| GET   | /api/stats/monthlysales          |get all monthly sales from ledger |
| GET   | /api/stats/yearlysales          |get all Yearly sales from ledger |
| GET   | /api/stats/getSales           |get current day sales from ledger |
| GET   | /api/stats/getMSales         |get current month sales from ledger  |
| GET   | /api/stats/getYSales         |get current year sales from ledger  |

### temp

| Method | Path                        | Description                                           |
| ------ | --------------------------- | ----------------------------------------------------- |
| POST   | /api/temps/newTemp          |insert new temporary data |
| GET   | /api/temps/getAlltemp         |get temporary data |
| DELETE   | /api/temps/alltemp          |delete all temporary data |
| DELETE   |/api/temps/temp/:name           |delete temporary data by name |

### Products

| Method | Path                        | Description                                           |
| ------ | --------------------------- | ----------------------------------------------------- |
| POST   | /api/products/addNewCategory          |insert new category in data base |
| GET   | /api/products/getCatNames         |get list oof all categories |
| DELETE   | /api/products/deleteCategory/:name         |delete a category by its name |
| GET   |/api/products/getCatId/:name          |delete temporary data by name |
| POST   | /api/products/addNewProduct        |insert new product in data base |
| GET   | /api/products/getAllProducts         |get all product lists |
| GET   | /api/products/getPriceHistory          |get all price history of the product |
| GET   |/api/products/getProduct/:name          |get product by its name |
| PUT   | /api/products/updateSellPrices/:name         |update sell price by product name |
| PUT   | /api/products/updatePurchasePrices/:name         |update purchase price by product name |
| GET   | /api/products/getSellPrice/:name          |get the sell price by its name (latest) |
| GET   |/api/products/getPurchasePrice/:name          |get the purchase price by its name (latest) |
| DELETE   | /api/products/deleteProduct/:name        |Delete a product completely from the data base|


# About Client

- React needs some work
- Its not fully finished yet currently working on it

# Functionalties (to be added later Or under developement)

- profits in statistics
- pdf generation on bill submit button
- reports generations 
- settings so that user can change password
- sign up for new users

# Tu run application on your local machine

- clone the app on your pc 
- in app directory use the following commads

```
$ npm install
$ cd client
$ npm install
$ npm run build

```
- after these commands
go to URL # [http://localhost:4000](http://localhost:4000)

# For Login

- Email : admin@gmail.com
- Password : admin

# Deploy on

- heroku
- MongoDB Atlas

# contribution made in api routes ledger and stocks

- [Rawaha khan](https://github.com/RawahaKhan) 
- [M Rafay khalid](https://github.com/raffyman)

# By

- Muhammad Hassan Mustafa




