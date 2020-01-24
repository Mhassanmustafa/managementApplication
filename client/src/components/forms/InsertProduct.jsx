import React from "react";
import CommonHeadings from "../Common/CommonHeadings";
import ProductHeader from "../tables/ProductHeader";
import axios from "axios";
import ProductsRows from "../tables/ProductRows";

const InsertProduct = () => {
  const [heading, setheading] = React.useState([]);
  const [product, setproduct] = React.useState([]);
  const headings = [
    { name: "Sr.no" },
    { name: "Product Name" },
    { name: "Sell Price" },
    { name: "Bought Price" },
    { name: "Date" },
    { name: "Delete" }
  ];

  const loadData = () => {
    setheading(headings);
    //load product data from the date base from axios
    axios
      .get("/api/products/getAllProducts")
      .then(res => {
        setproduct(res.data);
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);
  const handleDeletedEvent = name => {
    console.log("A child is deleted: " + name);
    loadData();
  };

  return (
    <div id="content">
      <CommonHeadings name="Insert New Product" />
      <table className="table table-sm">
        <thead className="thead-light">
          <tr>
            {heading.map((data, index) => (
              <ProductHeader key={index} headr={data} />
            ))}
          </tr>
        </thead>
        <tbody>
          {product.map((data, index) => (
            <ProductsRows
              key={index}
              index={(index = index + 1)}
              Pname={data}
              onDeleted={handleDeletedEvent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsertProduct;
