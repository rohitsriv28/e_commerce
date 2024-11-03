import React from "react";
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ProductList from "../../components/ProductList/ProductList";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/listProduct" element={<ProductList />} />
      </Routes>
    </div>
  );
};

export default Admin;
