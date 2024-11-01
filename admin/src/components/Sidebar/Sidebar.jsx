import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import addProduct from "../../assets/add-product.png";
import listProduct from "../../assets/list-products.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addProduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={addProduct} alt="add product button" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listProduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={listProduct} alt="list product button" />
          <p>List Product</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
