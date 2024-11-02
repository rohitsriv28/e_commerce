import React, { useState } from "react";
import "./AddProduct.css";
import upload from "../../assets/upload.png";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "men",
    newPrice: "",
    oldPrice: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const submitProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4040/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4040/addProduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body:JSON.stringify(product)
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed to add product!")
      });
    }
  };

  return (
    <div className="add-product">
      <div className="addProduct-itemFields">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Product Title"
        />
      </div>
      <div className="addProduct-price">
        <div className="addProduct-itemFields">
          <p>Price</p>
          <input
            value={productDetails.oldPrice}
            onChange={changeHandler}
            type="text"
            name="oldPrice"
            placeholder="Product Price"
          />
        </div>
        <div className="addProduct-itemFields">
          <p>Offer Price</p>
          <input
            value={productDetails.newPrice}
            onChange={changeHandler}
            type="text"
            name="newPrice"
            placeholder="Product Offer Price"
          />
        </div>
      </div>
      <div className="addProduct-itemFields">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="addProduct-selector"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addProduct-itemFields">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload}
            alt=""
            className="addProduct-thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          submitProduct();
        }}
        className="addProduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
