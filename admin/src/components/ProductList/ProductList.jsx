import React, { useEffect, useState } from "react";
import "./ProductList.css";
import deleteIcon from "../../assets/delete.png";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4040/allProducts")
      .then((resp) => resp.json())
      .then((data) => {
        setAllProducts(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const removeProduct = async (id) => {
    await fetch("http://localhost:4040/removeProduct", {
      method: "POSt",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="product-list">
      <h1>List of All Products</h1>
      <div className="productList-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>New Price</p>
        <p>Old Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="productList-allProduct">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <div
              key={index}
              className="productList-format-main productList-format"
            >
              <img
                src={product.image}
                alt=""
                className="productList-productIcon"
              />
              <p>{product.name}</p>
              <p>&#8377;{product.newPrice}</p>
              <p>&#8377;{product.oldPrice}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  removeProduct(product.id);
                }}
                src={deleteIcon}
                alt=""
                className="productList-removeIcon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
