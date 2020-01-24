import React from "react";
import CateNames from "../tables/CatHeader";
import axios from "axios";
import Catrows from "../tables/Catrows";
import Category from "../Popups/Category";

const InsertCategory = () => {
  const [products, setProducts] = React.useState([]);
  const headings = [
    { name: "Sr.no" },
    { name: "Category Name" },
    { name: "Remove Category" }
  ];
  const [names, setNames] = React.useState([]);

  const loadData = () => {
    setProducts(headings);
    //load category name from the date base from axios
    axios
      .get("/api/products/getCatNames")
      .then(res => {
        setNames(res.data);
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
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Category Details</h1>
        <Category />
      </div>
      <table className="table table-sm">
        <thead className="thead-light">
          <tr>
            {products.map((data, index) => (
              <CateNames key={index} head={data} />
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((data, index) => (
            <Catrows
              key={index}
              index={(index = index + 1)}
              name={data}
              onDeleted={handleDeletedEvent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsertCategory;
